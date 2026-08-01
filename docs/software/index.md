---
title: Software
description: Firmware and software used to run a Voron 3D printer
published: true
tags: [software, klipper, firmware, macros]
---

# Software

Every official Voron runs [Klipper](klipper/index.md). Klipper splits the work
between a host computer (usually a Raspberry Pi or a small x86 board) that does
the motion planning, and the printer's mainboard, which just executes timed
steps. That split is what allows the input shaping and pressure advance a Voron
depends on.

## Pages

| Page | What it covers |
|:-----|:---------------|
| [Klipper](klipper/index.md) | What Klipper is, how it is installed, and the web frontends that sit on top of it |
| [Klipper Config Help](klipper-config-help/index.md) | Working through `printer.cfg`, common errors, and where settings live |
| [Klipper Macros](klipper-macros/index.md) | `PRINT_START`, `PRINT_END`, and other macros worth having |

## Related

- [Motherboards](../electronics/mcu/index.md) — picking the board Klipper runs on
- [Toolhead Boards](../printhead/toolhead-boards/index.md) — CAN and USB toolhead MCUs
- [Bed Leveling](../bedleveling/index.md) — probe setup and mesh configuration

## External resources

- [Klipper documentation](https://www.klipper3d.org/)
- [Klipper Config Reference](https://www.klipper3d.org/Config_Reference.html)
- [Ellis' Print Tuning Guide](https://ellis3dp.com/Print-Tuning-Guide/)
- [Official Voron documentation](https://docs.vorondesign.com/)
