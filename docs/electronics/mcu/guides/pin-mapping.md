---
title: RP2040 Pin Mapping Guide
description: Pin mapping guide for RP2040-based boards
published: true
tags: [rp2040, pin mapping, mcu]
---

# RP2040 Pin Mapping Guide

## Overview
This guide provides detailed pin mapping information for RP2040-based boards.

## Pin Mapping Tables

### GPIO Pins
| Pin Number | Function | Notes |
|------------|----------|-------|
| GPIO0-GPIO1 | UART0 | Primary UART interface |
| GPIO2-GPIO3 | UART1 | Secondary UART interface |
| GPIO4-GPIO5 | I2C0 | Primary I2C interface |
| GPIO6-GPIO7 | I2C1 | Secondary I2C interface |
| GPIO8-GPIO15 | SPI | SPI interfaces |
| GPIO16-GPIO22 | PWM | PWM capable pins |
| GPIO23-GPIO28 | ADC | Analog input capable |

### Special Function Pins
| Pin Number | Function | Notes |
|------------|----------|-------|
| QSPI_SS | Boot select | Used during programming |
| QSPI_SD0-3 | Flash interface | Connected to onboard flash |
| XIN/XOUT | Crystal pins | 12MHz crystal typical |

## Common Configurations

### UART Configuration
```python
uart0 = machine.UART(0, baudrate=115200)
uart0.init(115200, bits=8, parity=None, stop=1)
```

### I2C Configuration
```python
i2c = machine.I2C(0, scl=machine.Pin(5), sda=machine.Pin(4))
```

### SPI Configuration
```python
spi = machine.SPI(0, baudrate=1000000, polarity=0, phase=0)
```

## References
1. [RP2040 Datasheet](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf)
2. [Raspberry Pi Pico Documentation](https://www.raspberrypi.com/documentation/microcontrollers/raspberry-pi-pico.html)

{% include "ads/footer-AD.md" %} 