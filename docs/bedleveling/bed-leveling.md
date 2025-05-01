---
title: Bed Leveling
description: Comprehensive guide to bed leveling methods and sensors for Voron 3D printers
published: true
tags: [bed-leveling, sensors, probes, mesh-leveling, auto-z]
date: 2024-03-11
---

# Bed Leveling { #bed-leveling }

Bed leveling is a crucial process that ensures the print bed surface is perfectly aligned with the printer's nozzle across the entire build area. Proper bed leveling is essential for:

- Consistent first layer adhesion
- Accurate print dimensions
- Prevention of nozzle clogs
- Overall print quality and reliability

## Mesh Leveling { #mesh-leveling }

Mesh leveling (also known as "mesh bed leveling") creates a virtual map of your printer's bed by measuring its surface at multiple points. This allows the printer to dynamically adjust the nozzle height during printing, compensating for any unevenness in the bed surface.

### How Mesh Leveling Works

1. The printer probes multiple points across the bed surface
2. Creates a height map of the bed
3. Adjusts the Z-axis dynamically during printing
4. Compensates for bed warping and unevenness

!!! tip "Best Practices"
    - Perform mesh leveling at operating temperature
    - Clean the bed surface before leveling
    - Use a sufficient number of probe points for your bed size
    - Recalibrate after significant changes to the printer

## Bed Leveling Sensors { #sensors }

### Electric Coil Sensors { #electric-coil }

These sensors use electromagnetic induction to detect the bed surface without physical contact.

| Sensor | Image | Key Features | More Info |
|:-------|:-----:|:------------|:----------|
| [Eddy](eddy.md) | ![Eddy-USB](../bedleveling/assets/eddyUSB-min.png) | - USB connectivity<br>- High precision<br>- Non-contact | [Details](eddy.md) |
| [Eddy Coil](eddy-coil.md) | ![Eddy-IC2](../bedleveling/assets/eddy-IC2-min.png) | - I2C interface<br>- Compact design<br>- Fast response | [Details](eddy-coil.md) |
| [Beacon3D](beacon.md) | ![Beacon3D](../bedleveling/assets/RevH8-min.png) | - Multiple sensing modes<br>- Auto Z-offset<br>- High accuracy | [Details](beacon.md) |
| [Cartographer](cartographer.md) | ![Cartographer](../bedleveling/assets/RevH8-min.png) | - Advanced algorithms<br>- Multi-material support<br>- Fast scanning | [Details](cartographer.md) |

### Physical Contact Sensors { #physical-sensors }

These sensors make physical contact with the bed surface to measure its position.

| Sensor | Image | Key Features | More Info |
|:-------|:-----:|:------------|:----------|
| BLTouch | ![BLTouch](../bedleveling/assets/3dTouch-min.png) | - Reliable mechanical probe<br>- Self-testing<br>- Wide compatibility | [Details](bltouch.md) |
| Beacon3D Poke | ![Beacon Poke](../bedleveling/assets/RevH8-min.png) | - Dual-mode operation<br>- Auto-calibration<br>- High precision | [Details](beacon.md) |
| Inductive Probe | ![Inductive](../bedleveling/assets/3dTouch-min.png) | - Metal bed detection<br>- Fast response<br>- Durable design | [Details](inductive.md) |
| Klicky | ![Klicky](../bedleveling/assets/3dTouch-min.png) | - Open source<br>- Easy to build<br>- Accurate results | [Details](klicky.md) |

## Auto Z-Offset { #auto-z-offset }

Auto Z-offset systems automatically calibrate the distance between the nozzle and the bed surface.

### Available Solutions

| System | Image | Key Features | More Info |
|:-------|:-----:|:------------|:----------|
| Beacon3D Poke | ![Beacon Poke](../bedleveling/assets/RevH8-min.png) | - Automatic calibration<br>- Real-time adjustment<br>- Multi-material support | [Details](beacon.md) |
| Eddy Auto-Z | ![Eddy Auto-Z](../bedleveling/assets/eddyUSB-min.png) | - Non-contact measurement<br>- High precision<br>- Fast response | [Details](eddy.md) |

## Configuration Tips { #configuration-tips }

!!! note "Important Settings"
    - Set appropriate probe points for your bed size
    - Configure proper probe offsets
    - Enable mesh leveling in your slicer
    - Set appropriate Z-offset values

!!! warning "Common Issues"
    - Incorrect probe offsets
    - Dirty bed surface
    - Loose probe mounting
    - Incorrect Z-offset

## Related Resources { #related-resources }

- [Klipper Documentation](https://www.klipper3d.org/Bed_Level.html)
- [Voron Discord](https://discord.gg/voron)
- [GitHub Discussions](https://github.com/VoronDesign/VoronUsers/discussions)

{% include "_templates/ads.html" %}
