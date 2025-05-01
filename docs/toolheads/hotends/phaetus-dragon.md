---
title: Phaetus Dragon Hotend
description: Guide for the Phaetus Dragon hotend
published: true
tags: [hotend, phaetus, dragon]
---

# Phaetus Dragon Hotend

## Overview
The Phaetus Dragon is a high-performance hotend designed for high-flow and high-temperature 3D printing applications.

## Specifications

### Technical Details
| Parameter | Value | Notes |
|-----------|-------|-------|
| Max Temp | 300°C | Standard version |
| Flow Rate | Up to 15mm³/s | HF version |
| Nozzle Size | 0.4mm standard | 0.2-0.8mm available |
| Heat Block | Copper | Nickel plated |

### Variants
```text title="Available Models"
Standard Flow (SF):
- Flow rate: up to 11mm³/s
- Standard printing speeds
- Better detail quality

High Flow (HF):
- Flow rate: up to 15mm³/s
- Higher printing speeds
- Optimized for volume
```

## Installation

### Required Tools
1. 2mm hex key
2. 2.5mm hex key
3. 7mm wrench
4. Thermal paste
5. Heat block sock

### Mounting Steps
```bash title="Installation Process"
1. Heat break installation
2. Heat block mounting
3. Nozzle installation
4. Thermistor/heater
5. Fan mounting
```

## Configuration

### Klipper Settings
```python title="Example Config"
[extruder]
step_pin: PE3
dir_pin: PE4
enable_pin: !PE5
microsteps: 16
rotation_distance: 33.500
nozzle_diameter: 0.400
filament_diameter: 1.750
heater_pin: PA2
sensor_type: ATC Semitec 104GT-2
sensor_pin: PF4
min_temp: 0
max_temp: 300
max_power: 1.0
pressure_advance: 0.035
```

### PID Tuning
| Parameter | Typical Value | Notes |
|-----------|--------------|-------|
| Kp | 25.0 | Proportional |
| Ki | 1.5 | Integral |
| Kd | 105.0 | Derivative |

## Maintenance

### Regular Checks
```text title="Maintenance Schedule"
Weekly:
- Clean nozzle
- Check heat break
- Verify temperatures

Monthly:
- Full disassembly
- Deep cleaning
- Parts inspection
```

### Common Issues
1. Heat creep
2. Nozzle clogs
3. Temperature fluctuations
4. Leakage

## Performance

### Print Settings
| Material | Temperature | Speed |
|----------|------------|-------|
| PLA | 200-220°C | Up to 150mm/s |
| PETG | 230-250°C | Up to 120mm/s |
| ABS | 240-260°C | Up to 100mm/s |
| TPU | 220-235°C | Up to 50mm/s |

### Flow Testing
```python title="Flow Test"
# Standard test parameters
layer_height = 0.2
line_width = 0.4
speed = 100  # mm/s

# Calculate volume
flow_rate = layer_height * line_width * speed
```

## Troubleshooting

### Common Problems
| Issue | Cause | Solution |
|-------|-------|----------|
| Under-extrusion | Heat creep | Check cooling |
| Stringing | Temperature | Adjust retraction |
| Leaking | Assembly | Check torque |
| Jamming | Heat break | Clean/replace |

### Maintenance Tips
1. Use thermal paste
2. Proper torque
3. Regular cleaning
4. Temperature validation

## Upgrades

### Compatible Parts
```text title="Upgrade Options"
Nozzles:
- Hardened steel
- Ruby tipped
- Tungsten carbide
- Brass (standard)

Heat Breaks:
- Bi-metal
- Titanium
- Standard copper
```

### Performance Mods
1. Better cooling
2. Improved insulation
3. Temperature sensors
4. Nozzle materials

## References
1. [Manufacturer Documentation](https://www.phaetus.com/dragon)
2. [Voron Documentation](https://docs.vorondesign.com)
3. [Community Guide](https://3dprintbeginner.com/phaetus-dragon-hotend-review/)

{% include "ads/footer-AD.md" %} 