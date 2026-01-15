#!/usr/bin/env bash
set -euo pipefail

DIFF_FILE="${1:-}"
if [[ -z "$DIFF_FILE" || ! -f "$DIFF_FILE" ]]; then
  echo "Usage: $0 <diff-file>"
  exit 1
fi

# allow running locally
: "${GITHUB_OUTPUT:=/dev/stdout}"

# Extract URLs from added/removed diff lines (skip file headers +++/---)
# Stop at space, ), >, ], or quotes.
URL_RE='https?://[^ )"'\''>\]]+'

ADDED_RAW=$(grep -E '^\+' "$DIFF_FILE" | grep -vE '^\+\+\+' | grep -Eo "$URL_RE" || true)
REMOVED_RAW=$(grep -E '^\-' "$DIFF_FILE" | grep -vE '^---'  | grep -Eo "$URL_RE" || true)

normalize() {
  local url="$1"

  # HTML entity that might appear in diffs
  url="${url//&amp;/&}"

  # West3D: treat /3DWIKI prefix as equivalent (remove it for comparison)
  url="$(echo "$url" | sed -E 's#(https?://[^/]*west3d\.com)/3DWIKI(/|$)#\1\2#I')"

  # OneTwo3D: remove wpam_id=9 from query when comparing
  url="$(echo "$url" | sed -E 's#([?&])wpam_id=9(&|$)#\1#g')"

  # West3D/Shopify tracking params: remove noisy params that cause false diffs
  # Add more keys here if you want.
  url="$(echo "$url" | sed -E 's#([?&])(_pos|_sid|_ss)=[^&]*(&|$)#\1#g')"

  # Cleanup query separators
  url="$(echo "$url" | sed -E 's#\?&#?#g; s#&&#\&#g; s#[?&]$##')"

  echo "$url"
}

# Normalize + sort unique
ADDED_NORM=$(while read -r u; do [[ -n "$u" ]] && normalize "$u"; done <<< "$ADDED_RAW" | sort -u || true)
REMOVED_NORM=$(while read -r u; do [[ -n "$u" ]] && normalize "$u"; done <<< "$REMOVED_RAW" | sort -u || true)

# Net-out changes so affiliate-only differences don't trigger:
# net_added = ADDED_NORM \ REMOVED_NORM
# net_removed = REMOVED_NORM \ ADDED_NORM
NET_ADDED=$(comm -23 <(printf "%s\n" "$ADDED_NORM" | sort -u) <(printf "%s\n" "$REMOVED_NORM" | sort -u) || true)
NET_REMOVED=$(comm -13 <(printf "%s\n" "$ADDED_NORM" | sort -u) <(printf "%s\n" "$REMOVED_NORM" | sort -u) || true)

{
  echo "ADDED<<EOF"
  echo "$NET_ADDED"
  echo "EOF"
  echo "REMOVED<<EOF"
  echo "$NET_REMOVED"
  echo "EOF"
} >> "$GITHUB_OUTPUT"
