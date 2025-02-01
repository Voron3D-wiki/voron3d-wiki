---
title: Klipper Config Help
description: Guide for configuring Klipper firmware for 3D printers
published: true
tags: [klipper, firmware, configuration, 3d printing]
---

# Klipper Config Help

This guide provides information on configuring Klipper firmware for your 3D printer. Below is an example configuration for setting up a controller fan.

## Multiple Cooling Fans
[multi_pin my_controller_fan_pins]
pins: PD12, PD13

[controller_fan controller_fan]
pin: multi_pin:my_controller_fan_pins
kick_start_time: 0.5
fan_speed: 0.6
heater: heater_bed