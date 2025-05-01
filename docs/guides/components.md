# Component Selection

## Overview

This guide helps you select appropriate components for your Voron 3D printer build, focusing on quality, compatibility, and safety.

## Control Boards

### Recommended Boards
- **SKR 1.4**
  - MCU: LPC1768
  - Drivers: TMC2209
  - Best for: V0, Switchwire

- **SKR 2**
  - MCU: STM32F407
  - Drivers: TMC2209
  - Best for: V2.4, Trident

- **Octopus**
  - MCU: STM32F446
  - Drivers: TMC2209
  - Best for: Large builds

### Selection Criteria
1. **MCU Performance**
   - Processing power
   - Memory
   - I/O capabilities
   - Future-proofing

2. **Driver Features**
   - StealthChop
   - SpreadCycle
   - Sensorless homing
   - Current control

## Stepper Motors

### NEMA 17
- **17HS19-2004S**
  - Current: 2A
  - Torque: 59Ncm
  - Best for: X, Y, Z

- **17HS08-1004S**
  - Current: 1A
  - Torque: 23Ncm
  - Best for: Extruder

### Selection Guide
1. **Torque Requirements**
   - Calculate needed torque
   - Add safety margin
   - Consider acceleration

2. **Current Rating**
   - Check driver limits
   - Consider cooling
   - Match to application

## Heaters

### Bed Heaters
- **AC Bed Heater**
  - Voltage: 120/240V AC
  - Power: 750W
  - Best for: Large beds

- **DC Bed Heater**
  - Voltage: 24V DC
  - Power: 500W
  - Best for: Small beds

### Hotend Heaters
- **Cartridge Heater**
  - Voltage: 24V DC
  - Power: 40W
  - Best for: Most hotends

## Sensors

### Thermistors
- **100k NTC**
  - Resistance: 100kΩ @ 25°C
  - Beta: 3950
  - Best for: General use

### Endstops
- **Mechanical**
  - Voltage: 3.3-24V
  - Current: 50mA
  - Best for: General use

- **Optical**
  - Voltage: 3.3-5V
  - Current: 20mA
  - Best for: Precision

## Fans

### Part Cooling
- **5015 Blower**
  - Voltage: 24V
  - Current: 0.1A
  - Best for: Part cooling

### Hotend Cooling
- **4010 Axial**
  - Voltage: 24V
  - Current: 0.08A
  - Best for: Hotend cooling

## Power Supplies

### Mean Well
- **LRS-350-24**
  - Output: 24V DC, 14.6A
  - Best for: V0, Switchwire

- **LRS-600-24**
  - Output: 24V DC, 25A
  - Best for: V2.4, Trident

## Connectors

### Power
- **XT60/XT90**
  - Current: 60A/90A
  - Best for: Main power

- **JST**
  - Current: 3A
  - Best for: Component power

### Signal
- **Dupont**
  - Current: 1A
  - Best for: Sensors

- **Molex**
  - Current: 3A
  - Best for: Fans, LEDs

## Resources

- [Voron GitHub](https://github.com/VoronDesign)
- [Klipper Documentation](https://www.klipper3d.org/)
- [Component Specifications](../specifications.md)
- [Electrical Standards](../standards.md) 