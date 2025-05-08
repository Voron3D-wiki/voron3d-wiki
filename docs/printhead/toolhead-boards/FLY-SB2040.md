---
title: FLY-SB2040 Tool Head boards
description: Information about the FLY-SB2040 Toolhead board
published: true
tags: [FLY, SB2040, FLY-SB2040, SB2040-V1, SB2040-V2]
---

## Overview

The FLY-SB2040 series of toolhead boards are CAN bus enabled control boards designed for 3D printer toolheads. They offer various features and capabilities across different versions, making them suitable for different printer configurations and requirements.

## Available Models

### FLY-SB2040-V2
The SB2040-V2 is the latest iteration of the SB2040 series, offering improved features and capabilities.

**Key Features:**
- CAN bus communication for stable data transmission over long distances
- 24V maximum input voltage
- 5A MOSFET for heater control
- Onboard TMC2209 driver for the extruder
- Onboard ADXL345 accelerometer for input shaper resonance measurement
- 3 controllable fans
- RGB LED control
- Optional MAX31865 chip for PT100 temperature sensor support
- 5V anti-backflow protection
- Peripheral interfaces:
  - USB_1
  - CAN_1
  - FAN_3
  - RGB_1
  - Servo_1
  - Probe_1
  - EndStop_3
  - Thermal_1
  - Heater_1

### FLY-SB2040-V1
The original SB2040 board shares many features with the V2 but may have some limitations in terms of component placement and feature availability.

## Choosing the Right Board

### When to Choose SB2040-V2
- For most standard toolhead applications
- When you need 3 fan control channels
- For compact toolhead designs
- When 5A heater current is sufficient
- For setups requiring 5V anti-backflow protection
- When you need a balance of features and size

### When to Choose SB2040-V1
- For basic toolhead applications
- When you don't need the latest features
- For budget-conscious builds
- When you have existing V1 components

## Installation and Setup

### Physical Installation
1. Mount the board securely in your toolhead
2. Install the heatsink on the TMC2209 driver
3. Connect the CAN bus cable (recommended length < 1 meter for USB)
4. Connect all necessary peripherals (fans, heater, etc.)

### CAN Bus Configuration
1. Ensure proper CAN bus termination
2. Configure the board in your Klipper configuration
3. Set up the appropriate CAN bus ID

### Firmware Installation
1. Install CanBoot bootloader
2. Flash Klipper firmware
3. Configure the board in your printer.cfg

## Troubleshooting

### Common Issues
1. CAN bus communication problems
   - Check termination resistors
   - Verify CAN bus ID configuration
   - Ensure proper cable connections

2. Fan control issues
   - Verify correct fan port connections
   - Check voltage settings
   - Ensure proper MOSFET installation

3. Temperature sensor problems
   - Verify thermistor connections
   - Check for proper voltage reference
   - Ensure correct configuration in Klipper

4. USB connection issues
   - Verify cable length is under 1 meter
   - Check USB port functionality
   - Ensure proper driver installation

## Comparison with Other Boards

### vs FLY-SHT36 V2
- SHT36 V2 has a 10A MOSFET vs SB2040's 5A
- SHT36 V2 has 2 fans vs SB2040's 3 fans
- SHT36 V2 has adjustable fan voltage (5V/12V/24V)
- SHT36 V2 has AS5047D magnetic encoder
- SB2040 has 5V anti-backflow protection

### vs FLY-SHT42
- SHT42 is larger with more power handling
- SHT42 has more extensive peripheral options
- SB2040 is more compact
- SB2040 has 3 fan channels vs SHT42's 2

## Additional Resources

- [Mellow Official Documentation](https://mellow-3d.github.io/)
- [Klipper Documentation](https://www.klipper3d.org/)
- [CanBoot Documentation](https://github.com/Arksine/CanBoot)

## Support

For additional support:
- Join the Mellow Discord server
- Check the Mellow GitHub repository
- Consult the Klipper documentation

{% include "ads/footer-AD.md" %}

## Purchase Information

The FLY-SB2040 boards are available for purchase through:
- Mellow's AliExpress store
- Authorized Mellow resellers 