#!/usr/bin/env bash
set -euo pipefail

DIFF_FILE="${1:-}"
if [ -z "$DIFF_FILE" ] || [ ! -f "$DIFF_FILE" ]; then
  echo "Usage: $0 <diff-file>"
  exit 1
fi

# Grab URLs from added/removed diff lines (skip file headers +++/---)
ADDED_RAW=$(grep '^+' "$DIFF_FILE" | grep -vE '^\+\+\+' | grep -Eo '(https?://[^ )"]+)' || true)
REMOVED_RAW=$(grep '^-' "$DIFF_FILE" | grep -vE '^---'  | grep -Eo '(https?://[^ )"]+)' || true)

# Normalize URLs so affiliate-only changes don't count as "external link changes"
normalize() {
  local url="$1"

  # HTML entity that might appear in diffs
  url="${url//&amp;/&}"

  # West3D: treat /3DWIKI prefix as equivalent
  # normalize by removing a single leading /3DWIKI in the path if present
  url="$(echo "$url" | sed -E 's#(https?://[^/]*west3d\.com)/3DWIKI(/|$)#\1\2#I')"

  # OneTwo3D: remove wpam_id=9 from query when comparing
  url="$(echo "$url" | sed -E 's#([?&])wpam_id=9(&|$)#\1#g; s#[?&]$##')"

  echo "$url"
}

ADDED_NORM=$(while read -r u; do normalize "$u"; done <<< "$ADDED_RAW" | sort -u || true)
REMOVED_NORM=$(while read -r u; do normalize "$u"; done <<< "$REMOVED_RAW" | sort -u || true)

# Output as action step outputs
{
  echo "ADDED<<EOF"
  echo "$ADDED_NORM"
  echo "EOF"
  echo "REMOVED<<EOF"
  echo "$REMOVED_NORM"
  echo "EOF"
} >> "$GITHUB_OUTPUT"
