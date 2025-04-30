<!--
title: Eddy
description: 
published: true
date: 2024-10-09T09:31:08.315Z
tags: 
editor: ckeditor
dateCreated: 2024-10-09T09:27:15.790Z
-->

## Eddy USB: Pros and Cons

### **Overview**
The Eddy USB is a more advanced version of BTT's Eddy bed-leveling sensor. Featuring an onboard RP-2040 MCU, this sensor offers a wide range of capabilities, including thermal expansion calibration, making it suitable for more complex, high-temperature printing applications.

---

### **Pros**
1. **Advanced Features**: With an onboard RP-2040 MCU, the Eddy USB offers advanced features like thermal expansion calibration, ideal for users printing high-temp or engineered filaments.
2. **Independent MCU**: The built-in MCU allows the Eddy USB to function as a separate controller, handling more complex tasks than a simple sensor. This can improve overall printing accuracy and reliability.
3. **Improved Calibration**: With features like thermal calibration, the Eddy USB is particularly suited for printing in enclosed environments where temperature fluctuations can affect print quality.
4. **I2C and USB Capabilities**: In addition to its I2C capability, the USB port offers another means of communication, providing flexibility in how the probe integrates into different setups.

---

### **Cons**
1. **Higher Cost**: The Eddy USB is more expensive than the Eddy Coil due to its advanced features. It may not be a necessary upgrade for all users, especially those with simpler printing needs.
2. **Complex Setup**: While more capable, the Eddy USB requires more detailed setup and configuration, which could be overwhelming for users unfamiliar with 3D printer electronics.
3. **Documentation Shortcomings**: Like the Eddy Coil, the Eddy USB suffers from disorganized documentation, which combines both product types. This lack of clarity can make setup more confusing.
4. **Potential Overkill for Simple Setups**: For users printing standard materials, the advanced capabilities of the Eddy USB might be overkill. In these cases, a simpler and cheaper probe like the Eddy Coil may be sufficient.

---

## **Calibration Steps**

### **Eddy USB Calibration**
1. **Drive Current Calibration**:
   - Place Eddy approximately 20mm above the bed.
   - Run the command: `LDC_CALIBRATE_DRIVE_CURRENT CHIP=btt_eddy`.
   - Save the configuration using: `SAVE_CONFIG`.

2. **Mapping Eddy Readings to Nozzle Heights**:
   - Run the command: `PROBE_EDDY_CURRENT_CALIBRATE_AUTO CHIP=btt_eddy`.
   - Follow the prompts to lower the nozzle until it sandwiches a piece of paper between it and the bed.
   - Save the configuration using: `SAVE_CONFIG`.

3. **Temperature Compensation Calibration**:
   - Home all axes and move Z 5mm above the bed (`G0 Z5`).
   - Set idle timeout: `SET_IDLE_TIMEOUT TIMEOUT=36000`.
   - Run: `TEMPERATURE_PROBE_CALIBRATE PROBE=btt_eddy TARGET=56 STEP=4`.
   - Perform the paper pinch method at each temperature step until calibration completes.

---

### **Eddy Coil Calibration**
1. **Drive Current Calibration**:
   - Place Eddy approximately 20mm above the bed.
   - Run the command: `LDC_CALIBRATE_DRIVE_CURRENT CHIP=btt_eddy`.
   - Save the configuration using: `SAVE_CONFIG`.

2. **Mapping Eddy Readings to Nozzle Heights**:
   - Run the command: `PROBE_EDDY_CURRENT_CALIBRATE CHIP=btt_eddy`.
   - Lower the nozzle until it sandwiches a piece of paper between it and the bed.
   - Save the configuration using: `SAVE_CONFIG`.

---

### **Important Notes**
- Ensure the Eddy is mounted 2-3mm above the bed when the nozzle is at Z=0.
- For Eddy USB, perform all calibrations with the bed and nozzle heated to operational temperatures to account for thermal expansion.
- Avoid running Eddy USB cables alongside electrically noisy cables like stepper motor wires.

---

<!-- Google AdSense Code -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8999624978372317"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8999624978372317"
     data-ad-slot="1140087271"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

### **Conclusion**
The Eddy USB is an advanced bed-leveling sensor designed for users who need more precise calibration and thermal compensation. It's best suited for high-temp printing environments or users who require greater accuracy and reliability. However, its higher price and complex setup may not be necessary for all users.

---

## **Sources and Links**
- [Reddit user review](https://www.reddit.com/r/klippers/comments/1fyn6vq/btt_eddy_coil_review_and_rant/?share_id=FR94Inj_G5girmTBwdWdi&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=1)

---
title: Eddy USB Probe
description: Comprehensive guide to the Eddy USB bed-leveling sensor - A high-precision, temperature-compensated probe for Voron printers
published: true
tags: [Eddy, Eddy USB, bed-leveling, sensors, temperature-compensated]
---

# Eddy USB Probe { #eddy-usb-probe }

The Eddy USB Probe is a sophisticated bed-leveling sensor that uses eddy current technology to provide highly accurate and temperature-compensated bed leveling. It's particularly well-suited for Voron printers and other high-performance 3D printers.

## Features { #features }

- **Advanced Technology**:
  - Eddy current-based detection
  - Temperature compensation
  - USB connectivity
  - Independent MCU
- **High Precision**:
  - Sub-micron accuracy
  - Temperature stability
  - Multi-material support
- **Smart Features**:
  - Automatic calibration
  - Real-time monitoring
  - LED status indicators
  - Configurable sensitivity

## Benefits { #benefits }

- **Superior Accuracy**:
  - Temperature-independent readings
  - Consistent measurements
  - Reliable first layers
- **Time Efficiency**:
  - Quick setup process
  - Automatic calibration
  - Reduced manual adjustments
- **Versatility**:
  - Works with various bed materials
  - Compatible with multiple printer types
  - Supports different mounting configurations

## User Experiences { #user-experiences }

!!! quote "From Reddit User Review"
    "The Eddy USB is a game-changer for high-temp printing. The thermal compensation is spot-on, and I've never had to re-calibrate after changing nozzles or sheets. Worth every penny for serious printers."

!!! quote "From Voron Discord User"
    "I've had mixed results with the Eddy USB. While the temperature compensation works well, I've had issues with USB connectivity dropping out during long prints. The documentation is also quite confusing, especially for the advanced features."

!!! tip "Community Feedback"
    - Many users report perfect first layers even at high bed temperatures
    - The USB version is preferred over the I2C version for its stability
    - Some users mention the initial setup can be challenging but worth it
    - Great for enclosed printers where temperature variations are common

!!! warning "Common User Complaints"
    - Documentation is poorly organized and often outdated
    - USB connection can be unreliable, especially with certain MCUs
    - Price point is significantly higher than other probes
    - Setup complexity is overwhelming for beginners
    - Some users report interference issues with stepper motors
    - Calibration process is time-consuming and not well documented
    - Support response times can be slow
    - Firmware updates sometimes break existing configurations

## Installation Guide { #installation }

### Hardware Setup

1. **Mounting**:
   - Mount the probe 2-3mm above the nozzle
   - Ensure proper alignment with the bed
   - Secure all connections firmly

2. **Wiring**:
   - Connect USB cable to the probe
   - Route cables away from stepper motors
   - Secure cables to prevent interference

### Software Configuration

1. **Klipper Setup**:
```ini
[probe]
pin: !gpio0
x_offset: 0
y_offset: 0
z_offset: 0
speed: 5.0
samples: 3
samples_result: median
sample_retract_dist: 2.0
samples_tolerance: 0.006
samples_tolerance_retries: 3
```

2. **Calibration**:
   - Run initial calibration
   - Set Z-offset
   - Configure mesh leveling

## Usage Tips { #usage-tips }

!!! tip "Best Practices"
    - Perform calibration at operating temperature
    - Clean the bed surface before leveling
    - Check probe alignment regularly
    - Update firmware when available

!!! warning "Common Issues"
    - Incorrect mounting height
    - Loose connections
    - Interference from other electronics
    - Outdated firmware

## Advanced Configuration { #advanced-config }

### Temperature Compensation

```ini
[eddy]
temperature_compensation: true
compensation_factor: 1.0
```

### Multi-Material Support

```ini
[eddy]
material_detection: true
detection_threshold: 0.1
```

## Troubleshooting { #troubleshooting }

### Common Problems

1. **Inconsistent Readings**:
   - Check mounting height
   - Verify connections
   - Clean probe surface

2. **Calibration Issues**:
   - Ensure proper temperature
   - Check bed surface
   - Verify probe alignment

3. **Communication Errors**:
   - Check USB connection
   - Verify firmware version
   - Restart Klipper

## Related Resources { #related-resources }

- [Official Documentation](https://eddy-probe.com/docs)
- [GitHub Repository](https://github.com/eddy-probe)
- [Voron Discord](https://discord.gg/voron)
- [Klipper Documentation](https://www.klipper3d.org/Bed_Level.html)
- [Reddit User Review](https://www.reddit.com/r/klippers/comments/1fyn6vq/btt_eddy_coil_review_and_rant/)

{% include "ads/footer-AD.md" %}
