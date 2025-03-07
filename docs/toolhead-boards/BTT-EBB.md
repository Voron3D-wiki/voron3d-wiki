---
title: BTT-EBB Tool Head boards
description: Information about the BTT-EBB Toolhead board
published: true
tags: [BTT, EBB, BTT-EBB, EBB36, EBB42]
---

(work in progress more information coming soon)

**Configure USB-to-CAN Adapter**
If you have a USB-to-CAN bus adapter, follow these steps to configure it:

**Enter DFU Mode:**
   - Press and hold the **BOOT** button while plugging in the USB-C cable. This will boot the device into DFU (Device Firmware Upgrade) mode.

1. **Access Printer's Linux Interface:**
   - Open a terminal on the printer's Linux interface.

{% include "ads/article-AD.md" %}

3. **Run the Following Commands:**
   
   **Configure firmware USB to CAN bus adapter:**
       
        - bash
  
        - cd ~

        - make clean  # Optional but ensures no leftover files

        - make menuconfig

   Copy the Config in this photo:

!!! note "Apology for Missing Config Photos"
             We apologize for the inconvenience, but the configuration photos are not available at the moment. We recommend you check the official BTT GitHub repository for the latest configuration details: [BTT EBB Configuration](https://github.com/bigtreetech/EBB/blob/master/README.md). Thank you for your understanding and patience.

   <!-- ![config photo](./BTT-UTC-conf.png) -->

         - make  # Build the firmware

         - make flash FLASH_DEVICE=/dev/serial/by-id/[ADD YOUR DEVICE ID HERE]  # Flash to device

   **Configure firmware for the tool head board:**

      - Access your printer's Linux interface and run the following commands

         - cd ~

         - make menuconfig

   Copy the Config in this photo:

        !!! note "Apology for Missing Config Photos"
             We apologize for the inconvenience, but the configuration photos are not available at the moment. We recommend you check the official BTT GitHub repository for the latest configuration details: [BTT EBB Configuration](https://github.com/bigtreetech/EBB/blob/master/README.md). Thank you for your understanding and patience.

        <!-- ![config photo 2](./BTT-EBB-36-42-conf.png) -->

         - make     - Get the klipper.uf2 file that you just generated (klipper/out/klipper.uf2)

         - Download that file to a different computer

         - Turn the printer power off

         - Set the USB power jumper to on

         - While holding the boot button, plug the board into a Windows (untested on Mac) computer, a folder should open, place the klipper.uf2 file you just created in this folder. The folder should close automatically

         - Unplug the USB-C cable

         - Set USB power jumper to off

         - Boot the printer


{% include "ads/footer-AD.md" %}
