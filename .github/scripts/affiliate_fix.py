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
HTML_HREF_RE = re.compile(r'(href=")(https?://[^"]+)(")')

def ensure_onetwo3d_affiliate(url: str) -> str:
    p = urlparse(url)
    if ONETWO3D_DOMAIN not in p.netloc.lower():
        return url

    q = dict(parse_qsl(p.query, keep_blank_values=True))
    if q.get(ONETWO3D_PARAM_KEY) == ONETWO3D_PARAM_VALUE:
        return url

    q[ONETWO3D_PARAM_KEY] = ONETWO3D_PARAM_VALUE
    new_query = urlencode(q, doseq=True)
    return urlunparse((p.scheme, p.netloc, p.path, p.params, new_query, p.fragment))

def ensure_west3d_affiliate(url: str) -> str:
    p = urlparse(url)
    if WEST3D_DOMAIN not in p.netloc.lower():
        return url

    path = p.path or "/"
    # if already has /3DWIKI prefix, do nothing
    if path.startswith(WEST3D_AFFIL_PREFIX + "/") or path == WEST3D_AFFIL_PREFIX:
        return url

    # avoid double slashes
    new_path = WEST3D_AFFIL_PREFIX + ("" if path.startswith("/") else "/") + path.lstrip("/")
    return urlunparse((p.scheme, p.netloc, new_path, p.params, p.query, p.fragment))

def fix_url(url: str) -> str:
    url2 = ensure_west3d_affiliate(url)
    url3 = ensure_onetwo3d_affiliate(url2)
    return url3

def process_text(content: str) -> str:
    def repl_md(m):
        fixed = fix_url(m.group(3))
        return f"{m.group(1)}{m.group(2)}{fixed}{m.group(4)}{m.group(5)}"

    def repl_html(m):
        fixed = fix_url(m.group(2))
        return f'{m.group(1)}{fixed}{m.group(3)}'

    content2 = MD_LINK_RE.sub(repl_md, content)
    content3 = HTML_HREF_RE.sub(repl_html, content2)
    return content3

def process_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    updated = process_text(original)
    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--files", help="Path to a newline-separated file list of markdown files")
    args = ap.parse_args()

    files = []
    if args.files:
        file_list = Path(args.files)
        if file_list.exists():
            files = [Path(line.strip()) for line in file_list.read_text().splitlines() if line.strip()]
    else:
        files = list(Path(DOCS_DIR).rglob("*.md")) + list(Path(DOCS_DIR).rglob("*.markdown"))

    changed = 0
    for f in files:
        if f.exists() and f.is_file():
            if process_file(f):
                changed += 1

    print(f"Affiliate fix complete. Files modified: {changed}")

if __name__ == "__main__":
    main()
