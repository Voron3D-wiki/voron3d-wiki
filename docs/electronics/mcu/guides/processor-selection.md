---
title: Processor Selection Guide
description: Guide for selecting the right processor for your Voron printer
published: true
tags: [mcu, processor, selection]
---

# Processor Selection Guide

## Overview
This guide helps you select the right processor for your Voron printer based on your requirements and budget.

## Key Considerations

### Performance Requirements
| Feature | Minimum | Recommended |
|---------|---------|-------------|
| Clock Speed | 100MHz | 120MHz+ |
| Flash Memory | 256KB | 512KB+ |
| RAM | 32KB | 64KB+ |
| I/O Pins | 40+ | 50+ |

### Required Features
1. Hardware PWM
2. Hardware UART
3. Hardware SPI
4. Hardware I2C
5. ADC capabilities

## Popular Options

### 32-bit Processors
```text title="Recommended MCUs"
STM32F4 Series:
- High performance
- Good community support
- Extensive documentation
- Wide availability

STM32H7 Series:
- Higher performance
- More memory
- Advanced features
- Premium option

RP2040:
- Dual core
- Good performance
- Excellent community
- Cost effective
```

### Legacy Options
1. AVR-based boards
2. 8-bit processors
3. Limited features
4. Not recommended for new builds

## Selection Criteria

### Performance Metrics
| Metric | Importance | Notes |
|--------|------------|-------|
| Clock Speed | High | Affects print speed |
| Memory | High | Affects features |
| I/O Count | Medium | Depends on needs |
| Price | Medium | Budget dependent |

### Compatibility
1. Klipper support
2. Community support
3. Documentation
4. Availability

## Recommendations

### Budget Builds
```text title="Budget Options"
- SKR Mini E3 V3
- BTT Octopus
- Mellow Fly E3 Pro
```

### Performance Builds
1. BTT Octopus Pro
2. Mellow Fly Super8
3. Fysetc Spider

## References
1. [Klipper Documentation](https://www.klipper3d.org/)
2. [Voron Hardware Guide](https://docs.vorondesign.com/hardware.html)
3. [Community Support](https://discord.gg/voron)

{% include "ads/footer-AD.md" %} 