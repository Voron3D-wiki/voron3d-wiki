---
title: BTT EBB36 Toolhead Board
description: Documentation for the BigTreeTech EBB36 CAN bus toolhead board
published: true
tags: [electronics, toolhead-boards, btt, ebb36]
---

# BTT EBB36 Toolhead Board

## Overview
The BigTreeTech EBB36 is a compact CAN bus toolhead board designed for Voron printers.

## Specifications
- MCU: STM32G0B1
- Stepper Driver: TMC2209
- Input Voltage: 24V
- CAN bus Interface
- USB Interface
- Dimensions: 36.4 x 36.4mm

## Features
- Integrated stepper driver
- Thermistor input
- Heater output
- 2x fan outputs
- Endstop input
- RGB LED support
- ADXL345 support

## Installation
1. Mount board to toolhead
2. Connect CAN bus cables
3. Configure firmware
4. Test functionality

## Configuration
```ini
[mcu EBB36]
canbus_uuid: 123456789

[tmc2209 extruder]
uart_pin: EBB36:PA15
run_current: 0.5
stealthchop_threshold: 999999
```

## References
1. [BTT Documentation](https://github.com/bigtreetech/EBB)
2. [Voron Hardware Guide](https://docs.vorondesign.com/hardware.html)

{% include "ads/footer-AD.md" %} 