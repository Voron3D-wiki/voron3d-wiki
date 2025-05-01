---
title: Phaetus Dragon Hotend
description: Documentation for the Phaetus Dragon hotend series
published: true
tags: [hotends, phaetus, dragon]
---

# Phaetus Dragon Hotend

## Overview
The Phaetus Dragon is a high-performance hotend designed for reliability and high-flow applications.

## Specifications
- Max Temperature: 300°C (Standard) / 500°C (HF)
- Nozzle Size: 0.4mm standard (0.2-0.8mm available)
- Filament Size: 1.75mm
- Heat Block: Copper alloy
- Heat Break: Titanium alloy

## Installation
1. Mount using standard groove mount
2. Connect thermistor and heater
3. Configure firmware settings
4. Perform PID tuning

## Configuration
```ini
[extruder]
max_temp: 300
min_temp: 0
max_extrude_only_distance: 200
max_extrude_only_velocity: 60
max_extrude_cross_section: 0.8
pressure_advance: 0.05
```

## References
1. [Voron Hardware Guide](https://docs.vorondesign.com/hardware.html)
2. [Phaetus Documentation](https://www.phaetus.com/dragon)

{% include "ads/footer-AD.md" %} 