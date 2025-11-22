#!/usr/bin/env bash
set -e

DIFF_FILE=$1

ADDED=$(grep '^+' "$DIFF_FILE" | grep -Eo '(https?://[^ )"]+)' | sort -u || true)
REMOVED=$(grep '^-' "$DIFF_FILE" | grep -Eo '(https?://[^ )"]+)' | sort -u || true)

echo "ADDED<<EOF"
echo "$ADDED"
echo "EOF"

echo "REMOVED<<EOF"
echo "$REMOVED"
echo "EOF"
