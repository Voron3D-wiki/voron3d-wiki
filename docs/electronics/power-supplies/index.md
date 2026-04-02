---
title: Power Supplies
description: Guide to power supply options for Voron printers
published: true
tags: [electronics, power, components]
---

## Overview

This section covers power supply options for Voron printers. Choosing the right PSU is critical for safe and reliable printer operation.

## How to choose a power supply

Power supplies are rated by wattage — ensure your PSU can handle the combined load of your heated bed, hotend, motors, fans, and electronics with headroom to spare. A general rule of thumb is to run your PSU at no more than 80% of its rated capacity continuously.

Quality matters significantly with PSUs. Cheap, unbranded supplies may not deliver their rated wattage, lack proper overcurrent/overvoltage protection, and can be a fire hazard. Stick to reputable brands.

Most Voron printers run on **24V**, which allows smaller wire gauges and more efficient heater performance compared to 12V. Some accessories (Raspberry Pi, LEDs) may require a separate 5V source.

## Calculating your total power draw

Before selecting a PSU, add up the wattage of every powered component in your build:

### Heaters (dominant load — always check these first)

- Heated bed: check your specific bed's rating (e.g. a 300mm bed is typically 300–400W, a 350mm bed 500–600W)
- Hotend heater cartridge: typically 30–60W depending on type (standard vs. high-flow/high-temp)
- Chamber heater (if any): varies widely

### Stepper motors

Steppers are configured with `run_current` in Klipper — the current the driver targets while the motor is moving. When idle, Klipper reduces current automatically via the TMC driver's internal standstill feature rather than a separate `hold_current` setting (which has been deprecated by klipper). Idle steppers therefore draw less than moving ones, so real-world average draw is lower than `run_current` alone would suggest.

See the section below for why the PSU draw is much lower than the `run_current` value implies. As a conservative estimate, budget **~5–10W per stepper** for a 24V system under typical run currents (0.6–1.0A). Higher run currents or more steppers (e.g. dual Z, dual A/B) will push toward the top of that range.

### Electronics

- MCU/control board: ~5–15W
- Raspberry Pi or SBC: ~5–15W
- Fans, LEDs, probes: ~5–20W total depending on count and type

### Example — Voron 2.4 350mm at 24V

| Component | Estimated draw |
| --------- | -------------- |
| 350mm bed (500W) | 500W |
| Hotend heater | 50W |
| 7× steppers @ ~7W each | 49W |
| Electronics + fans | 20W |
| **Total** | **~619W** |

At 80% load target, this build needs a PSU rated for at least **~775W** — or two PSUs sharing the load (common approach: one PSU for the bed, one for everything else).

## Stepper motors and PSU current draw

This is one of the most commonly misunderstood topics when sizing a power supply.

The TMC2209 (and similar drivers) are **constant-current** drivers — they regulate the current through the motor coils regardless of supply voltage. The amperage value you set in Klipper (`run_current`) is the current flowing through the **motor**, not the current drawn from the PSU.

Because the driver regulates current via PWM (rapidly switching the voltage on and off), the actual current drawn from the PSU is **much lower** than the motor's run current. As a rough approximation:

> **PSU current draw ≈ (motor current × motor voltage) / PSU voltage**

For example: a motor running at 0.8A with a 24V PSU, where the motor's back-EMF means it only uses ~3V of that, draws roughly 0.1A from the PSU rail — not 0.8A.

The practical takeaway is that your steppers contribute far less to PSU load than their Klipper `run_current` values suggest. The heated bed is almost always the dominant load.

Higher supply voltages (48V) allow the driver to ramp motor current faster at high speeds, improving torque at higher step rates — this is the main reason to run 48V, not to increase peak motor current.

## 24V Power Supplies

### LRS-200-24 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|200W|24V|8.8A|[West3d](https://west3d.com/products/mean-well-lrs-200-24-200w-24v-8-8a-power-supply-psu)|

### LRS-350-24 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|350W|24V|14.6A||

### UHP-200-24 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|200W|24V|8.4A|[West3d](https://west3d.com/products/mean-well-uhp-200-24-200w-24v-8-4a-power-supply-psu)|

### UHP-350-24 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|350W|24V|14.6A|[West3d](https://west3d.com/products/mean-well-uhp-350-24-350w-24v-14-6a-power-supply-psu)|

### RSP-500-24 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|500W|24V|20.8A||

## 48V Power Supplies

48V is used in some high-performance builds to improve stepper motor performance at high speeds. The higher voltage allows the driver to overcome motor back-EMF more quickly, meaning the coils reach their target current faster during each step — this translates to better torque at high velocities.

**Important considerations for 48V:**

- Your stepper drivers must support 48V. The TMC2209 is rated to **29V max** — it will be destroyed on a 48V rail. You need drivers rated for higher voltage such as the **TMC5160**, **TMC2160**, or similar.
- Your MCU, hotend heater, bed heater, and fans almost certainly cannot run on 48V. A 48V build typically uses a **separate 24V (or lower) rail** for everything except the stepper drivers.
- The motor's current rating does not change — you still set the same `run_current` in Klipper. The benefit is torque at speed, not higher current.

### RSP-320-48 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|320W|48V|6.7A||

### UHP-200-48 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|200W|48V|4.2A|[West3d](https://west3d.com/products/mean-well-uhp-200-48-200w-48v-4-2a-power-supply-psu-1)|

### UHP-350-48 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|350W|48V|7.3A|[West3d](https://west3d.com/products/mean-well-uhp-350-24-350w-48v-7-3a-power-supply-psu)|

## 5V Power Supplies

Some builds use a dedicated 5V PSU to power a Raspberry Pi or other SBC instead of relying on a USB power adapter.

### RS-25-5 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|25W|5V|5A|[West3d](https://west3d.com/products/mean-well-rs-25-5-25w-5v-5a-power-supply-psu)|

### IRM-60-5 (Mean Well)

|brand|wattage|voltage|current|purchase links|
|-----|-------|-------|-------|---------------|
|Mean Well|60W|5V|12A||

## Notes

- The **LRS-350-24** is the most commonly used PSU in stock Voron builds and is a safe default choice.
- The **LRS-200-24** may be sufficient for smaller printers (V0, Switchwire) with lower-wattage beds.
- Higher-wattage beds (e.g. 500W+ on a V2.4 350mm) may benefit from an **RSP-500-24** or dual-PSU setups.
- Always verify your wiring and fusing when dealing with mains voltage.

{% include "affiliate-disclosure.md" %}
