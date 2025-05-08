---

title: "Phaetus Dragon Hotend"
description: "Comprehensive guide for installing, configuring, and maintaining the Phaetus Dragon Hotend"
published: true
tags:

* hotend
* phaetus
* dragon

---

# Phaetus Dragon Hotend

## Overview

The Phaetus Dragon is a high‑performance 3D printer hotend engineered for reliability, high‑flow filament throughput, and elevated temperature capability. Available in Standard Flow (SF) and High Flow (HF) models, it suits both detailed prints and high‑volume production.

## Specifications

| Parameter         | Standard Flow (SF)         | High Flow (HF)             | Notes                |
| ----------------- | -------------------------- | -------------------------- | -------------------- |
| Max Temperature   | 300 °C                     | 500 °C                     |                      |
| Maximum Flow Rate | Up to 11 mm³/s             | Up to 15 mm³/s             | Volumetric rate      |
| Nozzle Size       | 0.4 mm (0.2–0.8 mm avail.) | 0.4 mm (0.2–0.8 mm avail.) |                      |
| Filament Diameter | 1.75 mm                    | 1.75 mm                    |                      |
| Heat Block        | Copper alloy               | Copper alloy               | Nickel-plated option |
| Heat Break        | Titanium alloy             | Titanium alloy             |                      |

## Installation

### Tools Required

* 2 mm hex key
* 2.5 mm hex key
* 7 mm wrench
* High‑temperature thermal paste
* Heat‑block sock

### Mounting Procedure

```bash
# 1. Thread the heat break into the heat block
# 2. Screw nozzle into the heat block
# 3. Insert heater cartridge and thermistor into their bores
# 4. Secure with the retention set screws (apply thermal paste as needed)
# 5. Attach part cooling fan and heatsink/fan shroud
```

## PID Tuning

Use Klipper’s built-in PID calibration command to find optimal tuning values for your hotend heater:

```gcode
PID_CALIBRATE HEATER=extruder TARGET=200
```

• Replace `TARGET=200` with your desired temperature (e.g., `TARGET=250` for PETG).
• Once calibration finishes, save results to your configuration:

```gcode
SAVE_CONFIG
```

These commands will automatically measure and apply appropriate Kp, Ki, and Kd values for stable temperature control.

## Maintenance

### Regular Schedule

```notes
Weekly:
- Clean nozzle and check for clogs
- Inspect heat break and filament path
- Verify temperature stability

Monthly:
- Fully disassemble for deep cleaning
- Inspect and replace wear parts
```

### Common Issues & Solutions

| Issue             | Cause                   | Remedy                                  |
| ----------------- | ----------------------- | --------------------------------------- |
| Heat creep        | Insufficient cooling    | Improve heatsink airflow or fan ducting |
| Nozzle clogs      | Debris or wrong temp    | Clean/replace nozzle, adjust temp       |
| Temp fluctuations | PID not tuned           | Re-run PID tuning                       |
| Filament leakage  | Loose nozzle/heat break | Torque to spec, inspect threads         |

## Performance & Testing

### Recommended Print Settings

| Material | Temperature | Print Speed    |
| -------- | ----------- | -------------- |
| PLA      | 200–220 °C  | Up to 150 mm/s |
| PETG     | 230–250 °C  | Up to 120 mm/s |
| ABS      | 240–260 °C  | Up to 100 mm/s |
| TPU      | 220–235 °C  | Up to 50 mm/s  |

### Flow Rate Calculation

```python
# Test parameters for volumetric flow (mm³/s)
layer_height = 0.2
line_width   = 0.4
speed        = 100  # mm/s
flow_rate = layer_height * line_width * speed
print(f"Flow rate: {flow_rate} mm³/s")
```

## Upgrades & Accessories

* **Nozzles:** Brass (std), Hardened steel, Ruby-tipped, Tungsten carbide
* **Heat Breaks:** Standard copper, Bi-metal, Titanium
* **Extras:** High-flow cooling fan, insulated heater block cover

## References

1. [Phaetus Official Dragon Documentation](https://www.phaetus.com/dragon)
2. [Voron Hardware Guide](https://docs.vorondesign.com/hardware.html)
3. [Community Review at 3DPrintBeginner](https://3dprintbeginner.com/phaetus-dragon-hotend-review/)

{% include "ads/footer-AD.md" %}
