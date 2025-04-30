---
title: Cartographer Probe
description: Overview of the Cartographer Probe
published: true
tags: [Cartographer, Bed Leveling, Z-Probe]
---

# Cartographer Probe

The Cartographer Probe is an innovative sensor designed for 3D printers to achieve precise bed leveling and height mapping. It uses changes in frequency slopes to detect nozzle contact with the bed, offering a unique approach to bed probing.

## Table of Contents
- [Cartographer Probe](#cartographer-probe)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Benefits](#benefits)
  - [Drawbacks](#drawbacks)
  - [Firmware Setup](#firmware-setup)
  - [Fine-Tuning](#fine-tuning)
  - [Settings and Commands](#settings-and-commands)
    - [Available Commands](#available-commands)
    - [Printer.cfg Settings](#printercfg-settings)
  - [How It Works](#how-it-works)
  - [Usage Tips](#usage-tips)
  - [Troubleshooting](#troubleshooting)

## Features

- **Frequency-Based Detection**: The probe detects changes in the slope of frequency values, allowing it to determine when the nozzle touches the bed.
- **No Temperature Compensation Needed**: Since it relies on slope changes rather than absolute frequency values, it is unaffected by coil temperature variations.
- **Metal-Induced Electric Field**: The probe works by inducing an electric field into the closest metal body, such as the spring steel sheet or the bed itself.
- **Versatile Probing Actions**: Supports SCAN Z homing, SCAN bed mesh, and QGL/Z-Tilt, all based on frequency variations.

{% include "ads/article-AD.md" %}

## Benefits

- **High Precision**: The slope-based detection ensures accurate nozzle-to-bed contact, improving first-layer adhesion and print quality.
- **Temperature Independence**: Eliminates the need for temperature compensation, simplifying setup and reducing potential errors.
- **System Offset Stability**: The fixed offset accounts for system-wide factors like thermal expansion and flex, ensuring consistent performance even with nozzle or sheet changes.

## Drawbacks

- **Metal Dependency**: Requires a metal surface within a few millimeters for proper operation, limiting compatibility with non-metal beds.
- **Setup Sensitivity**: Proper mounting and alignment are critical for consistent results, as deviations can lead to probing inaccuracies.
- **Environmental Factors**: Flex in the toolhead, bed, or other components can introduce noise, requiring additional calibration.

{% include "ads/article-AD.md" %}

## Firmware Setup

To configure the Cartographer Probe in your firmware, follow the official [firmware setup guide](https://docs.cartographer3d.com/cartographer-probe/firmware). This guide provides detailed instructions for integrating the probe with your printer's firmware, including configuration examples and troubleshooting tips.

## Fine-Tuning

For optimal performance, fine-tuning the Cartographer Probe is essential. The official [fine-tuning guide](https://docs.cartographer3d.com/cartographer-probe/fine-tuning) covers methods for calibrating the probe, including:

- **Setting Models for Different Beds/Temperatures**: Adjusting the probe for various bed materials and temperature conditions.
- **Temperature Differential Calibration**: Ensuring accuracy across different operating temperatures.
- **Useful Macros**: Leveraging macros to streamline calibration and improve usability.

{% include "ads/article-AD.md" %}

## Settings and Commands

The Cartographer Probe offers a variety of settings and commands to customize its behavior and optimize performance. Refer to the official [settings and commands guide](https://docs.cartographer3d.com/cartographer-probe/settings-and-commands) for detailed information.

### Available Commands

- **PROBE_SWITCH**: Allows switching between SCAN and TOUCH modes. Requires `SAVE_CONFIG` after execution.
  - **MODE**: Sets the mode (`scan` or `touch`). Default: `scan`.

- **CARTOGRAPHER_CALIBRATE**: Used for both TOUCH and SCAN modes calibration:
  - **SCAN MODE**: Prompts users to perform the paper method for calibration.
  - **TOUCH MODE**: Initiates touch mode calibration for re-calibration only.
  - **METHOD**: `MANUAL` initiates the manual paper test.
  - **SPEED**: Probing speed. Default: `3`. Constraints: Max `5`.
  - **ACCEL**: Acceleration during touch. Default: `100`. Min: `100`.
  - **RETRACT**: Retraction distance after probing. Default: `2`. Min: `1`.
  - **RETRACT_SPEED**: Retraction speed. Default: `10`. Min: `1`.
  - **SAMPLES**: Number of samples. Default: `3`. Min: `1`.
  - **TOLERANCE**: Tolerance for samples. Default: `0.01`. Min: `0.0`.
  - **RETRIES**: Max retries if tolerance is exceeded. Default: `10`. Min: `0`.
  - **THRESHOLD**: Touch detection threshold. Default: `2500`. Min: `100`.

- **CARTOGRAPHER_TOUCH**: Initiates a probing process to measure repeatability and ensure a perfect first layer.
  - Includes safety checks, probing process, and result handling.
  - Supports debug mode for troubleshooting.

- **CARTOGRAPHER_THRESHOLD_SCAN**: Scans threshold values to find the most consistent touch sensor threshold.
  - **MIN**: Minimum threshold. Default: `500`. Min: `100`.
  - **MAX**: Maximum threshold. Default: `5000`. Greater than `MIN`.
  - **STEP**: Increment for threshold. Default: `250`.
  - **QUALIFY_SAMPLES**: Samples for qualification. Default: `5`.
  - **VERIFY_SAMPLES**: Samples for verification. Default: `5`.

### Printer.cfg Settings

These settings are available but typically do not require modification:
- **sensor**: Default: `cartographer`.
- **speed**: Default: `5.0`. Min: `0.0`.
- **x_offset**: X offset from the nozzle. Default: `0.0`.
- **y_offset**: Y offset from the nozzle. Default: `0.0`.
- **z_hop_dist**: Default: `5.0`. Min: `0.0`.
- **mode**: Default: `scan`. Options: `scan` or `touch`.
- **trigger_distance**: Default: `2.0`.

## How It Works

The Cartographer Probe operates by detecting changes in the rate of frequency slope as the nozzle approaches the bed. Here's a step-by-step breakdown:

1. **Inducing an Electric Field**: The probe generates an electric field into the nearest metal surface.
2. **Frequency Slope Monitoring**: As the nozzle moves closer to the bed, the frequency value increases at a predictable rate.
3. **Slope Change Detection**: When the nozzle touches the bed, the slope flattens, signaling the probe to stop.
4. **Probing Actions**:
   - **SCAN Z Homing**: Triggers at a specific frequency to determine the Z height.
   - **SCAN Bed Mesh**: Maps the bed surface based on frequency variations.
   - **Survey Nozzle Probing**: Calculates the Z difference between the trigger frequency and the nozzle height.

## Usage Tips

- Ensure the probe is mounted 2.6–3mm above the nozzle tip for optimal performance.
- Verify the rigidity of the toolhead and check for loose screws or bad wiring.
- Maintain clean nozzles and proper belt tension to minimize probing errors.
- Disable features like crowsnest, adaptive mesh, or LED effects if experiencing inconsistent results.

## Troubleshooting

If you encounter issues with the Cartographer Probe, refer to the [troubleshooting guide](https://docs.cartographer3d.com/cartographer-probe/troubleshooting) for detailed steps.

{% include "ads/footer-AD.md" %}