---
title: Stepper Motors
description: Guide to stepper motors for Voron printers
published: true
tags: [Stepper motor, stepper ,]
---

# Stepper Motors

## Overview
This section covers stepper motor options for Voron printers.

## What Does NEMA Mean?

NEMA stands for National Electrical Manufacturers Association. In the context of stepper motors, "NEMA" refers to a standardized frame size and mounting pattern. For example, NEMA 14 and NEMA 17 indicate the faceplate size in tenths of an inch (NEMA 14 = 1.4 inches, NEMA 17 = 1.7 inches). The NEMA number does not specify electrical characteristics, only the physical dimensions and mounting hole pattern.

## How to Choose a Stepper Motor

Stepper motor performance depends on torque, current rating, step angle, and physical size. Higher torque motors can move heavier loads but may require more current. The step angle determines the precision of movement. Consider the mounting size (e.g., NEMA 14, NEMA 17, NEMA 23) and ensure compatibility with your printer's electronics and mechanical design. Noise and heat output can also vary by motor and driver choice.

I found this YouTube video to be massively helpful in understanding stepper motors and how to go about choosing the right stepper motor for your Voron printer:

[How to Choose the Fastest Motors for Your 3D Printer by Matt The Printing Nerd](https://www.youtube.com/watch?v=RleJKkO6E64&t)

[eddietheengineer](https://github.com/eddietheengineer/documentation/tree/master/stepper_motor/data)

I took some time to copy the Excel sheet from the YouTube video and convert it into a Google Sheet to make it easier to access for those without Excel. I would still recommend using the Excel version if you have access, as it runs much faster, but this Google Sheet is a great resource for anyone who doesn't have access to Excel.

[Google Sheet](https://docs.google.com/spreadsheets/d/1q8qH3D2qX-Fo8E_yL4lQjdTUrwfc8yJ4L7kgfzeGnso/edit?gid=1539141720#gid=1539141720)

??? info "Spreadsheet Help"
    If you find the Google Sheet confusing or hard to understand, please watch the video linked above for a clear explanation of how to use the spreadsheet to find the right stepper motor for your printer.

## Stepper Motor Database

{% include "../stepper-motor/stepper-motor-database.md" %}

## References
1. [Voron Design](https://vorondesign.com)
2. [Community Support](https://discord.gg/voron)