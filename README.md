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
- Update the table of contents if needed

## Development

### Project Structure
```
voron3d-wiki/
├── docs/               # Documentation source files
├── assets/            # Static assets (images, etc.)
├── stylesheets/       # Custom CSS
└── mkdocs.yml        # MkDocs configuration
```

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