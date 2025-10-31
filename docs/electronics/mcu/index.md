---
title: Main Control Units
description: Comprehensive guide to Main Control Units (MCUs) for 3D printers, including features, specifications, and compatibility
published: true
tags: [mcu, mainboard, klipper, marlin, electronics]
---

!!! Warning
   - This page is a work in progress.

# Main Control Units

## Overview
Main Control Units (MCUs) are the brains of 3D printers, responsible for processing commands, controlling motors, and managing various peripherals. This guide provides a quick comparison of different MCU options and links to detailed information pages.

## Quick Comparison Table

| MCU Series | Processor | Stepper Drivers | Connectivity | Price Range | Best For | 
|------------|-----------|-----------------|--------------|-------------|-----------|
| [BTT SKR Series](./btt-skr.md) | STM32/RP2040 | 4-6 | USB, UART | $ | Entry to Mid-range |
| [RP2040 Boards](./rp2040-boards.md) | Dual-core ARM | 4-6 | USB, GPIO | $ | Entry Level |
| [MKS Boards](./mks.md) | LPC1768/1769 | 4-6 | USB/Ethernet | $$ | Mid-range |
| [Octopus Series](./octopus.md) | STM32 | 8 | Multiple | $$$ | High-end |
| Manta Series | *coming soon* | *coming soon* | *coming soon* | *coming soon* | *coming soon* |
| Kraken | *coming soon* | *coming soon* | *coming soon* | *coming soon* | *coming soon* |
| Manta Series | *coming soon* | *coming soon* | *coming soon* | *coming soon* | *coming soon* |
| [Mellow Fly Boards](./mellow-fly.md) | STM32F407 | 4-8 | Multiple | $$ | Mid to High-end |


## Key Features Comparison

### Processor Types
| Type | Examples | Features | Best For |
|------|----------|----------|-----------|
| 8-bit | ATmega2560 | Basic features | Legacy systems |
| 32-bit | STM32F4/H7 | Advanced features | Modern printers |
| Multi-core | RP2040 | Parallel processing | Complex setups |

### Connectivity Options
| Type | Speed | Use Cases | Compatibility |
|------|-------|-----------|---------------|
| USB | High | Direct connection | Universal |
| CAN bus | Medium | Networked devices | Advanced setups |
| Ethernet | High | Network integration | Professional use |


## Factors to Consider


### **Computing Requirements**
   - Klipper requires an MCU and a SBC, those stand for main control unit and single board computer respectively, some MCU's will mount a SBC onto the same board to make an all in one solution. 
     - All in one MCU+SBC soldered onto the PCB - cheaper than individual parts and much easier to wire up - massive single point of failure
     - MCU with spot for Raspberry PI compute module (or similar board) - tend to be more expensive, but is much easier to wire - could add some linux complexity for those unprepared.


### **Stepper Driver Support**
   - Number of drivers needed
   - Driver type (TMC, A4988)
   - UART/SPI support


### **Connectivity Needs**
   - USB
   - CAN bus
   - WiFi/Bluetooth
   - Ethernet


### **I/O Considerations**
   - How many heaters do you want?
   - how many thermisters do you want?
   - how many fans do you want?
   - how many filament sensors do you want?
   - how many endstops do you want?


## Technical Specifications to pay attention to


### **Processor Types**
### 8-bit
  - ATmega2560
  - ATmega1280
### 32-bit
  - STM32F4
  - STM32H7
  - rp2040
  - rp2350
  - LPC1768/1769


### Memory Requirements
- Flash memory
- RAM
- EEPROM
- External storage


### Interface Options
- USB
- UART
- SPI
- I2C
- CAN bus
- GPIO


## Firmware Compatibility


### Klipper
- Configuration requirements
- Feature support
- Update procedures
- Custom macros


### Marlin
- Version compatibility
- Feature support
- Configuration
- Updates


## Related Resources
- [Voron Design GitHub](https://github.com/VoronDesign)
- [Voron Discord](https://discord.gg/voron)
- [Voron Subreddit](https://www.reddit.com/r/voroncorexy)


## References
1. Voron Design Documentation
2. Community Modifications Database
3. User Experience Reports


{% include "ads/footer-AD.md" %}
