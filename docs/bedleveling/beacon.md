---
title: Beacon3D Probe
description: Comprehensive guide to the Beacon3D Probe - A high-precision bed leveling sensor for Voron printers
published: true
tags: [Beacon3D, Beacon Probe, Beacon Poke, bed-leveling, sensors]
---

# Beacon3D Probe { #beacon3d-probe }

The Beacon3D Probe is a state-of-the-art bed leveling sensor that combines multiple sensing technologies to provide exceptional accuracy and reliability. It's particularly well-suited for Voron printers and other high-performance 3D printers.

## Features { #features }

- **Dual-Mode Operation**:
  - Non-contact mode for general bed leveling
  - Contact mode for precise Z-offset calibration
- **Auto Z-Offset**:
  - Automatic calibration of nozzle-to-bed distance
  - Real-time adjustment during printing
- **High Precision**:
  - Sub-micron accuracy
  - Temperature compensation
  - Multi-material support
- **Advanced Features**:
  - USB connectivity
  - Onboard processing
  - LED status indicators
  - Configurable sensitivity

## Benefits { #benefits }

- **Improved Print Quality**:
  - Perfect first layer adhesion
  - Consistent layer heights
  - Reduced failed prints
- **Time Savings**:
  - Automatic calibration
  - Quick setup process
  - Reduced manual adjustments
- **Versatility**:
  - Works with various bed materials
  - Compatible with multiple printer types
  - Supports different mounting configurations

## User Experiences { #user-experiences }

!!! quote "From Voron Discord User"
    "The Beacon3D has been rock solid for me. The dual-mode operation is fantastic - I use non-contact for quick leveling and contact mode when I need that extra precision. The auto Z-offset feature is a game-changer."

!!! quote "From Reddit User Review"
    "While the Beacon3D is accurate, I've had issues with the contact mode being too sensitive. Sometimes it triggers false readings, and the auto Z-offset feature can be inconsistent. The price is also quite steep for what you get."

!!! tip "Community Feedback"
    - Users love the dual-mode operation for different use cases
    - Many report significant improvement in first layer consistency
    - The auto Z-offset feature is highly praised
    - Great for both beginners and advanced users
    - Excellent support from the development team

!!! warning "Common User Complaints"
    - Initial setup is time-consuming and complex
    - USB connection issues are common, especially with long cables
    - Price point is significantly higher than traditional probes
    - Contact mode can be overly sensitive to vibrations
    - Auto Z-offset feature sometimes requires manual intervention
    - Firmware updates can be problematic
    - Some users report inconsistent readings in high-temperature environments
    - Documentation lacks troubleshooting guides for common issues
    - Support can be slow to respond to technical questions

## Installation Guide { #installation }

### Hardware Setup

1. **Mounting**:
   - Mount the probe 2-3mm above the nozzle
   - Ensure proper alignment with the bed
   - Secure all connections firmly

2. **Wiring**:
   - Connect USB cable to the probe
   - Route cables away from stepper motors
   - Secure cables to prevent interference

### Software Configuration

1. **Klipper Setup**:
```ini
[probe]
pin: !gpio0
x_offset: 0
y_offset: 0
z_offset: 0
speed: 5.0
samples: 3
samples_result: median
sample_retract_dist: 2.0
samples_tolerance: 0.006
samples_tolerance_retries: 3
```

2. **Calibration**:
   - Run initial calibration
   - Set Z-offset
   - Configure mesh leveling

## Usage Tips { #usage-tips }

!!! tip "Best Practices"
    - Perform calibration at operating temperature
    - Clean the bed surface before leveling
    - Check probe alignment regularly
    - Update firmware when available

!!! warning "Common Issues"
    - Incorrect mounting height
    - Loose connections
    - Interference from other electronics
    - Outdated firmware

## Advanced Configuration { #advanced-config }

### Temperature Compensation

```ini
[beacon]
temperature_compensation: true
compensation_factor: 1.0
```

### Multi-Material Support

```ini
[beacon]
material_detection: true
detection_threshold: 0.1
```

## Troubleshooting { #troubleshooting }

### Common Problems

1. **Inconsistent Readings**:
   - Check mounting height
   - Verify connections
   - Clean probe surface

2. **Calibration Issues**:
   - Ensure proper temperature
   - Check bed surface
   - Verify probe alignment

3. **Communication Errors**:
   - Check USB connection
   - Verify firmware version
   - Restart Klipper

## Related Resources { #related-resources }

- [Official Documentation](https://beacon3d.com/docs)
- [GitHub Repository](https://github.com/beacon3d)
- [Voron Discord](https://discord.gg/voron)
- [Klipper Documentation](https://www.klipper3d.org/Bed_Level.html)

{% include "ads/footer-AD.md" %}

