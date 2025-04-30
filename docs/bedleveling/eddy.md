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
The Eddy USB is a more advanced version of BTT’s Eddy bed-leveling sensor. Featuring an onboard RP-2040 MCU, this sensor offers a wide range of capabilities, including thermal expansion calibration, making it suitable for more complex, high-temperature printing applications.

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
The Eddy USB is an advanced bed-leveling sensor designed for users who need more precise calibration and thermal compensation. It’s best suited for high-temp printing environments or users who require greater accuracy and reliability. However, its higher price and complex setup may not be necessary for all users.

---

## **Sources and Links**
- [Reddit user review](https://www.reddit.com/r/klippers/comments/1fyn6vq/btt_eddy_coil_review_and_rant/?share_id=FR94Inj_G5girmTBwdWdi&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=1)
