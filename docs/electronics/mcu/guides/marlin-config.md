---
title: Marlin Configuration Guide
description: Guide for configuring Marlin firmware for Voron printers
published: true
tags: [marlin, configuration, firmware]
---

# Marlin Configuration Guide

## Overview
This guide covers the configuration of Marlin firmware for Voron printers, including basic setup and advanced features.

## Basic Configuration

### Board Configuration
```cpp title="Basic Board Config"
#define MOTHERBOARD BOARD_BTT_OCTOPUS_V1_1
#define SERIAL_PORT 2
#define BAUDRATE 115200
#define SERIAL_PORT_2 -1
```

### Printer Settings
| Setting | Value | Notes |
|---------|-------|-------|
| Max Feedrate | 300 | mm/s |
| Max Acceleration | 3000 | mm/s² |
| Max Travel | 250 | mm |
| Steps/mm | 80 | Default |

## Advanced Features

### CoreXY Configuration
```cpp title="CoreXY Config"
#define COREXY
#define DEFAULT_AXIS_STEPS_PER_UNIT   { 80, 80, 400, 933 }
#define DEFAULT_MAX_FEEDRATE          { 300, 300, 15, 25 }
#define DEFAULT_MAX_ACCELERATION      { 3000, 3000, 350, 1000 }
```

### Bed Leveling
1. Manual mesh
2. Auto bed leveling
3. UBL
4. Z probe options

## Sensor Configuration

### Temperature Sensors
```cpp title="Temp Sensor Config"
#define TEMP_SENSOR_0 1
#define TEMP_SENSOR_BED 1
#define TEMP_SENSOR_CHAMBER 1
#define CHAMBER_FAN_INDEX 7
```

### Endstops
1. Mechanical
2. Optical
3. Inductive
4. Sensorless

## Display Configuration

### Basic Display
```cpp title="Display Config"
#define REPRAP_DISCOUNT_FULL_GRAPHIC_SMART_CONTROLLER
#define DOGLCD_CS        EXP1_7_PIN
#define DOGLCD_MOSI      EXP1_6_PIN
#define DOGLCD_SCK       EXP1_8_PIN
#define BTN_ENC          EXP1_2_PIN
#define BTN_EN1          EXP2_5_PIN
#define BTN_EN2          EXP1_3_PIN
```

### Touch Display
1. BTT TFT
2. Fysetc TFT
3. Generic LCD
4. Custom solutions

## Network Configuration

### Basic Setup
```cpp title="Network Config"
#define ENABLE_ETHERNET
#define ETHERNET_IP "192.168.1.100"
#define ETHERNET_SUBNET "255.255.255.0"
#define ETHERNET_GATEWAY "192.168.1.1"
```

### Advanced Features
1. WiFi support
2. Web interface
3. Remote access
4. Monitoring

## Troubleshooting

### Common Issues
| Problem | Solution | Notes |
|---------|----------|-------|
| Compile Error | Check config | Most common |
| Upload Error | Check connection | Verify port |
| Sensor Error | Check wiring | Verify pins |
| Motion Error | Check kinematics | Verify setup |

### Diagnostic Steps
1. Check logs
2. Verify connections
3. Test components
4. Validate config

## References
1. [Marlin Documentation](https://marlinfw.org/)
2. [Voron Hardware Guide](https://docs.vorondesign.com/hardware.html)
3. [Configuration Guide](https://marlinfw.org/docs/configuration/configuration.html)

{% include "ads/footer-AD.md" %} 