---
title: BigTreeTech EBB Gen 2 Toolhead Boards
description: Documentation for the BTT EBB Gen 2 toolhead boards.
published: true
tags: [electronics, toolhead-boards, btt, gen2]
---

# BigTreeTech EBB Gen 2 Toolhead Boards

The **BigTreeTech EBB Gen 2 series** (EBB36 and EBB42) are compact CAN bus toolhead boards commonly used in Voron and other high-performance 3D printers.  
This page consolidates all setup, firmware flashing, wiring, and configuration. 


## Overview

<div class="cards" markdown>

=== "EBB36 GEN2 V1.0"
    ![EBB36 pinout picture](./EBB36_GEN2_pin_en-min.jpg){ align=left }
=== "EBB42 GEN2 V1.0"
    ![EBB42 pinout picture](./EBB42_GEN2_pin_en-min.jpg){ align=left }
=== "USB Adapter V1.0"
    ![USB pinout picture](./Adapter_en-min.jpg){ align=left }

</div>

## Gallery

<div class="grid cards" markdown>

- ![IMG1](IMG_2855.JPG)
- ![IMG1](IMG_2857.JPG)
- ![IMG1](IMG_2860.JPG)
- ![IMG1](IMG_2861.JPG)
- ![IMG1](IMG_2867.JPG)
- ![IMG1](IMG_2871.JPG)
- ![IMG1](IMG_2875.JPG)
- ![IMG1](IMG_2885.JPG)
- ![IMG1](IMG_2886.JPG)
- ![IMG1](IMG_2887.JPG)
- ![IMG1](IMG_2888.JPG)
- ![IMG1](IMG_2890.JPG)

</div>

## Features

- Extensive protection on nearly every input and output to reduce the risk of accidental wiring damage.
- Simple communication selection via a single jumper, with the passthrough port automatically adapting to USB or CAN mode.
- Enhanced USB stability through onboard signal conditioning hardware.
- Rated for high-temperature environments, with verified operation in chambers up to 75 °C  
  (active cooling recommended above 60 °C).
- 3-pin tacho fan support for detecting hotend fan failure.
- Selectable 5 V or 24 V output for all fan ports using onboard jumpers.
- Built-in I²C header for environmental sensors, eddy probes, and auxiliary devices.
- Dedicated thermistor input for monitoring motor driver temperature.
- Three PWM-controlled fan outputs, each protected against short-circuit and thermal overload.
- Reset and boot buttons placed for easy toolhead access.
- Powered by an ARM Cortex-M0+ STM32G0B1CBT6 running at 64 MHz.
- Ground-referenced mounting holes designed to dissipate static buildup and reduce ESD impact.


## Specifications

- **Product Name:** BIGTREETECH EBB36 / EBB42 GEN2 V1.0  
- **MCU:** ARM Cortex-M0+ STM32G0B1CBT6 @ 64 MHz  
- **Input Voltage:** 24–28 V DC  
- **Logic Voltage:** 3.3 V  
- **Heater Output:** Up to 120 W (24 V / 5 A)  
- **Thermistor Support:** PT1000 or standard NTC  
- **Fan Outputs:**  
  - 2 × 2-pin PWM fans (FAN0, FAN1)  
  - 1 × 3-pin PWM+tacho fan (FAN2)  
- **Fan Current Rating:** 1 A total continuous, 1.5 A peak  
- **Fan Protection:** Over-current and over-temperature protection on all ports  
- **5 V Rail Output:** Up to 1.5 A peak  
- **Expansion Ports:**  
  - Multiplexed probe interface (MicroProbe, BLTouch, 24 V inductive probes)  
  - RGB output  
  - Thermistor (TH)  
  - Motor driver (TMC2209 onboard)  
  - USB / CAN-FD communication ports  
  - Additional I/O breakouts depending on configuration  


# Installation

???+ note
    This Section is a work in progress, our team is currently testing the ebb gen 2 series of boards and will make sure to up date the installation and setup process as soon as it is ready.

# Klipper Configuration Example

=== "EBB36 GEN2 V1.0"
            
        # This file contains common pin mappings for the BIGTREETECH EBB36
        # GEN2 board. To use this config, the firmware should be compiled for the
        # STM32G0B1 with "8 MHz crystal" and "USB (on PA11/PA12)" or "CAN bus (on PB12/PB13)" .
        # The "EBB36 GEN2" micro-controller will be used to control the components on the nozzle.

        # See docs/Config_Reference.md for a description of parameters.

        [mcu EBB]
        serial: /dev/serial/by-id/usb-Klipper_Klipper_firmware_12345-if00
        #canbus_uuid=a62a88bb28e3

        [temperature_sensor EBB36]
        sensor_type: Generic 3950
        sensor_pin: EBB:PA0
        pullup_resistor: 2200

        [lis2dw]
        cs_pin: EBB:PB1
        spi_bus:spi2_PB2_PB11_PB10
        axes_map: x,y,z

        [extruder]
        step_pin: EBB:PB14
        dir_pin: EBB:PA8
        enable_pin: !EBB:PB6
        microsteps: 16
        rotation_distance: 33.500
        nozzle_diameter: 0.400
        filament_diameter: 1.750
        heater_pin: EBB:PB4
        sensor_type: EPCOS 100K B57560G104F
        pullup_resistor: 2200
        sensor_pin: EBB:PA3
        control: pid
        pid_Kp: 21.527
        pid_Ki: 1.063
        pid_Kd: 108.982
        min_temp: 0
        max_temp: 250

        [tmc2209 extruder]
        uart_pin: EBB:PB3
        run_current: 0.650
        stealthchop_threshold: 999999

        #[filament_switch_sensor fil_det]
        #switch_pin: EBB:PD0

        [fan]
        pin: EBB:PD3

        [heater_fan hotend_fan]
        pin: EBB:PA5
        heater: extruder
        heater_temp: 50.0

        #[heater_fan 3w_fan2]
        #pin: EBB:PD2
        #tachometer_pin: EBB:PA4

        #[neopixel hotend_rgb]
        #pin: EBB:PC7

        #[bltouch]
        #sensor_pin: ^!EBB:PB8
        #control_pin: EBB:PB5

        #[output_pin rled]
        #pin:EBB:PA2

        #[temperature_sensor BME280]
        #sensor_type: BME280
        #i2c_mcu: EBB
        ##i2c_bus: i2c3_PA7_PA6
        #i2c_software_scl_pin: EBB:PA7
        #i2c_software_sda_pin: EBB:PA6

        #endstop_pin: EBB:PA15
        #diag_pin: ^EBB:PD1


=== "EBB42 GEN2 V1.0"
    
        # This file contains common pin mappings for the BIGTREETECH EBB42
        # GEN2 board. To use this config, the firmware should be compiled for the
        # STM32G0B1 with "8 MHz crystal" and "USB (on PA11/PA12)" or "CAN bus (on PB12/PB13)" .
        # The "EBB42 GEN2" micro-controller will be used to control the components on the nozzle.

        # See docs/Config_Reference.md for a description of parameters.

        [mcu EBB]
        serial: /dev/serial/by-id/usb-Klipper_Klipper_firmware_12345-if00
        #canbus_uuid=a62a88bb28e3

        [temperature_sensor EBB42]
        sensor_type: Generic 3950
        sensor_pin: EBB:PA0
        pullup_resistor: 2200

        [lis2dw]
        cs_pin: EBB:PB1
        spi_bus:spi2_PB2_PB11_PB10
        axes_map: x,y,z

        [extruder]
        step_pin: EBB:PD3
        dir_pin: EBB:PD2
        enable_pin: !EBB:PB6
        microsteps: 16
        rotation_distance: 33.500
        nozzle_diameter: 0.400
        filament_diameter: 1.750
        heater_pin: EBB:PB0
        sensor_type: EPCOS 100K B57560G104F
        pullup_resistor: 2200
        sensor_pin: EBB:PA1
        control: pid
        pid_Kp: 21.527
        pid_Ki: 1.063
        pid_Kd: 108.982
        min_temp: 0
        max_temp: 250

        [tmc2209 extruder]
        uart_pin: EBB:PB3
        run_current: 0.650
        stealthchop_threshold: 999999

        #[filament_switch_sensor fil_det]
        #switch_pin: EBB:PA3

        [fan]
        pin: EBB:PB8

        [heater_fan hotend_fan]
        pin: EBB:PB15
        heater: extruder
        heater_temp: 50.0

        #[heater_fan 3w_fan2]
        #pin: EBB:PB4
        #tachometer_pin: EBB:PB9

        #[neopixel hotend_rgb]
        #pin: EBB:PB14

        #[bltouch]
        #sensor_pin: ^!EBB:PA5
        #control_pin: EBB:PA4

        #[output_pin rled]
        #pin:EBB:PA8

        #[temperature_sensor BME280]
        #sensor_type: BME280
        #i2c_mcu: EBB
        ##i2c_bus: i2c1_PA9_PA10
        #i2c_software_scl_pin: EBB:PA9
        #i2c_software_sda_pin: EBB:PA10

        #endstop_pin: EBB:PA2
        #diag_pin: ^EBB:PD1


# References

{% include "affiliate-disclosure.md" %}
{% include "ads/footer-AD.md" %}