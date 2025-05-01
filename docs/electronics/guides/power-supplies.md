---
title: Power Supplies Guide
description: Guide for selecting and using power supplies in 3D printers
published: true
tags: [power supply, PSU, electronics]
---

# Power Supplies Guide

## Power Supply Selection

### Basic Requirements
| Parameter | Minimum | Recommended |
|-----------|---------|-------------|
| Voltage | 24V DC | 24V DC |
| Power | 350W | 500W |
| Efficiency | 85% | 90%+ |
| Protection | OCP, OVP | Full suite |

### Power Calculations
```python title="Power Requirements"
# Basic power calculation
bed_power = 120  # Watts
hotend_power = 40  # Watts
motors = 4 * 30  # 4 motors at 30W each
fans = 3 * 5    # 3 fans at 5W each

total_power = bed_power + hotend_power + motors + fans
margin = total_power * 1.2  # 20% safety margin
```

## Installation Guidelines

### Mounting Requirements
1. Good ventilation
2. Easy access
3. Protected location
4. Proper orientation

### Wiring Guidelines
| Wire Purpose | Gauge (AWG) | Color |
|--------------|-------------|-------|
| AC Input | 16-14 | Black/White |
| DC Output + | 14-12 | Red |
| DC Output - | 14-12 | Black |
| Ground | 14-12 | Green |

## Safety Features

### Required Protections
```text title="Protection Features"
- Over Current Protection (OCP)
- Over Voltage Protection (OVP)
- Short Circuit Protection (SCP)
- Over Temperature Protection (OTP)
- Under Voltage Protection (UVP)
```

### Monitoring Points
1. Output voltage
2. Current draw
3. Temperature
4. Fan operation

## Maintenance

### Regular Checks
| Component | Frequency | Check For |
|-----------|-----------|-----------|
| Fan | Monthly | Operation/noise |
| Vents | Monthly | Dust/debris |
| Connections | Quarterly | Tightness/heat |
| Voltage | Monthly | Stability |

### Troubleshooting
```bash title="Basic Tests"
1. Check input voltage
2. Verify output voltage
3. Test under load
4. Monitor temperature
```

## Common Issues

### Symptoms and Solutions
| Symptom | Possible Cause | Solution |
|---------|---------------|----------|
| No output | AC input issue | Check connection |
| Low voltage | Overload | Reduce load |
| Fan noise | Dust buildup | Clean fan |
| Overheating | Poor ventilation | Improve airflow |

## Recommended Models

### Tested Power Supplies
1. Meanwell LRS-350-24
2. Meanwell RSP-500-24
3. Meanwell SE-450-24
4. FSPS 500-24

### Features Comparison
```text title="Model Comparison"
Meanwell LRS-350-24:
- 350W output
- 89% efficiency
- Basic protection
- Compact size

Meanwell RSP-500-24:
- 500W output
- 91% efficiency
- Full protection
- Fan control
```

## Installation Steps

### Basic Setup
1. Mount PSU securely
2. Connect AC input
3. Connect DC output
4. Verify connections
5. Test operation

### Advanced Setup
```text title="Advanced Installation"
1. Add strain relief
2. Install ferrules
3. Add thermal monitoring
4. Configure fan control
5. Label all wires
```

## References
1. [Safety Standards](../standards.md)
2. [Wiring Guide](../wiring.md)
3. [Meanwell Documentation](https://www.meanwell.com)

{% include "ads/footer-AD.md" %} 