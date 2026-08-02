<!--
title: Eddy Coil
description: 
published: true
date: 2024-10-09T09:30:28.725Z
tags: 
editor: ckeditor
dateCreated: 2024-10-09T09:27:54.504Z
-->

## Eddy Coil: Pros and Cons

### **Overview**

The Eddy Coil is an inductive bed-leveling sensor developed by BTT. It integrates into various printer ecosystems, such as those built with SKR boards and other components, making it a suitable choice for users already invested in the BTT ecosystem. The coil is a simpler, more affordable version of the Eddy probe that connects via I2C to a toolhead board.

---

### **Pros**
1. **Affordable**: The Eddy Coil is a budget-friendly option for users, especially for those who have already invested in BTT hardware. It offers a functional solution for bed leveling without breaking the bank.
2. **Easy to Install**: Its small size fits easily into standard 3D printer carriages, particularly those designed for inductive probes. This makes it versatile and simple to install across various configurations.
3. **No Firmware Required**: Unlike some probes, the Eddy Coil doesn’t require flashing firmware, which simplifies the setup process.
4. **Compatibility**: The Eddy Coil is fully supported on the mainline Klipper releases, eliminating concerns about using specialized forks.
5. **I2C Communication**: The I2C capability allows the probe to communicate directly with the printer’s toolhead board, ensuring seamless integration.

---

### **Cons**
1. **"Dumb" Version**: The Eddy Coil lacks advanced features like thermal expansion calibration, making it less ideal for high-temp filament printing. It doesn’t have the same level of functionality as its counterpart, the Eddy USB.
2. **Documentation Issues**: Users report that the documentation is disorganized, often lumping the Eddy Coil and Eddy USB together. This confusion can make setup more difficult, especially for new users.
3. **Precision in Setup**: The sensor needs to be precisely 2-3mm above the nozzle, and this is not something you can eyeball. Proper calibration tools, like feeler gauges or improvised setups, are essential for avoiding errors.
4. **Errors During Setup**: Without precise positioning, the Eddy Coil may throw various errors (sensor error, probe out of range), leading to frustration during the installation process.

---

The Eddy Coil is a good option for users seeking an affordable, reliable sensor for bed leveling in their 3D printers. However, its setup requires careful calibration, and its "dumb" nature limits its use for those needing advanced features.

---

## Sources and Links
- [Reddit user review](https://www.reddit.com/r/klippers/comments/1fyn6vq/btt_eddy_coil_review_and_rant/?share_id=FR94Inj_G5girmTBwdWdi&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share&utm_term=1)
