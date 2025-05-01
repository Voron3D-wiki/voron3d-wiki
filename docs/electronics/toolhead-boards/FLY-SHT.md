# FLY-SHT Toolhead Boards

## Overview

The FLY-SHT series of toolhead boards are CAN bus enabled control boards designed for 3D printer toolheads. They offer various features and capabilities across different versions, making them suitable for different printer configurations and requirements.

## Available Models

### FLY-SHT36 V2
The SHT36 V2 is the latest iteration of the SHT36 series, offering improved features and capabilities.

**Key Features:**
- CAN bus communication for stable data transmission over long distances
- 24V maximum input voltage
- 10A MOSFET for heater control
- Onboard TMC2209 driver for the extruder
- Onboard ADXL345 accelerometer for input shaper resonance measurement
- Optional MAX31865 chip for PT100 temperature sensor support
- AS5047D magnetic encoder for motion analysis
- Replaceable fan MOSFET supporting 2 controllable fans
- Adjustable fan voltage (5V/12V/24V)
- RGB LED control
- Peripheral interfaces:
  - USB_1
  - CAN_1
  - FAN_2
  - RGB_1
  - Servo_1
  - Probe_1
  - EndStop_3
  - PT100 4-wire (optional)
  - Thermal_1
  - Heater_1

**Note:** There is a known error in the SHT36 V2 silkscreen - FAN0 is actually PB11 and FAN1 is PB10.

### FLY-SHT36 (Original)
The original SHT36 board shares many features with the V2 but may have some limitations in terms of component placement and feature availability.

### FLY-SHT42
The SHT42 is a larger variant of the SHT series, offering additional features and capabilities.

**Key Features:**
- Similar core features to SHT36 V2
- Larger board size for additional components
- Enhanced power handling capabilities
- More extensive peripheral interface options

## Choosing the Right Board

### When to Choose SHT36 V2
- For most standard toolhead applications
- When you need the latest features and improvements
- If you require PT100 temperature sensor support
- When you need reliable CAN bus communication
- For setups requiring input shaper measurements

### When to Choose SHT42
- For larger toolheads requiring more power
- When you need additional peripheral connections
- For setups requiring enhanced power handling
- When space constraints aren't an issue

## Installation and Setup

### Physical Installation
1. Mount the board securely in your toolhead
2. Connect the CAN bus cable
3. Install the heatsink on the TMC2209 driver
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

## Additional Resources

- [Mellow Official Documentation](https://mellow-3d.github.io/)
- [Klipper Documentation](https://www.klipper3d.org/)
- [CanBoot Documentation](https://github.com/Arksine/CanBoot)

## Support

For additional support:
- Join the Mellow Discord server
- Check the Mellow GitHub repository
- Consult the Klipper documentation
