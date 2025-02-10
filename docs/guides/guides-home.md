---
title: Guides Home
description: Central hub for all 3D printer guides, including assembly, setup, troubleshooting, and upgrades.
published: true
tags: [guides, assembly, firmware, troubleshooting, upgrades]
---

## **Canbus Setup**

 - Guide Using Katapult(previously known as CanBoot)
 Commands that are helpful:
'''

Install katapult
    cd ~
    git clone https://github.com/Arksine/katapult

Flash your board with Katapult
    cd katapult
    make menuconfig
    make clean
    make
    sudo dfu-util -a 0 -D ~/katapult/out/katapult.bin --dfuse-address 0x08000000:force:mass-erase:leave -d 0483:df11

** turn your printer off

**plug unplug usb, plug/connect canbus HIGH LOW POWER GROUND

** turn your printer back on

Get the canbus_UUID of your board
    python3 ~/katapult/scripts/flash_can.py -i can0 -q

Flash your board with klipper canbus configuration
    cd ~/klipper
    make menuconfig
    python3 ~/katapult/scripts/flash_can.py -i can0 -u CANBUS_UUID -f ~/klipper/out/klipper.bin

Confirm that your canbus UUID is falshed with klipper    
    ~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0

'''
!!! note

    If you are looking for a setup guide for the MKS-THR series of tool headboards, [click here](../toolhead-boards/MKS-THR.md)

---

## **Calibration & Tuning**

### [Calibration & Tuning]()

[Orca Slicer calibration Guide](https://github.com/SoftFever/OrcaSlicer/wiki/Calibration#max-volumetric-speed)
- [helpful site to save you from MATH](https://orcalibrate.com/)


[Ellis' Print Tuning Guide](https://ellis3dp.com/Print-Tuning-Guide/articles/index_tuning.html)
- [Extruder Calibration](https://ellis3dp.com/Print-Tuning-Guide/articles/extruder_calibration.html)
- [Build Surface Preparation & Handling](https://ellis3dp.com/Print-Tuning-Guide/articles/build_surface_prep_handling.html)
- [First Layer Squish](https://ellis3dp.com/Print-Tuning-Guide/articles/first_layer_squish.html)
- [Pressure Advance / Linear Advance](https://ellis3dp.com/Print-Tuning-Guide/articles/index_pressure_advance.html)
- [Extrusion Multiplier](https://ellis3dp.com/Print-Tuning-Guide/articles/extrusion_multiplier.html)
- [PA / EM Oddities](https://ellis3dp.com/Print-Tuning-Guide/articles/pa_em_oddities.html)
- [Cooling and Layer Times](https://ellis3dp.com/Print-Tuning-Guide/articles/cooling_and_layer_times.html)
- [Retraction](https://ellis3dp.com/Print-Tuning-Guide/articles/retraction.html)
- [Infill/Perimeter Overlap](https://ellis3dp.com/Print-Tuning-Guide/articles/infill_perimeter_overlap.html)
- [Stepover](https://ellis3dp.com/Print-Tuning-Guide/articles/stepover.html)

---

## **Maintenance**

 - coming soon

---

!!! warning 
## **Assembly Guides**

 - coming soon

---

    This page is a work in progress. New guides will be added as they become available. Stay tuned for future updates! 

{% include "ads/footer-AD.md" %}

