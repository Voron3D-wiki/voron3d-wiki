#!/usr/bin/env bash
set -euo pipefail

DIFF_FILE="${1:?Usage: $0 diff.txt}"

# Normalize URL so affiliate-only changes don't count as "external link changes"
normalize_url() {
  local url="$1"

  # Strip trailing punctuation that commonly clings to URLs in markdown
  url="${url%.}"
  url="${url%,}"
  url="${url%;}"
  url="${url%:}"
  url="${url%!}"
  url="${url%?}"
  url="${url%)}"
  url="${url%]}"
  url="${url%\"}"
  url="${url%\'}"

  # --- West3D: ignore /3DWIKI suffix ---
  url="$(echo "$url" | sed -E 's#(https?://(www\.)?west3d\.com[^?#]*)/3DWIKI/?#\1#I')"

  # --- OneTwo3D: ignore wpam_id=9 query param ---
  url="$(echo "$url" \
    | sed -E 's#([?&])wpam_id=9(&|$)#\1#Ig' \
    | sed -E 's#[?&]$##' \
    | sed -E 's#\?&#?#' \
    | sed -E 's#\?\?#\?#')"

  echo "$url"
}

# Extract URLs from diff, ignoring file headers like +++ b/foo or --- a/foo
extract_urls_from_diff() {
  local sign_regex="$1"   # '^\+' or '^-'
  grep -E "${sign_regex}" "$DIFF_FILE" \
    | grep -Ev '^\+\+\+ |^\-\-\- ' \
    | grep -Eo '(https?://[^ )"]+)' || true
}

ADDED_RAW="$(extract_urls_from_diff '^\+')"
REMOVED_RAW="$(extract_urls_from_diff '^-')"

ADDED_NORM="$(echo "$ADDED_RAW" | while IFS= read -r u; do [ -n "$u" ] && normalize_url "$u"; done | sort -u || true)"
REMOVED_NORM="$(echo "$REMOVED_RAW" | while IFS= read -r u; do [ -n "$u" ] && normalize_url "$u"; done | sort -u || true)"

# Remove overlap (affiliate-only changes normalize to the same value and cancel out)
ADDED_FINAL="$(comm -23 <(printf "%s\n" "$ADDED_NORM") <(printf "%s\n" "$REMOVED_NORM") || true)"
REMOVED_FINAL="$(comm -13 <(printf "%s\n" "$ADDED_NORM") <(printf "%s\n" "$REMOVED_NORM") || true)"

{
  echo "ADDED<<EOF"
  echo "$ADDED_FINAL"
  echo "EOF"
  echo "REMOVED<<EOF"
  echo "$REMOVED_FINAL"
  echo "EOF"
} >> "$GITHUB_OUTPUT"
