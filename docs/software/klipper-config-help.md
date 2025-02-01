---
title: Klipper Config Help
description: Guide for configuring Klipper firmware for 3D printers
published: true
tags: [klipper, firmware, configuration, 3d printing]
---

# Klipper Config Help

This guide provides information on configuring Klipper firmware for your 3D printer. This is mostly a list of features that klipper supports that the writer uses and wants to have easy access to.

### [Multiple Cooling Fans](https://www.klipper3d.org/Config_Reference.html?h=fan#fans)
```
    [multi_pin my_fan_pins]
    
        pins: PD12, PD13

    [controller_fan controller_fan]
    
        pin: multi_pin:my_fan_pins
    
        kick_start_time: 0.5
    
        fan_speed: 0.6
    
        heater: heater_bed
```

### [Duplicate Pin Override](https://www.klipper3d.org/Config_Reference.html?h=duplicate#duplicate_pin_override)
```
    [duplicate_pin_override]

        pins: MKS_THR:gpio29,

    [gcode_button sp_sensor]

        pin: ^MKS_THR:gpio29   

    

    [filament_switch_sensor sp_sensor_runout]

        switch_pin: ^MKS_THR:gpio29   


    [servo sp_servo]

        pin: gpio29    # Servo pin


    [manual_stepper sp_motor]  

        endstop_pin: ^MKS_THR:gpio29           

```

### [Multiple MCUs](https://www.klipper3d.org/Config_Reference.html?h=mcu#mcu-my_extra_mcu)
```
    [mcu second_mcu]

        canbus_uuid: 00000000000e #example canbus

        serial: path/to/device #example path  

    [fan] #example usage
        pin: second_mcu:pin_number #example pin number
```