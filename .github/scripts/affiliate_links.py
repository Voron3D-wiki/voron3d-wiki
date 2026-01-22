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
WEST3D_PARAM_KEY = "dt_id"
WEST3D_PARAM_VALUE = "2902688;ap:1878203"

# Anything even vaguely resembling 3DWIKI gets destroyed (case-insensitive)
NUKE_PATTERNS = [
    r"3d[\-_]?wiki",
    r"wiki[\-_]?3d",
]

NUKE_RE = re.compile("|".join(NUKE_PATTERNS), re.IGNORECASE)

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
# URL helpers
# ============================
def nuke_3dwiki_everywhere(p) -> tuple[str, str, str]:
    """
    Remove all 3DWIKI/wiki3d variants from:
    - path
    - query values
    - fragment
    """
    # Path
    clean_path = NUKE_RE.sub("", p.path or "/")

    # Query (remove from values, keep keys)
    qsl = parse_qsl(p.query, keep_blank_values=True)
    clean_qsl = []
    for k, v in qsl:
        clean_v = NUKE_RE.sub("", v)
        if clean_v.strip():
            clean_qsl.append((k, clean_v))
    clean_query = urlencode(clean_qsl, doseq=True)

    # Fragment
    clean_fragment = NUKE_RE.sub("", p.fragment or "")

    # Normalize slashes after nuking
    clean_path = re.sub(r"/{2,}", "/", clean_path)
    if not clean_path.startswith("/"):
        clean_path = "/" + clean_path

    return clean_path, clean_query, clean_fragment


def ensure_query_param(url: str, key: str, value: str) -> str:
    p = urlparse(url)
    qsl = parse_qsl(p.query, keep_blank_values=True)

    new_qsl = [(k, v) for k, v in qsl if k != key]
    new_qsl.append((key, value))

    new_query = urlencode(new_qsl, doseq=True)
    return urlunparse((p.scheme, p.netloc, p.path, p.params, new_query, p.fragment))


# ============================
# Autofix: affiliate handling
# ============================
def ensure_onetwo3d_affiliate(url: str) -> str:
    p = urlparse(url)
    if not host_matches(p.netloc, ONETWO3D_DOMAIN):
        return url
    return ensure_query_param(url, ONETWO3D_PARAM_KEY, ONETWO3D_PARAM_VALUE)

def ensure_west3d_affiliate(url: str) -> str:
    p = urlparse(url)
    if not host_matches(p.netloc, WEST3D_DOMAIN):
        return url

    # 1) TOTAL 3DWIKI NUKING
    clean_path, clean_query, clean_fragment = nuke_3dwiki_everywhere(p)

    cleaned = urlunparse(
        (p.scheme, p.netloc, clean_path, p.params, clean_query, clean_fragment)
    )

    # 2) Enforce correct Collabs param
    cleaned = ensure_query_param(cleaned, WEST3D_PARAM_KEY, WEST3D_PARAM_VALUE)

    return cleaned

    return urlunparse((p.scheme, p.netloc, new_path, p.params, p.query, p.fragment))

def fix_url(url: str) -> str:
    url = ensure_west3d_affiliate(url)
    url = ensure_onetwo3d_affiliate(url)
    return url


def process_text_fix(content: str) -> str:
    def repl_md(m: re.Match) -> str:
        return f"{m.group(1)}{m.group(2)}{fix_url(m.group(3))}{m.group(4)}{m.group(5)}"

    def repl_auto(m: re.Match) -> str:
        return f"{m.group(1)}{fix_url(m.group(2))}{m.group(3)}"

    def repl_html(m: re.Match) -> str:
        return f"{m.group(1)}{fix_url(m.group(2))}{m.group(3)}"

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
    return raw.replace("&amp;", "&")


def extract_non_affiliate_external_link_changes(diff_text: str) -> tuple[list[str], list[str]]:
    added: set[str] = set()
    removed: set[str] = set()

    for line in diff_text.splitlines():
        if not line:
            continue
        if line.startswith("+++ ") or line.startswith("--- "):
            continue

        target = None
        if line.startswith("+") and not line.startswith("+++"):
            target = added
        elif line.startswith("-") and not line.startswith("---"):
            target = removed
        else:
            continue

        for m in DIFF_URL_RE.finditer(line):
            url = normalize_url_for_compare(m.group(0))
            p = urlparse(url)

            if p.scheme not in ("http", "https"):
                continue

            if host_matches(p.netloc, WEST3D_DOMAIN) or host_matches(p.netloc, ONETWO3D_DOMAIN):
                continue

            target.add(url)

    return sorted(added - removed), sorted(removed - added)


def write_github_outputs(added: Iterable[str], removed: Iterable[str]) -> None:
    out_path = os.environ.get("GITHUB_OUTPUT")
    payload = [
        "ADDED<<EOF",
        *added,
        "EOF",
        "REMOVED<<EOF",
        *removed,
        "EOF",
    ]
    text = "\n".join(payload) + "\n"

    if out_path:
        with open(out_path, "a", encoding="utf-8") as f:
            f.write(text)
    else:
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


def main() -> None:
    ap = argparse.ArgumentParser(description="Affiliate autofix + external link guard.")
    sub = ap.add_subparsers(dest="cmd", required=True)

    ap_fix = sub.add_parser("fix")
    ap_fix.add_argument("--files", required=True)

    ap_check = sub.add_parser("check")
    ap_check.add_argument("--diff", required=True)

    args = ap.parse_args()

    if args.cmd == "fix":
        files = load_files_from_list(Path(args.files))
        raise SystemExit(run_fix(files))

    if args.cmd == "check":
        raise SystemExit(run_check(Path(args.diff)))


if __name__ == "__main__":
    main()
