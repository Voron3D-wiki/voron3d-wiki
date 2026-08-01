---
title: Klipper Macros
description: Common Klipper macros for Voron printers, including PRINT_START and PRINT_END
published: true
tags: [klipper, macros, print_start, print_end, gcode]
---

# Klipper Macros

Macros are named blocks of G-code you define in your Klipper config and call by
name. They are what turn a slicer's generic start G-code into something that
actually knows about your printer — homing, quad gantry levelling, bed mesh,
nozzle purge, and chamber soak all belong in a macro rather than in the slicer.

The two you cannot do without are `PRINT_START` and `PRINT_END`. Your slicer
calls them, and everything the printer does before and after a print lives
inside them.

{% include "ads/soon.md" %}

## Related

- [Klipper](../klipper/index.md) — installation and frontends
- [Klipper Config Help](../klipper-config-help/index.md) — working through `printer.cfg`
- [Bed Leveling](../../bedleveling/index.md) — what `PRINT_START` needs to call

## External resources

- [Klipper G-Code Macros](https://www.klipper3d.org/Command_Templates.html)
- [Ellis' Print Tuning Guide](https://ellis3dp.com/Print-Tuning-Guide/)
- [Voron Discord](https://discord.gg/voron)

{% include "ads/footer-AD.md" %}
