---
title: Page Title
description: Brief description of the page content
published: true
tags: [tag1, tag2, tag3]
---

# Page Title

## Overview
[Brief overview of the topic]

## Detailed Information
[Main content sections]

## Technical Specifications
[Technical details and specifications]

## Code Block Usage
When adding code blocks to documentation, follow these guidelines:

1. **Basic Code Block**:
   ```python
   # Use three backticks followed by the language name
   print("Hello World")
   ```

2. **Command Line Block**:
   ```bash title="Terminal Commands"
   voron-pi-linux:~$ echo "Use voron-pi-linux:~$ as the prompt"
   ```

3. **Code Block with Title**:
   ```python title="example.py"
   # The title attribute adds a header to the code block
   def example():
       return "Hello World"
   ```

4. **Code Block with Line Numbers**:
   ```python linenums="1"
   # Add linenums="1" for line numbers
   def example():
       return "Hello World"
   ```

5. **Code Block with Highlighting**:
   ```python hl_lines="2"
   # Use hl_lines to highlight specific lines
   def example():  # This line will be highlighted
       return "Hello World"
   ```

Each code block includes:
- A copy button in the top-right corner
- Optional line numbers (add `linenums="1"`)
- Optional title (add `title="Your Title"`)
- Optional syntax highlighting (specify language after backticks)
- Optional line highlighting (add `hl_lines="2 3 4"`)

## Related Resources
- [Related Link 1]
- [Related Link 2]

## References
1. [Reference 1]
2. [Reference 2]
3. 
!!! info "Page Information"
    - **Last Updated**: {{ git_revision_date_localized }}
    - **Contributors**: {{ git_author }}
    - 
{% include "ads/footer-AD.md" %} 