---
title: BTT SKR Series
description: Detailed information about BigTreeTech SKR series mainboards
published: true
tags: [mcu, mainboard, btt, skr, klipper, marlin]
---

# BTT SKR Series

## Overview
The BigTreeTech (BTT) SKR series represents a popular line of 32-bit mainboards designed for 3D printers. These boards offer a good balance of features, performance, and price, making them suitable for various printer configurations.

## Available Models

### SKR Mini E3 V3
- **Processor**: STM32G0B1
- **Stepper Drivers**: 4x TMC2209
- **Connectivity**: USB, UART
- **Price Range**: $
- **Best For**: Entry-level printers, Ender 3 upgrades
- **Buy**: [Amazon ](https://amzn.to/47q6csL), [  Biqu Offical Store](https://tidd.ly/3K362Qt) [  West3d](https://west3d.com/products/btt-skr-mini-e3-v3-controller-board-3d-printer-control-system/3DWIKI)

### SKR Pro V1.2
- **Processor**: STM32F407
- **Stepper Drivers**: 6x (configurable)
- **Connectivity**: USB, UART, CAN
- **Price Range**: $$
- **Best For**: Mid-range printers, multi-extruder setups
- **Buy**: [Amazon ](https://amzn.to/4nxDDQn), [  Biqu Offical Store](https://tidd.ly/3JZzlU4)

### SKR 3
- **Processor**: STM32F407
- **Stepper Drivers**: 5x (configurable)
- **Connectivity**: USB, UART
- **Price Range**: $$
- **Best For**: Standard printers, dual Z-axis setups
- **Buy**: [Amazon ](https://amzn.to/3JaLCEW), [  Biqu Offical Store](https://tidd.ly/4hWbmSa)

### SKR Pico
- **Processor**: RP2040
- **Stepper Drivers**: 4x (configurable)
- **Connectivity**: USB, GPIO
- **Price Range**: $
- **Best For**: Entry-level printers, compact builds
- **Buy**: [amazon ](https://amzn.to/4311sbM), [  Biqu Offical Store](https://tidd.ly/48bjuLf)

## Key Features

### Hardware Features
- 32-bit processors (except SKR Pico)
- Multiple stepper driver support
- Various connectivity options
- Expandable through expansion boards
- Multiple fan outputs
- Heated bed control
- Endstop inputs

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
- WiFi connectivity
- Additional stepper drivers
- Sensor integration

### Community Mods
- Custom cooling solutions
- Power supply modifications
- Additional connectivity options
- Custom firmware features

## Troubleshooting

### Common Issues
1. Stepper motor issues
2. USB connectivity problems
3. Firmware flashing errors
4. Power supply issues

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