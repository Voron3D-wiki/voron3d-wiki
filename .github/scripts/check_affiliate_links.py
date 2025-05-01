#!/usr/bin/env python3

import os
import re
from pathlib import Path
import requests
from bs4 import BeautifulSoup
import markdown
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
AFFILIATE_TAG = "?wpam_id=9"
ONETWO3D_DOMAIN = "onetwo3d.co.uk"
DOCS_DIR = "docs"

def is_valid_url(url):
    """Check if a URL is valid and accessible."""
    try:
        response = requests.head(url, allow_redirects=True, timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False

def add_affiliate_tag(url):
    """Add affiliate tag to OneTwo3D URLs if not present."""
    if ONETWO3D_DOMAIN in url:
        if "?" in url:
            if AFFILIATE_TAG not in url:
                return f"{url}&{AFFILIATE_TAG[1:]}"
        else:
            return f"{url}{AFFILIATE_TAG}"
    return url

def process_markdown_file(file_path):
    """Process a markdown file and update affiliate links."""
    logger.info(f"Processing {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Convert markdown to HTML to properly handle links
    html = markdown.markdown(content)
    soup = BeautifulSoup(html, 'html.parser')
    
    modified = False
    for link in soup.find_all('a'):
        href = link.get('href', '')
        if ONETWO3D_DOMAIN in href:
            new_href = add_affiliate_tag(href)
            if new_href != href:
                link['href'] = new_href
                modified = True
    
    if modified:
        # Convert back to markdown
        new_content = str(soup)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        logger.info(f"Updated affiliate links in {file_path}")

def main():
    """Main function to process all markdown files."""
    docs_path = Path(DOCS_DIR)
    if not docs_path.exists():
        logger.error(f"Docs directory {DOCS_DIR} not found!")
        return
    
    markdown_files = list(docs_path.rglob("*.md"))
    logger.info(f"Found {len(markdown_files)} markdown files")
    
    for file_path in markdown_files:
        process_markdown_file(file_path)

if __name__ == "__main__":
    main() 