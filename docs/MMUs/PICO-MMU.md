---
title: LH PICO MMU
description: The Pico MMU is a very cost effective and compact multi material system. 
tags: [LH, LH PICO,LH PICO MMU]
---
# LH PICO MMU
![LH PICO MMU photo](./PICO-MMU/PXL_20250116_114328519.jpg)

# What is it
The Pico MMU is a very cost effective and compact multi material system. 

{% include "ads/article-AD.md" %}

# How does it work?
It uses a common power shaft that attaches to the stepper motor, all the filament rests on this. To activate a lane/filament the servo will spin the camshaft to a set angle where an arm with a bearing inside can push the filament into the power shaft. This esentally is now working as a single gear extruder, this is how filament is loaded and unloaded. The pico does not use its stepper motor to help the main extruder, the pico's stepper motor is only used for filament changes and while the printer is doing a print it is doing nothing and the camshaft is in neutral.

## What printers are supported
any printer running klipper, that you can add a toolhead filament sensor too (or has one stock). You also need to have a way to control the pico which requires a stepper motor driver and a way to control the servo motor. Many people use EBB42 boards for this as it fits nicely onto the back of the pico. The only important factors when considering how you are going to control your pico is servo motor current, specifically because if you go off spec with the servo motor you are very likly to burn out the 1amp 5v rail found on the EBB series of boards

## What do I need to get started
 - a stepper motor, a servo motor, some bearings, d-shaft and a 3dprinter
{% include "ads/article-AD.md" %}

# BOM
| **Item** | **Quantity** |
|--------------------------------|-----------|
| EMAX ES3004 Servo (EMAX) |	1 |
| Nema 17 (max 40mm length) |	1 |
| Steel D-Shaft 5mm x 72mm or 90m for 4 lanes |	2 |
| Bearing MR115 |	4 |
| Bearing MR83 |	3 (4)* |
| BMG Drive Gear (with grub screw) |	3 (4)* |
| PTFE Tube 4mm OD, 3mm ID |	1 |
| ECAS 4 Collet |	6 (8)* |
| Belt GT2 ~20cm |	1 (Belt Drive)**|
| Heat Insert M3 5mm (D) x 4mm (L) |	20 (23)* |
| Screw Cap Head M3 10mm |	3 |
| Screw Cap Head M3 22mm |	2 |
| Screw Cap Head M3 30mm |	2 |
| Screw Cap Head M3 8mm |	2 |
| Screw Countersunk M3 10mm |	12 |
| Screw Countersunk M3 16mm |	4 |
| Screw Countersunk M3 8mm |	1 |
| Screw Grub M3 6mm (optional) |	2 |


# Printed parts


The offical print files can be found on github: [Print files](https://github.com/lhndo/LH-Stinger/tree/main/User_Mods/MMU/Stinger%20Pico%20MMU%20-%20%40LH){ .md-button}

{% include "ads/article-AD.md" %}

# Assembly/build



# Testing/tuning

# Customization / modifications

{% include "ads/footer-AD.md" %}

