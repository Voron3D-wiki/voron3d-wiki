# Voron3D Wiki

![Voron3D Wiki](assets/VoronLogo.png)

A comprehensive documentation site for Voron 3D printers, built with MkDocs Material.

## Overview

The Voron3D Wiki provides detailed documentation for Voron 3D printers, including:
- Printer specifications and build guides
- Component selection and compatibility
- Software configuration
- Troubleshooting guides
- Community resources

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/voron3d-wiki.git
cd voron3d-wiki
```

2. Install dependencies:
```bash
pip install mkdocs-material
```

3. Run locally:
```bash
mkdocs serve
```

Visit `http://127.0.0.1:8000` to view the documentation.

## Project State and Invariants

**[AUDIT.md](AUDIT.md)** tracks the current state of the wiki and, more
importantly, the things that must not be broken by a change — the page layout
convention, the deployment setup, and the CI security rules. Read the Invariants
section before touching `mkdocs.yml`, `.github/`, `requirements.txt`, or the
layout of `docs/`, and use its pre-merge checklist.

It also lists which pages are stalest and thinnest, so there is always an
obvious place to start writing.

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Documentation Guidelines

- Use clear, concise language
- Include relevant images and diagrams
- Follow the existing style guide
- Test all links and code examples
- Add every new page to the `nav` in `mkdocs.yml`
- Run `mkdocs build --strict` before opening a PR — CI runs it and it fails on
  broken internal links, missing nav targets, and bad plugin options

## Development

### Project Structure
```
voron3d-wiki/
├── docs/               # Documentation source files
│   ├── assets/         # Site-wide assets (logo, favicon)
│   ├── javascripts/    # Custom JS
│   ├── stylesheets/    # Custom CSS
│   └── _templates/     # Page template, and partials pulled in with {% include %}
├── overrides/          # Material theme overrides
├── requirements.txt    # Python dependencies
└── mkdocs.yml          # MkDocs configuration
```

### Page Layout Convention

**Every content page is `<name>/index.md`, and its images live in that same
folder.** One topic, one folder, everything for it in one place.

```
docs/printhead/toolhead-boards/mks-thr/
├── index.md                 # the page
├── MKS-UTC-conf.png         # its images
└── MKS-THR-36-42-conf.png
```

So a page's URL is its folder path, and adding a screenshot means dropping the
file next to `index.md` and referencing it by bare filename — no `../assets/`
paths to get wrong. When adding a page:

1. `mkdir docs/<section>/<page-name>/`
2. Copy `docs/_templates/page_template.md` to `<page-name>/index.md`
3. Put the images in the same folder
4. Add it to the `nav` in `mkdocs.yml` as `<section>/<page-name>/index.md`

Do not create flat `docs/<section>/<page>.md` files. The only files outside this
convention are the root `docs/index.md` and three `{% include %}` partials:
`docs/affiliate-disclosure.md`, `docs/_templates/page_template.md`, and
`docs/_templates/work-in-progress.md`.

### Building the Site
```bash
mkdocs build
```

The built site will be in the `site/` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Voron Design](https://vorondesign.com/) for the original printer designs
- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) for the documentation framework
- All contributors who have helped improve the documentation 