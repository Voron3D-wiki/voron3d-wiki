# Component Specifications

## Overview

This guide provides detailed specifications for electrical components commonly used in Voron 3D printers. Understanding these specifications is crucial for proper component selection and safe operation.

## Power Supplies

### Mean Well PSUs
- **LRS-350-24**
  - Input: 100-240V AC
  - Output: 24V DC, 14.6A
  - Efficiency: 89%
  - Safety: UL/CE/TUV

- **LRS-600-24**
  - Input: 100-240V AC
  - Output: 24V DC, 25A
  - Efficiency: 90%
  - Safety: UL/CE/TUV

### Other Common PSUs
- **Generic 24V PSU**
  - Input: 100-240V AC
  - Output: 24V DC, 10A
  - Efficiency: 85%
  - Safety: CE

## Stepper Motors

### NEMA 17
- **17HS19-2004S**
  - Current: 2A
  - Torque: 59Ncm
  - Step Angle: 1.8°
  - Inductance: 3.2mH

- **17HS08-1004S**
  - Current: 1A
  - Torque: 23Ncm
  - Step Angle: 1.8°
  - Inductance: 2.8mH

## Control Boards

### SKR Series
- **SKR 1.4**
  - MCU: LPC1768
  - Drivers: TMC2209
  - Input: 12-24V
  - Max Current: 2A

- **SKR 2**
  - MCU: STM32F407
  - Drivers: TMC2209
  - Input: 12-24V
  - Max Current: 2A

### Octopus Series
- **Octopus**
  - MCU: STM32F446
  - Drivers: TMC2209
  - Input: 12-24V
  - Max Current: 2A

## Heaters

### Bed Heaters
- **AC Bed Heater**
  - Voltage: 120/240V AC
  - Power: 750W
  - Size: 310x310mm
  - Max Temp: 120°C

- **DC Bed Heater**
  - Voltage: 24V DC
  - Power: 500W
  - Size: 310x310mm
  - Max Temp: 120°C

### Hotend Heaters
- **Cartridge Heater**
  - Voltage: 24V DC
  - Power: 40W
  - Size: 6mm
  - Max Temp: 400°C

## Sensors

### Thermistors
- **100k NTC**
  - Resistance: 100kΩ @ 25°C
  - Beta: 3950
  - Max Temp: 300°C
  - Accuracy: ±1%

### Endstops
- **Mechanical**
  - Voltage: 3.3-24V
  - Current: 50mA
  - Life: 1M cycles
  - Type: NO/NC

- **Optical**
  - Voltage: 3.3-5V
  - Current: 20mA
  - Response: 0.1ms
  - Type: NO/NC

## Fans

### Part Cooling
- **5015 Blower**
  - Voltage: 24V
  - Current: 0.1A
  - Airflow: 5.5CFM
  - Noise: 25dB

### Hotend Cooling
- **4010 Axial**
  - Voltage: 24V
  - Current: 0.08A
  - Airflow: 4.5CFM
  - Noise: 20dB

## Resources

- [Voron GitHub](https://github.com/VoronDesign)
- [Klipper Documentation](https://www.klipper3d.org/)
- [Mean Well PSU Documentation](https://www.meanwell.com/)
- [TMC Driver Documentation](https://www.trinamic.com/) 