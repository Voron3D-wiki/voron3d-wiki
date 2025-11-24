---
title: Multi-Material Units (MMUs)
description: Comprehensive guide to Multi-Material Units for 3D printers
published: true
tags: [mmu, multi-material, boxturtle, ercf, enraged rabbit]
---

# Multi-Material Units (MMUs)
Multi-Material Upgrade (MMU) systems allow 3D printers to print with multiple filaments in a single print. These systems enable multi-color, multi-material printing and provide flexibility for complex models. Below is a list of popular MMU systems with links, images, and brief descriptions.

## Toolchanger / Multiple toolhead

### [Tap Changer](https://github.com/viesturz/tapchanger)
- **Key Features**:
    - Z probing with standard voron tap
    - low cost toolchanging system
    - [fysetc kit](https://s.click.aliexpress.com/e/_c3qAcfTH)

### [Stealth Changer](https://github.com/DraftShift/StealthChanger)
- **Key Features**:
    - Unlike the name suggests it supports more then just stealthburners
    - [Fysetc CNC x carrage for StealthChanger](https://s.click.aliexpress.com/e/_c4ClOx7H)

### [MadMax](https://github.com/zruncho3d/madmax/tree/main)

## Commercial Toolchanger Options

### e3d

### Prusa XL

### Prusa Core One (+ / L) INDEX

### Snap Maker u1


## Filament Feeders / filament Multiplexers

### [ERCF (Enraged Rabbit Carrot Feeder)](ERCF.md)
- **Description**: A community-driven MMU system designed for high reliability and extensive customization.
- **Key Features**:
    - Supports up to 12 colors/materials
    - Highly customizable with modular components
    - Extensive community support and documentation
    - Advanced filament path control for reduced tangling

### [PICO-MMU](PICO-MMU.md)
- **Description**: A very interesting project by [Ihndo](https://github.com/lhndo), the creator of the [LH-Stinger](https://github.com/lhndo/LH-Stinger).
- **Key Features**:
    - Compact design for all printers
    - Supports up to 4 colors/materials
    - Open-source and customizable
    - Lightweight and easy to assemble
    - no kits avaliable

### [BoxTurtle](BoxTurtle.md)
- **Description**: An open-source multi-material system that supports 4 spools (unsure if they can be daisy-chained). Includes an auto-rewinding system, and a kit can be purchased through LDO Motors.
- **Key Features**:
    - Supports up to 4 colors/materials (per boxturtle)
    - Auto-rewinding system for unused filaments
    - Open-source with detailed documentation
    - Designed for compatibility with Klipper firmware
    - heated enclsure optional
    - [TriangelLabs kit](https://s.click.aliexpress.com/e/_c4SETbL9)
    - [Formbot kit](https://s.click.aliexpress.com/e/_c2vSlE0F)
    - [Seleadlab kit](https://s.click.aliexpress.com/e/_c311Qr7d)


### Happy Turtle Lettuce Feeder
- **Description**: "HTLF is a lane-based filament changer for Klipper designed by ArmoredTurtle. It uses a camshaft to engage the selected lane, effectively making the requested lane a direct drive extruder (no slip to contend with). The “stock build” is for a four color system, though CAD is provided should you choose to expand it further." From Robert_Klotz
- **Key Features**:
    - Supports up to 4 colors/materials (per boxturtle)
    - Open-source
    - Works with AFC klipper Add On
    - Lower cost than BoxTrutle
- [TriagnelLabs kit](https://s.click.aliexpress.com/e/_onfSHaw)
- [Seleadlab  kit](https://s.click.aliexpress.com/e/_oCy7tdC)

### [TradRack](tradrack.md)
- **Description**: A similar system to the ERCF, the TradRack is designed by Annex Engineering.
- **Key Features**:
    - Modular design for easy expansion
    - Supports up to 14 colors/materials
    - Compatible with various slicers
    - Designed for high-speed filament swapping

## Commercial Options

### BTT ViViD
- **Description**: A BigTreeTech MMU system that offers integration with their control boards and firmware. At this time, there is not much known.
- **Key Features**: 
    - Seems like a AMS style system with space for 4 spoos

### Anycubic MMU
- **Description**: Anycubic's solution for multi-material printing, originally released with the Kobra 3 3D printer. It will soon be supported by the upcoming Anycubic S1 as well.
- **Key Features**:
    - Supports up to 4 colors/materials

### Prusa MMU
- **Description**: An innovative add-on for Prusa 3D printers, supporting up to five filaments for multi-color and multi-material prints.
- **Key Features**:
    - Automatic filament loading/unloading
    - Integrated with PrusaSlicer for seamless operation

### BambuLabs AMS

### BambuLabs AMS Lite

### BambuLabs AMS 2

## Other Relevant Modifications

### [Blobifier](https://github.com/Dendrowen/Blobifier)
- A unique approach to multi-material printing

### [Filametrix](https://github.com/sorted01/Filametrix)
- A stealth burner toolhead modified to include a filament cutter

## Selection Guide

### Factors to Consider
1. **Number of Materials**
      - 3-4 materials: Anycubic MMU, PICO-MMU, Box Turtle, BTT MMU
      - 5-8 materials: Prusa MMU
      - 9+ materials: ERCF, TradRack

2. **Installation Complexity**
      - Easy: Commercial solutions
      - Moderate: PICO-MMU, TradRack
      - Advanced: ERCF, Box Turtle

3. **Cost Considerations**
      - Budget: TradRack, Anycubic MMU
      - Mid-range: PICO-MMU, BTT MMU
      - High-end: ERCF, Box Turtle

4. **Maintenance Requirements**
      - Low: Commercial solutions
      - Medium: PICO-MMU
      - High: ERCF, Box Turtle

## Technical Considerations

### Software Requirements
- Klipper integration
- Slicer settings
- Material profiles
- Transition settings

### Hardware Requirements
- Extruder compatibility
- Hotend requirements
- Electronics integration
- Space requirements

## Related Resources
- [Voron Design GitHub](https://github.com/VoronDesign)
- [Voron Discord](https://discord.gg/voron)
- [Voron Subreddit](https://www.reddit.com/r/voroncorexy)

## References
1. Voron Design Documentation
2. Community Modifications Database
3. User Experience Reports

{% include "affiliate-disclosure.md" %}
{% include "ads/footer-AD.md" %}