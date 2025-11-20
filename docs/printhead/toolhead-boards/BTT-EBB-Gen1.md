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

# 🔌 USB-to-CAN Adapter Setup

If you are using a **USB-to-CAN adapter** (BTT U2C, FLY UTOC, homemade adapter, etc):

## 1. Enter DFU Mode

Hold **BOOT** → connect USB-C → release BOOT.

## 2. SSH into your printer

```bash
ssh pi@<printer-ip>
```


## 3. Build & Flash Firmware

```bash
cd ~/klipper
make clean
make menuconfig
```

### Recommended menuconfig options

- Microcontroller: Generic USB-to-CAN bridge
- Bootloader: 16 KiB DFU
- Communication: CAN bus

Build:

```bash
make
```

Flash:

```bash
make flash FLASH_DEVICE=/dev/serial/by-id/[YOUR_DEVICE_ID]
```

Replace [YOUR_DEVICE_ID] with your actual serial device ID.

{% include "ads/article-AD.md" %}

---

# Flashing Firmware — EBB36 / EBB42

## 1. Configure Firmware

```bash
cd ~/klipper
make clean
make menuconfig
```

### Recommended settings for the board

- Microcontroller: STM32G0B1
- Bootloader: 8 KiB (or None depending on revision)
- Communication: CAN bus
- CAN speed: 500000
- Default CAN pins: PB8 / PB9

## 2. Build Firmware

```bash
make
```

Output file:

klipper/out/klipper.uf2

## 3. Flash UF2 File to the Board

1. Power off the printer
2. Set USB-power jumper to ON
3. Hold BOOT
4. Plug into your PC with USB-C
5. A storage device will appear
6. Copy klipper.uf2 onto it
7. Wait for auto-disconnect
8. Unplug USB
9. Set USB-power jumper back to OFF
10. Power on the printer

---

# Finding CAN UUID

Run:

```bash
~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
```

You will see an output similar to:

Found canbus_uuid=3f4b1c2a7d83

Copy this value into your Klipper config.

---

# Klipper Configuration Example

```ini
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

Replace the UUID with yours.

---

# References

-[BTT EBB GitHub Repository]( https://github.com/bigtreetech/EBB)

- [Voron CANbus Hardware Guide]( https://docs.vorondesign.com/hardware.html)

{% include "ads/footer-AD.md" %}
