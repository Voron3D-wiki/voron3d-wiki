---
title: BigTreeTech EBB Gen 1 Toolhead Boards
description: Unified documentation for the BigTreeTech EBB36 and EBB42 CAN bus toolhead boards.
published: true
tags: [electronics, toolhead-boards, btt, ebb36, ebb42, canbus, gen1]
---

# BigTreeTech EBB Gen 1 Toolhead Boards (EBB36 / EBB42)

The **BigTreeTech EBB Gen 1 series** (EBB36 and EBB42) are compact CAN bus toolhead boards commonly used in Voron and other high-performance 3D printers.  
This page consolidates all setup, firmware flashing, wiring, and configuration information for the entire Gen 1 lineup.

---

## 🔍 Overview

| Model | Size | Stepper Driver | MCU | Notes |
|-------|------|----------------|------|--------|
| **EBB36** | 36 × 36 mm | TMC2209 | STM32G0B1 | Compact, ideal for smaller toolheads |
| **EBB42** | 42 × 42 mm | TMC2209 | STM32G0B1 | Larger footprint, slightly more room for wiring |

Both boards share the same firmware process, identical Klipper configuration structure, and nearly all hardware features.

---

## ⚙️ Specifications

- **MCU:** STM32G0B1  
- **Stepper Driver:** TMC2209 (UART)  
- **Input Voltage:** 24V  
- **Interfaces:**  
  - CAN bus  
  - USB-C  
- **I/O Features:**  
  - Thermistor input  
  - Heater output  
  - 2× controllable fan outputs  
  - Endstop input  
  - RGB LED header  
  - ADXL345 SPI support  
- **Buttons/Jumpers:** BOOT, RST, USB-power jumper  

---

## 🧩 Features

- CAN bus communication (2 wires + 24V power)  
- Simplified wiring for toolheads  
- Full Klipper support  
- Easy UF2 firmware flashing  
- Supports UUID querying via `canbus_query.py`  
- Ideal for Voron Stealthburner, Galileo, CW2, ERCF toolheads, and more  

---

# 🛠️ Installation

1. Mount the EBB board to your toolhead  
2. Connect heater, thermistor, fans, LEDs, and extruder motor  
3. Wire **CAN_H**, **CAN_L**, +24V  
4. Flash firmware using instructions below  
5. Add Klipper configuration  
6. Reboot the printer and verify the CAN UUID  

---

# 🛠️ BTT-EBB Tool Head Boards Configuration Guide

## General Installation Steps

Follow these steps to physically install the board and prepare for the firmware flashing. 

[Image of BTT EBB board mounted to toolhead with key components labeled for wiring]


1.  **Mount** the **EBB board** securely to your toolhead.
2.  **Connect** essential components: **heater**, **thermistor**, **fans**, **LEDs**, and the **extruder motor**.
3.  **Wire** the **CAN Bus** connection: **CAN\_H**, **CAN\_L**, and the **+24V** power supply.
4.  **Flash firmware** using the instructions in the section below.
5.  **Add Klipper configuration** using the UUID found in the next step.
6.  **Reboot** the printer and **verify the CAN UUID**.

---

## ⚡ Firmware Flashing Procedures

This guide covers two distinct flashing processes: the USB-to-CAN Adapter and the Tool Head Board (EBB).

### 🔌 USB-to-CAN Adapter Setup

If you are using a **USB-to-CAN adapter** (BTT U2C, FLY UTOC, homemade adapter, etc.), follow these steps.

#### 1. Enter DFU Mode

The Adapter must be put into **DFU (Device Firmware Upgrade) mode** before flashing.

* Hold the **BOOT** button.
* Connect the **USB-C** cable to the host computer.
* Release the **BOOT** button.

#### 2. SSH into your Printer Host

Access the Linux interface (e.g., Raspberry Pi):



```bash title="SSH Command"
ssh pi@<printer-ip>
```



3. Build & Flash Adapter Firmware
Run these commands to configure, build, and flash the adapter firmware from the Klipper source directory.

```bash title="SSH Command"
cd ~/klipper
make clean
make menuconfig
```



??? success "Recommended menuconfig Options"

        Select the following options inside the make menuconfig interface: * Microcontroller: Generic USB-to-CAN bridge * Bootloader: 16 KiB DFU * Communication: CAN bus



```bash title="SSH Command"
# Build the firmware
make
# Flash to the device (Replace [YOUR_DEVICE_ID] with the actual ID)
make flash FLASH_DEVICE=/dev/serial/by-id/[YOUR_DEVICE_ID]
```




💡 Flashing Firmware — EBB36 / EBB42
This procedure builds the Klipper firmware for the Tool Head Board.

1. Configure EBB Firmware
Run these commands in your printer host's terminal:


```bash title="SSH Command"
cd ~/klipper
make clean
make menuconfig
```

??? success "Recommended menuconfig Options" 

      Select the following options inside the make menuconfig interface: * Microcontroller: STM32G0B1 * Bootloader: 8 KiB (or None, depending on board revision) * Communication: CAN bus * CAN speed: 500000 * Default CAN pins: PB8 / PB9


```bash title="SSH Command"
make
```

??? info "Output File Location" 

      The firmware file will be generated here: klipper/out/klipper.uf2


3. Flash UF2 File to the Board
  This requires temporarily connecting the EBB board to a PC via USB-C.

  Power off the printer completely.

  Set the USB-power jumper on the EBB board to ON.

  Hold BOOT button.

  Plug the EBB board into your PC with a USB-C cable.

  A storage device (like a flash drive) will appear on your computer.

  Copy the klipper.uf2 file onto this storage device.

  Wait for the storage device to auto-disconnect (disappear).

  Unplug the USB-C cable.

  Set the USB-power jumper back to OFF.

  Power on the printer.

That revised text is significantly more complete and includes the critical steps for installation, USB-to-CAN setup, EBB flashing, and Klipper configuration.

I will reformat this new, complete text using a Tabbed Interface for the two different flashing procedures (Adapter vs. EBB) and Admonitions for important notes, making it highly structured and easier to follow for an MkDocs Material site. I'll also add an image tag for the wiring and UUID steps for better understanding.

Markdown

# 🛠️ BTT-EBB Tool Head Boards Configuration Guide

## General Installation Steps

Follow these steps to physically install the board and prepare for the firmware flashing. 

[Image of BTT EBB board mounted to toolhead with key components labeled for wiring]


1.  **Mount** the **EBB board** securely to your toolhead.
2.  **Connect** essential components: **heater**, **thermistor**, **fans**, **LEDs**, and the **extruder motor**.
3.  **Wire** the **CAN Bus** connection: **CAN\_H**, **CAN\_L**, and the **+24V** power supply.
4.  **Flash firmware** using the instructions in the section below.
5.  **Add Klipper configuration** using the UUID found in the next step.
6.  **Reboot** the printer and **verify the CAN UUID**.

---

## ⚡ Firmware Flashing Procedures

This guide covers two distinct flashing processes: the USB-to-CAN Adapter and the Tool Head Board (EBB).

<div class="mkdocs-tabs">
    <input type="radio" id="tab-1" name="tab-group" checked>
    <label for="tab-1">USB-to-CAN Adapter Setup</label>
    <div class="mkdocs-content">

### 🔌 USB-to-CAN Adapter Setup

If you are using a **USB-to-CAN adapter** (BTT U2C, FLY UTOC, homemade adapter, etc.), follow these steps.

#### 1. Enter DFU Mode

The Adapter must be put into **DFU (Device Firmware Upgrade) mode** before flashing.

* Hold the **BOOT** button.
* Connect the **USB-C** cable to the host computer.
* Release the **BOOT** button.

#### 2. SSH into your Printer Host

Access the Linux interface (e.g., Raspberry Pi):

```bash title="SSH Command"
ssh pi@<printer-ip>
3. Build & Flash Adapter Firmware
Run these commands to configure, build, and flash the adapter firmware from the Klipper source directory.
```

```bash title="SSH Command"
cd ~/klipper
make clean
make menuconfi
```

??? success "Recommended menuconfig Options" 
    Select the following options inside the make menuconfig interface: * Microcontroller: Generic USB-to-CAN bridge * Bootloader: 16 KiB DFU * Communication: CAN bus

```bash title="SSH Command"
# Build the firmware
make

# Flash to the device (Replace [YOUR_DEVICE_ID] with the actual ID)
make flash FLASH_DEVICE=/dev/serial/by-id/[YOUR_DEVICE_ID]
```


💡 Flashing Firmware — EBB36 / EBB42
This procedure builds the Klipper firmware for the Tool Head Board.

1. Configure EBB Firmware
Run these commands in your printer host's terminal:

```bash title="SSH Command"
cd ~/klipper
make clean
make menuconfig
```

??? success "Recommended menuconfig Options" 
    Select the following options inside the make menuconfig interface: * Microcontroller: STM32G0B1 * Bootloader: 8 KiB (or None, depending on board revision) * Communication: CAN bus * CAN speed: 500000 * Default CAN pins: PB8 / PB9

2. Build Firmware
Bash
```bash title="SSH Command"
make
```

??? info "Output File Location" 

       The firmware file will be generated here: klipper/out/klipper.uf2

1. Flash UF2 File to the Board
This requires temporarily connecting the EBB board to a PC via USB-C.

Power off the printer completely.

Set the USB-power jumper on the EBB board to ON.

Hold BOOT button.

Plug the EBB board into your PC with a USB-C cable.

A storage device (like a flash drive) will appear on your computer.

Copy the klipper.uf2 file onto this storage device.

Wait for the storage device to auto-disconnect (disappear).

Unplug the USB-C cable.

Set the USB-power jumper back to OFF.

Power on the printer.

🔍 Finding the CAN UUID
After successfully flashing the EBB board, you must find its unique CAN UUID for the Klipper configuration.

Run this command in your SSH session:

```bash title="SSH Command"

~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
```

You will see an output similar to this:

Found canbus_uuid=3f4b1c2a7d83
Copy this value into your Klipper configuration file.

⚙️ Klipper Configuration Example
Create or edit your Klipper config file (printer.cfg or an included file) to add the MCU and extruder settings, replacing the placeholder UUID with the one you found.

```bash title="SSH Command"
[mcu ebb]
canbus_uuid: 3f4b1c2a7d83

[tmc2209 extruder]
uart_pin: ebb:PA15
run_current: 0.5
stealthchop_threshold: 999999

[extruder]
step_pin: ebb:PB4
dir_pin: ebb:PB3
enable_pin: !ebb:PA8

heater_pin: ebb:PB1
sensor_pin: ebb:PA0
sensor_type: ATC Semitec 104GT-2

min_extrude_temp: 170
control: pid
```
!!!+ warning "Important" 

       Remember to replace the canbus_uuid with your board's actual UUID and verify all pin names against your specific EBB revision and wiring.

# References

-[BTT EBB GitHub Repository]( https://github.com/bigtreetech/EBB)

- [Voron CANbus Hardware Guide]( https://docs.vorondesign.com/hardware.html)

{% include "affiliate-disclosure.md" %}
{% include "ads/footer-AD.md" %}