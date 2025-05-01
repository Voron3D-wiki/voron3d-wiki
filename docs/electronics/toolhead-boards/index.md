---
title: Toolhead Boards
description: Comprehensive guide to toolhead control boards for Voron 3D printers
published: true
tags: [toolhead, electronics, canbus, klipper]
---

# Toolhead Boards

## Overview
Toolhead boards are specialized control units designed to manage the electronics in the moving toolhead of a 3D printer. These boards help reduce wiring complexity and improve reliability through features like CAN bus connectivity.

## Quick Comparison Table

| Board | Connectivity | Features | Price Range | Best For |
|-------|--------------|----------|-------------|-----------|
| [BTT EBB](./BTT-EBB.md) | CAN bus, USB | Integrated drivers, multiple sensors support | $$ | Most Voron builds |
| [MKS THR](./mks-thr.md) | CAN bus, USB  | Three independently controllable fans | $$ | Advanced setups |
| [FLY SHT](./FLY-SHT.md) | CAN bus, USB  | Compact design, multiple sensors support | $$ | Lightweight builds |
| [LDO Orbitool O2](./ldo-orbitool-o2.md) | USB | Integrated accelerometer, TMC2209 | $$ | Orbiter 2 users |
| [LDO Orbitool 3](./ldo-orbitool-3.md) | USB | Integrated accelerometer, TMC2209 | $$ | Smart Orbiter 3 users |
| [Fysetc M36](./fysetc-M36.md) | USB | Pre-configured, simple setup | $ | Voron V0 kits |

## Key Features

### Connectivity Options
- CAN bus support
- USB connectivity
- GPIO expansion
- Sensor integration

### Common Features
- Stepper driver support
- Temperature monitoring
- Endstop inputs
- Fan control
- LED control

## Board-Specific Details

### Fysetc M36
The Fysetc M36 is designed specifically for Voron V0 kits. While it offers easy setup and comes pre-configured, it has some reliability concerns:
- **Pros:**
  - Easy to use
  - Pre-configured
  - Simple setup
- **Cons:**
  - Known to short easily
  - Fragile construction
  - Uses JST-PH connectors
  - Tendency to connect 24V power before ground when plugged/unplugged

**Important Note:** Always power off the printer completely before unplugging the toolhead board.

## Installation Guide

### Basic Setup
1. Mount the board
2. Connect CAN bus
3. Configure firmware
4. Test functionality

### Configuration
- [Klipper Configuration](../guides/klipper-config.md)
- [CAN bus Setup](../guides/canbus-setup.md)
- [Pin Mapping](../guides/pin-mapping.md)

## Common Modifications

### Expansion Options
- Additional sensors
- Custom cooling
- LED integration
- Custom firmware

### Community Mods
- Power supply modifications
- Cooling solutions
- Custom enclosures
- Firmware features

## Troubleshooting

### Common Issues
1. CAN bus connectivity
2. Power supply problems
3. Firmware configuration
4. Sensor integration

### Solutions
- [Troubleshooting Guide](../guides/troubleshooting.md)
- [FAQ Section](../guides/faq.md)
- [Community Support](../guides/community-support.md)

## Related Resources
- [Voron Design GitHub](https://github.com/VoronDesign)
- [Voron Discord](https://discord.gg/voron)
- [Voron Subreddit](https://www.reddit.com/r/voroncorexy)

## References
1. Voron Design Documentation
2. Community Modifications Database
3. User Experience Reports

{% include "ads/footer-AD.md" %} 