---
title: BTT-EBB Tool Head boards
description: Information about the BTT-EBB Toolhead board
published: true
tags: [BTT, EBB, BTT-EBB, EBB36, EBB42]
---

# BTT-EBB Tool Head Boards Configuration Guide

(work in progress more information coming soon)

## Configure USB-to-CAN Adapter
If you have a USB-to-CAN bus adapter, follow these steps to configure it:

### 1. Enter DFU Mode
Press and hold the **BOOT** button while plugging in the USB-C cable. This will boot the device into DFU (Device Firmware Upgrade) mode.

### 2. Access Printer's Linux Interface
Open a terminal on the printer's Linux interface.

{% include "ads/article-AD.md" %}

### 3. Configure USB-to-CAN Adapter Firmware

Run the following commands in sequence:

```bash title="Build and Flash Firmware" linenums="1"
<!-- voron-pi-linux:~$ --> make

# Flash to device (replace [ADD YOUR DEVICE ID HERE] with your actual device ID)
<!-- voron-pi-linux:~$ --> make flash FLASH_DEVICE=/dev/serial/by-id/[ADD YOUR DEVICE ID HERE]
```

Copy the Config in this photo:

!!! note "Apology for Missing Config Photos"
    We apologize for the inconvenience, but the configuration photos are not available at the moment. We recommend you check the official BTT GitHub repository for the latest configuration details: [BTT EBB Configuration](https://github.com/bigtreetech/EBB/blob/master/README.md).

After setting the configuration:

```bash title="Configure USB-to-CAN Adapter" linenums="1"
# Change to home directory
<!-- voron-pi-linux:~$ --> cd ~

# Clean build directory (optional but recommended)
<!-- voron-pi-linux:~$ --> make clean

# Configure the firmware
<!-- voron-pi-linux:~$ --> make menuconfig
```

### 4. Configure Tool Head Board Firmware

Access your printer's Linux interface and run:

```bash title="Configure Tool Head Board" linenums="1"
# Change to home directory
<!-- voron-pi-linux:~$ --> cd ~

# Configure the firmware
<!-- voron-pi-linux:~$ --> make menuconfig
```

Copy the Config in this photo:

!!! note "Apology for Missing Config Photos"
    We apologize for the inconvenience, but the configuration photos are not available at the moment. We recommend you check the official BTT GitHub repository for the latest configuration details: [BTT EBB Configuration](https://github.com/bigtreetech/EBB/blob/master/README.md).

After setting the configuration:

```bash title="Build Tool Head Firmware" linenums="1"
# Build the firmware
<!-- voron-pi-linux:~$ --> make

# The klipper.uf2 file will be generated at klipper/out/klipper.uf2
```

### 5. Flash the Tool Head Board

1. Download the generated `klipper.uf2` file to a different computer
2. Turn the printer power off
3. Set the USB power jumper to ON
4. While holding the boot button, plug the board into a Windows computer (untested on Mac)
5. When the folder opens automatically, copy the `klipper.uf2` file into it
6. Wait for the folder to close automatically
7. Unplug the USB-C cable
8. Set USB power jumper to OFF
9. Boot the printer

{% include "ads/footer-AD.md" %}
