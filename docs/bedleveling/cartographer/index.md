---
title: Cartographer Probe
description: Comprehensive guide to the Cartographer Probe - A high-precision, frequency-based bed leveling sensor for Voron printers
published: true
tags: [Cartographer, bed-leveling, sensors, frequency-based]
---

# Cartographer Probe { #cartographer-probe }

The Cartographer Probe is a sophisticated bed-leveling sensor that uses frequency-based detection to provide highly accurate and reliable bed leveling. It's particularly well-suited for Voron printers and other high-performance 3D printers.

## Features { #features }

- **Advanced Technology**:
  - Frequency-based detection
  - Temperature independence
  - High precision
  - Multi-material support
- **Smart Features**:
  - Automatic calibration
  - Real-time monitoring
  - LED status indicators
  - Configurable sensitivity
- **Reliability**:
  - Consistent measurements
  - Long service life
  - Minimal maintenance
  - Robust design

## Benefits { #benefits }

- **Superior Accuracy**:
  - Frequency-based detection
  - Temperature stability
  - Consistent measurements
  - Reliable first layers
- **Time Efficiency**:
  - Quick setup process
  - Automatic calibration
  - Reduced manual adjustments
- **Versatility**:
  - Works with various bed materials
  - Compatible with multiple printer types
  - Supports different mounting configurations

## User Experiences { #user-experiences }

!!! quote "From Voron Discord User"
    "The Cartographer's frequency-based detection is incredibly reliable. I've been using it for over a year now, and it's never let me down. The temperature independence is a huge plus for enclosed printers."

!!! quote "From Reddit User Review"
    "The Cartographer is accurate when it works, but the initial tuning is a nightmare. I spent days trying to get it calibrated properly. The sensitivity to electrical noise is also a real issue - I had to reroute all my cables to get stable readings."

!!! tip "Community Feedback"
    - Users appreciate the temperature independence
    - Many report excellent long-term reliability
    - The frequency-based detection is praised for its accuracy
    - Great for users who want a set-and-forget solution
    - Active development and community support

!!! warning "Common User Complaints"
    - Initial tuning is extremely challenging and time-consuming
    - Very sensitive to electrical noise and interference
    - Requires careful cable routing and shielding
    - Mounting and alignment are critical and unforgiving
    - May need recalibration after major printer changes
    - Documentation is technical and assumes prior knowledge
    - Support is primarily community-based
    - Some users report inconsistent behavior with certain bed materials
    - Firmware updates can require complete recalibration
    - Price is high compared to simpler alternatives

## Installation Guide { #installation }

### Hardware Setup

1. **Mounting**:
   - Mount the probe 2-3mm above the nozzle
   - Ensure proper alignment with the bed
   - Secure all connections firmly

2. **Wiring**:
   - Connect signal wire to the probe
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

### Frequency Tuning

```ini
[cartographer]
frequency_tuning: true
tuning_factor: 1.0
```

### Multi-Material Support

```ini
[cartographer]
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
   - Check signal connection
   - Verify firmware version
   - Restart Klipper

## Related Resources { #related-resources }

- [Official Documentation](https://cartographer-probe.com/docs)
- [GitHub Repository](https://github.com/cartographer-probe)
- [Voron Discord](https://discord.gg/voron)
- [Klipper Documentation](https://www.klipper3d.org/Bed_Level.html)

{% include "ads/footer-AD.md" %}