---
title: Phaetus Rapido Hotend
description: Guide for the Phaetus Rapido hotend
published: true
tags: [hotend, phaetus, rapido]
---

# Phaetus Rapido Hotend

## Overview
The Phaetus Rapido is a modern, high-performance hotend designed for fast heating and high flow rates, making it ideal for speed printing applications.

## Specifications

### Technical Details
| Parameter | Value | Notes |
|-----------|-------|-------|
| Max Temp | 350°C | HF version |
| Flow Rate | Up to 25mm³/s | HF version |
| Heat Time | 35s to 200°C | Ultra-fast |
| Weight | 23g | Lightweight |

### Variants
```text title="Available Models"
Standard Flow (SF):
- Flow rate: up to 15mm³/s
- Better detail quality
- Standard applications

High Flow (HF):
- Flow rate: up to 25mm³/s
- Optimized for speed
- Production printing
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
1. Mount heat break
2. Install heat block
3. Connect heater/thermistor
4. Install nozzle
5. Mount cooling
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
sensor_type: PT1000
sensor_pin: PF4
min_temp: 0
max_temp: 350
max_power: 1.0
pressure_advance: 0.035
```

### PID Tuning
| Parameter | Typical Value | Notes |
|-----------|--------------|-------|
| Kp | 28.0 | Proportional |
| Ki | 1.8 | Integral |
| Kd | 115.0 | Derivative |

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
| PLA | 200-220°C | Up to 200mm/s |
| PETG | 230-250°C | Up to 150mm/s |
| ABS | 240-260°C | Up to 120mm/s |
| TPU | 220-235°C | Up to 60mm/s |

### Flow Testing
```python title="Flow Test"
# Standard test parameters
layer_height = 0.2
line_width = 0.4
speed = 150  # mm/s

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
- Titanium alloy
- High-flow version
```

### Performance Mods
1. Enhanced cooling
2. Better insulation
3. Temperature sensors
4. Nozzle materials

### Purchase links:
- [Rapido V2 *trianglelabs* ](https://s.click.aliexpress.com/e/_oEt9BS5)
- [Rapido V2 *mellowfly* ](https://s.click.aliexpress.com/e/_ok1vsBx)

## References
1. [Manufacturer Documentation](https://www.phaetus.com/rapido)
2. [Voron Documentation](https://docs.vorondesign.com)
3. [Community Guide](https://3dprintbeginner.com/phaetus-rapido-review/)

{% include "ads/footer-AD.md" %} 