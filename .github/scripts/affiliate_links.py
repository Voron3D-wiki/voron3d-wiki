#!/usr/bin/env python3
import argparse
import os
import re
from pathlib import Path
from typing import Iterable
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

DOCS_DIR = "docs"

ONETWO3D_DOMAIN = "onetwo3d.co.uk"
ONETWO3D_PARAM_KEY = "wpam_id"
ONETWO3D_PARAM_VALUE = "9"

WEST3D_DOMAIN = "west3d.com"
WEST3D_AFFIL_TAG = "/3DWIKI"

# --- Matching links in markdown / html-in-markdown ---
MD_LINK_RE = re.compile(r'(\]\()(\s*)(https?://[^\s)]+)(\s*)(\))')
MD_AUTOLINK_RE = re.compile(r'(<)(https?://[^ >]+)(>)')
HTML_HREF_RE = re.compile(r'(\bhref\s*=\s*["\'])(https?://[^"\']+)(["\'])', re.IGNORECASE)

# --- Extracting URLs from diff lines ---
DIFF_URL_RE = re.compile(r"https?://[^\s\"'>\]\)]+", re.IGNORECASE)


def host_matches(netloc: str, domain: str) -> bool:
    host = (netloc or "").split("@")[-1].split(":")[0].lower()
    domain = domain.lower()
    return host == domain or host.endswith("." + domain)


# ============================
# Autofix: add affiliate tags
# ============================
def ensure_query_param(url: str, key: str, value: str) -> str:
    """
    Ensure key=value exists in query string. Preserves ordering + duplicates.
    """
    p = urlparse(url)
    qsl = parse_qsl(p.query, keep_blank_values=True)

    if any(k == key and v == value for k, v in qsl):
        return url

    qsl.append((key, value))
    new_query = urlencode(qsl, doseq=True)
    return urlunparse((p.scheme, p.netloc, p.path, p.params, new_query, p.fragment))


def ensure_onetwo3d_affiliate(url: str) -> str:
    p = urlparse(url)
    if not host_matches(p.netloc, ONETWO3D_DOMAIN):
        return url
    return ensure_query_param(url, ONETWO3D_PARAM_KEY, ONETWO3D_PARAM_VALUE)

def ensure_west3d_affiliate(url: str) -> str:
    p = urlparse(url)
    if not host_matches(p.netloc, WEST3D_DOMAIN):
        return url

    tag = WEST3D_AFFIL_TAG.strip("/")  # "3DWIKI"

    path = p.path or "/"

    # Normalize for comparison: ignore a trailing slash
    norm_path = path.rstrip("/") if path != "/" else path

    # Already tagged?
    if norm_path.endswith("/" + tag) or norm_path == "/" + tag:
        return url

    # Append tag as final path segment
    new_path = norm_path.rstrip("/") + "/" + tag

    return urlunparse((p.scheme, p.netloc, new_path, p.params, p.query, p.fragment))

def fix_url(url: str) -> str:
    url = ensure_west3d_affiliate(url)
    url = ensure_onetwo3d_affiliate(url)
    return url


def process_text_fix(content: str) -> str:
    def repl_md(m: re.Match) -> str:
        fixed = fix_url(m.group(3))
        return f"{m.group(1)}{m.group(2)}{fixed}{m.group(4)}{m.group(5)}"

    def repl_auto(m: re.Match) -> str:
        fixed = fix_url(m.group(2))
        return f"{m.group(1)}{fixed}{m.group(3)}"

    def repl_html(m: re.Match) -> str:
        fixed = fix_url(m.group(2))
        return f"{m.group(1)}{fixed}{m.group(3)}"

    content = MD_LINK_RE.sub(repl_md, content)
    content = MD_AUTOLINK_RE.sub(repl_auto, content)
    content = HTML_HREF_RE.sub(repl_html, content)
    return content


def load_files_from_list(file_list_path: Path) -> list[Path]:
    files: list[Path] = []
    for line in file_list_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        p = Path(line)
        if p.suffix.lower() not in (".md", ".markdown"):
            continue
        files.append(p)
    return files


def run_fix(files: list[Path]) -> int:
    changed = 0
    for f in files:
        if not (f.exists() and f.is_file()):
            continue
        original = f.read_text(encoding="utf-8")
        updated = process_text_fix(original)
        if updated != original:
            f.write_text(updated, encoding="utf-8")
            changed += 1

    print(f"Affiliate autofix complete. Files modified: {changed}")
    return 0


# ==========================================================
# Check: detect external link changes excluding West3D/OneTwo3D
# ==========================================================
def normalize_url_for_compare(raw: str) -> str:
    # diffs often contain &amp;
    return raw.replace("&amp;", "&")


def extract_non_affiliate_external_link_changes(diff_text: str) -> tuple[list[str], list[str]]:
    added: set[str] = set()
    removed: set[str] = set()

    for line in diff_text.splitlines():
        if not line:
            continue

        # skip file headers
        if line.startswith("+++ ") or line.startswith("--- "):
            continue

        target_set = None
        if line.startswith("+") and not line.startswith("+++"):
            target_set = added
        elif line.startswith("-") and not line.startswith("---"):
            target_set = removed
        else:
            continue

        for m in DIFF_URL_RE.finditer(line):
            url = normalize_url_for_compare(m.group(0))
            p = urlparse(url)

            # only consider http(s)
            if p.scheme not in ("http", "https"):
                continue

            # ignore West3D + OneTwo3D completely
            if host_matches(p.netloc, WEST3D_DOMAIN) or host_matches(p.netloc, ONETWO3D_DOMAIN):
                continue

            target_set.add(url)

    # net-out: if same URL appears both added and removed, it's not a net change
    net_added = sorted(added - removed)
    net_removed = sorted(removed - added)
    return net_added, net_removed


def write_github_outputs(added: Iterable[str], removed: Iterable[str]) -> None:
    out_path = os.environ.get("GITHUB_OUTPUT")
    payload = []
    payload.append("ADDED<<EOF")
    payload.extend(added)
    payload.append("EOF")
    payload.append("REMOVED<<EOF")
    payload.extend(removed)
    payload.append("EOF")
    text = "\n".join(payload) + "\n"

    if out_path:
        with open(out_path, "a", encoding="utf-8") as f:
            f.write(text)
    else:
        # local debug
        print(text, end="")


def run_check(diff_file: Path) -> int:
    if not diff_file.exists():
        print(f"❌ Diff file not found: {diff_file}")
        return 2

    diff_text = diff_file.read_text(encoding="utf-8", errors="replace")
    net_added, net_removed = extract_non_affiliate_external_link_changes(diff_text)

    write_github_outputs(net_added, net_removed)

    if net_added or net_removed:
        print("❌ Non-affiliate external link changes detected.")
        return 1

    print("✅ No non-affiliate external link changes detected.")
    return 0


# =====
# CLI
# =====
def main() -> None:
    ap = argparse.ArgumentParser(description="Single-file affiliate autofix + external link change checker.")
    sub = ap.add_subparsers(dest="cmd", required=True)

    ap_fix = sub.add_parser("fix", help="Add missing affiliate tags/prefixes in markdown/html.")
    ap_fix.add_argument("--files", required=True, help="Path to newline-separated list of changed markdown files.")

    ap_check = sub.add_parser("check", help="Check for external link changes (excluding West3D/OneTwo3D) from a diff.")
    ap_check.add_argument("--diff", required=True, help="Path to diff file (e.g., diff.txt).")

    args = ap.parse_args()

    if args.cmd == "fix":
        fl = Path(args.files)
        files = load_files_from_list(fl) if fl.exists() else []
        raise SystemExit(run_fix(files))

    if args.cmd == "check":
        raise SystemExit(run_check(Path(args.diff)))


if __name__ == "__main__":
    main()
