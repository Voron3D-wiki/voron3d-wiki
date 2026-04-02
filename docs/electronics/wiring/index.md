---
title: Wiring
description: Guide to wiring Voron printers safely and correctly
published: true
tags: [electronics, wiring, components]
---

## Overview

This section covers wiring practices for Voron printers. Good wiring is critical for safety and reliability — poor connections are one of the most common causes of thermal runaway, intermittent faults, and fires.

## Wire gauge

Wire gauge determines how much current a wire can safely carry. Using wire that is too thin for its load will cause the wire to heat up, which can damage insulation and cause fires.

Common gauges used in Voron builds:

| AWG | Metric (approx.) | Typical use |
| --- | ---------------- | ----------- |
| 24 AWG | 0.25mm² | Signal wires, thermistors, fans, endstops |
| 22 AWG | 0.34mm² | Fans, heater cartridges (low wattage), stepper motors |
| 20 AWG | 0.5mm² | Stepper motors, heater cartridges |
| 18 AWG | 0.75mm² | Hotend heaters, 24V distribution |
| 16 AWG | 1.5mm² | Heated bed, high-current 24V runs |
| 14 AWG | 2.5mm² | Mains AC wiring (where permitted by local code) |

When in doubt, go heavier. The cost difference between wire gauges is negligible compared to the risk of underrating.

## Wire types

### Silicone wire

Silicone insulation is flexible, heat-resistant, and recommended for any wire routed near heat sources (hotend, bed, chamber) or that undergoes repeated flexing through a drag chain or umbilical. It maintains flexibility at low temperatures as well, which matters in enclosed printers.

### PTFE wire

Similar heat resistance to silicone, slightly less flexible. Commonly found on thermistors and factory-crimped assemblies.

### PVC wire

Cheaper and stiffer than silicone. Acceptable for static runs (e.g. inside the electronics bay) but should not be used near heat sources or in drag chains — PVC insulation can crack under repeated flexing.

## Connectors

See the [Connectors](../connectors.md) page for connector types, ratings, and recommendations.

## Drag chains and umbilicals

Wires routed through a drag chain or umbilical must be flexible enough to survive millions of flex cycles without cracking. Use silicone-insulated wire for all moving runs. Avoid running wires too tightly — leave enough slack that the wire is not under tension at the extremes of travel.

Recommended practices:

- Use a strain relief at both ends of any moving cable run
- Avoid sharp bends at entry/exit points of the drag chain
- Do not mix signal and high-current wires in the same bundle if avoidable (can cause noise on thermistors and endstops)
- Twist stepper motor wire pairs to reduce electrical noise

## Mains AC wiring

Mains wiring carries lethal voltage. If you are not confident working with mains AC, have a qualified electrician complete this portion of the build.

- Always fuse the mains input — a fused IEC inlet is standard on most Voron builds
- Use wire rated for mains voltage and appropriate current (typically 14–16 AWG for the primary)
- Terminate mains wires with ferrules, not bare wire, at screw terminals
- Ensure the PSU chassis is properly earthed (ground)
- Double-check that no mains-voltage wiring is accessible or able to contact low-voltage wiring or the printer frame

## Ferrules and terminations

Ferrules (also called wire end sleeves) should be used on all stranded wire terminated into screw or push-in terminals. Without a ferrule, individual strands can spread and cause short circuits or lose contact over time. Use a proper ratcheting crimping tool — ferrules crimped with pliers are not reliable.

| Wire gauge | Ferrule size |
| ---------- | ------------ |
| 24 AWG | 0.25mm² |
| 22 AWG | 0.34mm² |
| 20 AWG | 0.5mm² |
| 18 AWG | 0.75mm² |
| 16 AWG | 1.5mm² |
| 14 AWG | 2.5mm² |

## Notes

- Label both ends of every wire during the build — debugging a wiring fault 6 months later is much easier with labeled wires.
- Avoid joining wires mid-run where possible. If a splice is necessary, solder and heat-shrink it; do not use butt connectors or twist-and-tape.
- Heater cartridge and heated bed wires should be checked for continuity and resistance before first power-on.

{% include "affiliate-disclosure.md" %}
