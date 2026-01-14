#!/usr/bin/env python3
import argparse
import re
from pathlib import Path
from urllib.parse import urlparse, urlunparse, parse_qsl, urlencode

DOCS_DIR = "docs"

ONETWO3D_DOMAIN = "onetwo3d.co.uk"
ONETWO3D_PARAM_KEY = "wpam_id"
ONETWO3D_PARAM_VALUE = "9"

WEST3D_DOMAIN = "west3d.com"
WEST3D_AFFIL_PREFIX = "/3DWIKI"

MD_LINK_RE = re.compile(r'(\]\()(\s*)(https?://[^\s)]+)(\s*)(\))')
MD_AUTOLINK_RE = re.compile(r'(<)(https?://[^ >]+)(>)')
HTML_HREF_RE = re.compile(r'(\bhref\s*=\s*["\'])(https?://[^"\']+)(["\'])', re.IGNORECASE)


def host_matches(netloc: str, domain: str) -> bool:
    host = (netloc or "").split("@")[-1].split(":")[0].lower()
    domain = domain.lower()
    return host == domain or host.endswith("." + domain)


def ensure_onetwo3d_affiliate(url: str) -> str:
    p = urlparse(url)
    if not host_matches(p.netloc, ONETWO3D_DOMAIN):
        return url

    qsl = parse_qsl(p.query, keep_blank_values=True)

    for k, v in qsl:
        if k == ONETWO3D_PARAM_KEY and v == ONETWO3D_PARAM_VALUE:
            return url

    qsl.append((ONETWO3D_PARAM_KEY, ONETWO3D_PARAM_VALUE))
    new_query = urlencode(qsl)
    return urlunparse((p.scheme, p.netloc, p.path, p.params, new_query, p.fragment))


def ensure_west3d_affiliate(url: str) -> str:
    p = urlparse(url)
    if not host_matches(p.netloc, WEST3D_DOMAIN):
        return url

    path = p.path or "/"
    if path.startswith(WEST3D_AFFIL_PREFIX + "/") or path == WEST3D_AFFIL_PREFIX:
        return url

    new_path = WEST3D_AFFIL_PREFIX + "/" + path.lstrip("/")
    return urlunparse((p.scheme, p.netloc, new_path, p.params, p.query, p.fragment))


def fix_url(url: str) -> str:
    url2 = ensure_west3d_affiliate(url)
    url3 = ensure_onetwo3d_affiliate(url2)
    return url3


def process_text(content: str) -> str:
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


def process_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    updated = process_text(original)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


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


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--files",
        help="Path to a newline-separated file list of markdown files (relative to repo root). "
             "If omitted, scans docs/ for *.md and *.markdown.",
    )
    args = ap.parse_args()

    if args.files:
        file_list = Path(args.files)
        files = load_files_from_list(file_list) if file_list.exists() else []
    else:
        root = Path(DOCS_DIR)
        files = list(root.rglob("*.md")) + list(root.rglob("*.markdown"))

    changed = 0
    for f in files:
        if f.exists() and f.is_file():
            if process_file(f):
                changed += 1

    print(f"Affiliate fix complete. Files modified: {changed}")


if __name__ == "__main__":
    main()
