---
title: Wiring Guide
description: Comprehensive guide for 3D printer wiring
published: true
tags: [wiring, electronics, cables]
---

# Wiring Guide

## Wire Selection

### Wire Gauge Selection
| Component | Current | AWG | Type |
|-----------|---------|-----|------|
| Bed Heater | 15-20A | 14 | THHN |
| Hotend | 5-6A | 18 | Silicone |
| Motors | 1.5-2A | 20 | Stranded |
| Fans | 0.5A | 24 | Stranded |

### Wire Types
```text title="Common Wire Types"
- THHN: High temp, good insulation
- Silicone: Flexible, heat resistant
- PTFE: Chemical resistant
- PVC: Basic insulation
```

## Crimping Guidelines

### Connector Types
| Connector | Use Case | Tool |
|-----------|----------|------|
| Ferrules | Wire ends | Ferrule crimper |
| JST-XH | Motors | Engineer PA-09 |
| Dupont | Signals | SN-28B |
| XT60 | Power | Heavy duty |

### Crimping Steps
```bash title="Basic Crimping"
1. Strip wire to length
2. Twist strands
3. Insert into connector
4. Crimp with proper tool
5. Test connection
```

## Cable Management

### Cable Chains
1. Proper sizing
2. Strain relief
3. Bend radius
4. Movement clearance

### Wire Bundling
| Method | Use Case | Notes |
|--------|----------|-------|
| Braiding | Long runs | Flexible |
| Spiral wrap | Protection | Easy access |
| Cable ties | Securing | Don't overtighten |
| Mesh sleeve | High wear | Good protection |

## Connection Standards

### Color Coding
```text title="Standard Colors"
Red: Positive voltage
Black: Ground/negative
Yellow: Signal/data
Green: Earth ground
Blue: Control signals
White: Neutral (AC)
```

### Labeling System
1. Heat shrink labels
2. Wire markers
3. Terminal tags
4. Color coding

## Safety Considerations

### Protection Methods
| Method | Purpose | Application |
|--------|---------|-------------|
| Strain relief | Prevent pulling | All connections |
| Ferrules | Secure termination | Screw terminals |
| Heat shrink | Insulation | Exposed joints |
| Wire loom | Protection | Moving parts |

### High Current Wiring
```text title="Safety Rules"
1. Use proper gauge
2. Double-check polarity
3. Add strain relief
4. Use ferrules
5. Test connections
```

## Testing Procedures

### Continuity Testing
1. Power off system
2. Set multimeter
3. Test connections
4. Verify resistance

### Voltage Testing
| Test Point | Expected | Notes |
|------------|----------|-------|
| PSU Output | 24V ±5% | Under load |
| Logic | 3.3V/5V | Stable |
| Heaters | 24V | When on |
| Fans | 24V/12V | Running |

## Common Issues

### Troubleshooting
```bash title="Common Problems"
1. Check continuity
2. Verify voltages
3. Look for damage
4. Test under load
5. Check crimps
```

### Prevention
1. Use proper tools
2. Follow standards
3. Regular inspection
4. Document changes

## References
1. [Safety Standards](../standards.md)
2. [Specifications](../specifications.md)
3. [IPC/WHMA-A-620](https://www.ipc.org)

{% include "ads/footer-AD.md" %} 