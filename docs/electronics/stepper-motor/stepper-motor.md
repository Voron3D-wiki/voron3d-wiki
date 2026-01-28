---
title: Stepper Motors
description: Guide to stepper motors for Voron printers
published: true
tags: [Stepper motor, stepper ,]
---

# Stepper Motors

## Overview
This section covers stepper motor options for 3D printers.

## What Does NEMA Mean?

NEMA stands for National Electrical Manufacturers Association. In the context of stepper motors, "NEMA" refers to a standardized frame size and mounting pattern. For example, NEMA 14 and NEMA 17 indicate the faceplate size in tenths of an inch (NEMA 14 = 1.4 inches, NEMA 17 = 1.7 inches). The NEMA number does not specify electrical characteristics, only the physical dimensions and mounting hole pattern.

## How to Choose a Stepper Motor

Stepper motor performance depends on torque, current rating, step angle, and physical size. Higher torque motors can move heavier loads but may require more current. The step angle determines the precision of movement. Consider the mounting size (e.g., NEMA 14, NEMA 17, NEMA 23) and ensure compatibility with your printer's electronics and mechanical design. Noise and heat output can also vary by motor and driver choice.

I found this YouTube video to be massively helpful in understanding stepper motors and how to go about choosing the right stepper motor for your Voron printer:

[How to Choose the Fastest Motors for Your 3D Printer by Matt The Printing Nerd](https://www.youtube.com/watch?v=RleJKkO6E64&t)

[eddietheengineer](https://github.com/eddietheengineer/documentation/tree/master/stepper_motor/data)

I recently got a message from DevMiner the creator of the stepper motor simulator below, it is a very nice tool that performs all the calculations of the excel document and has a very detailed stepper motor database.

<a href="https://stepper-sim.devminer.xyz/" target="_blank" rel="noopener" class="md-button">
  Stepper Simulator Website
</a>

??? info "Configuration Help"
    If you find the Google Sheet confusing or hard to understand, please watch the video linked above for a clear explanation of how to use the spreadsheet to find the right stepper motor for your printer.

## Stepper Motor Database

{% include "../stepper-motor/stepper-motor-database.md" %}


### Nema 17 Stepper Motor Purchase links

| Model Name and Brand | Buy |
|---|---|
| LDO Stepper Motor (42STH40-1684AC) | [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-stepper-motor-42sth40-1684ac/?wpam_id=9) \| [ West3d](https://west3d.com/products/ldo-motors-ldo-42sth40-1684ac-nema17-motor/?_pos=1&_sid=308201ddc&_ss=r%2F&dt_id=2902688%3Bap%3A1878203) |
|Kraken LDO-42STH60-3004AHR(S37)| [onetwo3d](https://www.onetwo3d.co.uk/product/kraken-ldo-42sth60-3004ahs37/?wpam_id=9) [ West3d](https://west3d.com/products/kraken-motors-from-devil-design-ldo-42sth60-3004ah-s37-and-s55-extreme-stepper-motor/?_pos=1&_sid=6495a3f48&_ss=r%2F&dt_id=2902688%3Bap%3A1878203) |
|LDO Stepper Motor (42STH20-1004ASH)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-stepper-motor-42sth20-1004as/?wpam_id=9) [ West3d](https://west3d.com/products/nema-17-42mm-motor-high-temp-ldo-42sth20-1004ash-vrn-voron-edition/?_pos=1&_sid=69b5409d1&_ss=r%2F&dt_id=2902688%3Bap%3A1878203) |
|LDO Stepper Motor (42STH40-2004MAH)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-stepper-motor-42sth40-2004mah/?wpam_id=9) [ West3d](https://west3d.com/products/ldo-motors-42sth48-2004mah-nema-17-stepper-motor-high-temperature/?_pos=1&_sid=b4eceeaf9&_ss=r&dt_id=2902688%3Bap%3A1878203) |
|LDO Stepper Motor (42STH48-2004AC)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-stepper-motor-42sth48-2004ac/?wpam_id=9) |
|LDO Stepper Motor (42STH48-2504AC)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-stepper-motor-42sth48-2504ac/?wpam_id=9)  [ West3d](https://west3d.com/products/ldo-motors-42sth48-2504ah-nema-17-stepper-motor/?_pos=2&_sid=c8ee0bcbb&_ss=r&dt_id=2902688%3Bap%3A1878203)|
|LDO Stepper Motor (42STH48-2504AH(S37))| [West3d](https://west3d.com/products/ldo-motors-42sth48-2504ahs37-nema-17-stepper-motor-high-performance-high-temperature-37mm-output-shaft/?_pos=1&_sid=c8ee0bcbb&_ss=r&dt_id=2902688%3Bap%3A1878203) |
|LDO Stepper Motor (42STH48-2504AHS46)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-stepper-motor-42sth48-2504ahs46/?wpam_id=9)  |
|LDO Stepper Motor (42STH48-2504AH(S45R))| [ West3d](https://west3d.com/products/ldo-motors-42sth48-2504ahs45r-nema-17-stepper-motor-high-performance-high-temperature-37mm-output-shaft-copy/?_pos=5&_sid=dbac4cb18&_ss=r&dt_id=2902688%3Bap%3A1878203) |
|LDO Stepper Motor (42STH48-2504AHS55)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-stepper-motor-42sth48-2504ahs55/?wpam_id=9)  [ West3d](https://west3d.com/products/ldo-motors-42sth48-2504ah-s55-super-power-high-temp-nema-17-stepper-motor-high-performance-high-temperature-55mm-shaft/?_pos=8&_sid=dbac4cb18&_ss=r&dt_id=2902688%3Bap%3A1878203)|
|LDO Stepper Motor (42STH48-2804AC Super Power)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-42sth48-2804ac-super-power-stepper-motor/?wpam_id=9)  [ West3d](https://west3d.com/products/ldo-motors-42sth48-2804ah-super-speedy-super-power-high-temp-nema-17-stepper-motor-high-performance-high-temperature/?variant=44350724145364&dt_id=2902688%3Bap%3A1878203)|
|LDO Stepper Motor (42STH48-2804AC-R Round Shaft)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-42sth48-2804ac-r-super-power-stepper-motor-round-shaft/?wpam_id=9)  |
|LDO Stepper Motor (35STH52-2004AHS35)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-35sth52-2004ahs35-stepper-motor/?wpam_id=9)  |
|LDO Stepper Motor (42STH48-2804AH High Temp)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-42sth48-2804ah-super-power-stepper-motor-high-temperature/?wpam_id=9)  [ West3d](https://west3d.com/products/ldo-motors-42sth48-2804ah-super-speedy-super-power-high-temp-nema-17-stepper-motor-high-performance-high-temperature/?variant=44350724145364&dt_id=2902688%3Bap%3A1878203)|
|LDO Stepper Motor (42STH48-2804AH-S55 High Temp)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-42sth48-2804ah-s55-super-power-stepper-motor-high-temperature/?wpam_id=9)  [ West3d](https://west3d.com/products/ldo-motors-42sth48-2804ah-super-speedy-super-power-high-temp-nema-17-stepper-motor-high-performance-high-temperature/?variant=44350724145364&dt_id=2902688%3Bap%3A1878203)|
|LDO Stepper Motor (42STH48-2804AH-S80)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-42sth48-2804ah-s80-super-power-stepper-motor/?wpam_id=9) |
|LDO Stepper Motor (42STH25-1004CL200ET)| [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-stepper-motor-42sth25-1004cl200et/?wpam_id=9)  |

### Kits

| Product Name | Vendor |
|---|---|
| Box Turtle AFC Mini DC Motor Kit (LDO) | [onetwo3d](https://www.onetwo3d.co.uk/product/box-turtle-afc-mini-dc-motor-kit-ldo/?wpam_id=9) |
| Box Turtle AFC Stepper Kit (LDO) | [onetwo3d](https://www.onetwo3d.co.uk/product/box-turtle-afc-stepper-kit-ldo/?wpam_id=9) |
| Voron 2.4 Motor Kit by LDO Motors (Clockwork 2 updated) - V2.4 | [West3d](https://west3d.com/products/voron-2-4-motor-kit-by-ldo-motors/?_pos=8&_sid=71a5ca88d&_ss=r&dt_id=2902688%3Bap%3A1878203) |
| Voron V0.1 / V0.2 Motor Kit by LDO Motors | [West3d](https://west3d.com/products/voron-v0-1-motor-kit-by-ldo-motors/?_pos=9&_sid=71a5ca88d&_ss=r&dt_id=2902688%3Bap%3A1878203) |
| Positron Motor Kit by LDO Motors | [West3d](https://west3d.com/products/positron-motor-kit-by-ldo-motors/?_pos=23&_sid=71a5ca88d&_ss=r&dt_id=2902688%3Bap%3A1878203) |
| MicronPlus 3D Printer Motor Kit by LDO Motors | [West3d](https://west3d.com/products/micron-3d-printer-motor-kit-by-ldo-motors/?_pos=22&_sid=71a5ca88d&_ss=r&dt_id=2902688%3Bap%3A1878203) |


### Pancake Motors

| Model Name and Brand | Buy |
|---|---|
| LDO Pancake Motor (36STH20-1004AHG8T) | [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-36sth20-1004ahg8t-stepper/?wpam_id=9) |
| LDO Pancake Motor (36STH20-1004AHG) | [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-stepper-motor-36sth20-1004ahg/?wpam_id=9) |


### NEMA 14

| Model Name and Brand | Buy |
|---|---|
| LDO Stepper Motor (35STH52-1504AH) | [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-35sth52-1504ah-stepper-motor/?wpam_id=9) [ West3d](https://west3d.com/products/ldo-motors-ldo-35sth52-1504ahvrn-nema14-motor?_pos=7&_sid=c9fb57772&_ss=r&dt_id=2902688%3Bap%3A1878203) |
| LDO Stepper Motor (35STH52-2004AHS35) | [onetwo3d](https://www.onetwo3d.co.uk/product/ldo-35sth52-2004ahs35-stepper-motor/?wpam_id=9) [ West3d](https://west3d.com/products/ldo-motors-ldo-35sth52-2004s35-nema14-motor?_pos=4&_sid=c9fb57772&_ss=r&dt_id=2902688%3Bap%3A1878203) |


## References
1. [Voron Design](https://vorondesign.com)
2. [Community Support](https://discord.gg/voron)