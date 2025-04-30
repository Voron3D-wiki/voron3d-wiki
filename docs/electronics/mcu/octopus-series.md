---
title: Octopus Series
description: Comprehensive guide to Octopus series mainboards for high-end 3D printers
published: true
tags: [mcu, mainboard, octopus, klipper, marlin]
last_updated: {{ git_revision_date_localized }}
---

# Octopus Series

!!! info "Page Information"
    - **Last Updated**: {{ git_revision_date_localized }}
    - **Contributors**: {{ git_author }}

## Overview
The Octopus series represents BigTreeTech's high-end mainboard offerings, designed for advanced 3D printers requiring extensive features and capabilities. These boards are particularly well-suited for complex printer configurations and professional applications.

## Available Models

### Octopus V1.1
- **Processor**: STM32F446
- **Stepper Drivers**: 8x (configurable)
- **Connectivity**: USB, UART, CAN
- **Price Range**: $$$
- **Best For**: High-end printers, multi-extruder setups

### Octopus Pro
- **Processor**: STM32H743
- **Stepper Drivers**: 8x (configurable)
- **Connectivity**: USB, UART, CAN, Ethernet
- **Price Range**: $$$$
- **Best For**: Professional printers, complex setups

## Key Features

### Hardware Features
- High-performance STM32 processors
- 8 stepper driver support
- Multiple connectivity options
- CAN bus support
- Ethernet capability (Pro model)
- Multiple fan outputs
- Advanced sensor support
- Extensive GPIO options

### Software Support
- Klipper firmware support
- Marlin firmware support
- Community firmware options
- Extensive documentation
- Active community support

## Installation Guide

### Basic Setup
1. Mount the board in your printer
2. Connect stepper motors
3. Connect endstops
4. Connect heaters and fans
5. Flash firmware

### Configuration
- [Klipper Configuration Guide](./guides/klipper-config.md)
- [Marlin Configuration Guide](./guides/marlin-config.md)
- [Pin Mapping Reference](./guides/pin-mapping.md)

## Common Modifications

### Expansion Options
- CAN bus expansion
- Ethernet connectivity
- Additional stepper drivers
- Advanced sensor integration
- Display integration

### Community Mods
- Custom cooling solutions
- Power supply modifications
- Additional connectivity options
- Custom firmware features

## Troubleshooting

### Common Issues
1. Stepper motor configuration
2. USB connectivity problems
3. Firmware flashing errors
4. Power supply issues
5. CAN bus communication

### Solutions
- [Troubleshooting Guide](./guides/troubleshooting.md)
- [FAQ Section](./guides/faq.md)
- [Community Support](./guides/community-support.md)

## Related Resources
- [BTT Official Documentation](https://github.com/bigtreetech)
- [Voron Design GitHub](https://github.com/VoronDesign)
- [Voron Discord](https://discord.gg/voron)

## References
1. BTT Official Documentation
2. Community Modifications Database
3. User Experience Reports

{% include "ads/footer-AD.md" %} 