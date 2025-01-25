**Title: Mastering the Enraged Rabbit Carrot Feeder (ERCF): Insights and Lessons Learned**

*Full credit to the original source: [Reddit user](https://www.reddit.com/r/VORONDesign/comments/1gqfonx/comment/lx2rkqr/)*
*Links: [OFFICAL GITHUB](https://github.com/Enraged-Rabbit-Community/ERCF_v2/tree/master)*

---
![ERCF v2 Design](https://github.com/Enraged-Rabbit-Community/ERCF_v2/blob/master/Assets/ERCFv2.png?raw=true)
**Introduction**

The Enraged Rabbit Carrot Feeder (ERCF) is a highly capable multi-material upgrade for 3D printers, particularly within the Voron ecosystem. Over a six-month period, a dedicated user shared their experience with the ERCF V2, offering valuable insights and lessons for those considering or already using this multi-material unit (MMU). This article focuses solely on the ERCF, while other MMU alternatives, such as the Tradrack, will be covered in a separate article.

To showcase the capabilities of the ERCF, here are some impressive achievements:

- **600 filament swaps, 36 hours of print time**
- **1,000 swaps over 48 hours without intervention**
- **A compact, desk-friendly setup for the ERCF**

With that in mind, let’s dive into the essential tips and lessons learned.

---

**Choosing the Right MMU**

When this journey began, the two main MMU options were the ERCF V2 and Tradrack. The ERCF was selected due to the availability of kits, while the Tradrack required extensive self-sourcing. For more details on the Tradrack and other MMU alternatives, see [our dedicated MMU comparison article](#).

---

**Essential Setup Tips for Reliability**

1. **Toolhead Filament Cutter**: While tip tuning can help, a toolhead filament cutter ensures clean cuts, easing loading and unloading and reducing the risk of filament clogs.

2. **Toolhead Entry Sensors**: Add extruder entry and toolhead entry sensors. These sensors detect when filament clears the extruder and precisely home the filament into the hotend, reducing errors during filament swaps.

3. **Upgrade the Servo**: The stock MG90 servo may be underpowered. Upgrading to a Savox SH 0255 MG ensures better control and eliminates filament slipping.

![ERCF FULL CAD render](https://github.com/Enraged-Rabbit-Community/ERCF_v2/blob/master/Assets/Full_CAD.jpg?raw=true)

4. **Filament Buffer Alternatives**: Traditional slot-based buffers increase friction and cause tangles. Replace them with a filamentalist passive rewinder for smoother filament movement and reduced extrusion issues.

5. **Shorten Bowden Paths**: Reduce friction and improve load/unload times by using a top-panel Bowden entry system to shorten the path from the ERCF to the toolhead.

6. **Synchronized Mode**: Run the printer extruder and MMU in sync. This reduces the load on the extruder and minimizes the risk of filament path errors.

7. **Filament Ooze Management**: Without a poop chute, controlling filament ooze during tool changes is crucial. Use a nozzle stop and wiper system to prevent stringing and oozing during filament swaps.

8. **Pre-Gate Sensors**: Pre-gate sensors detect filament runout before it’s too late, ensuring the ERCF can switch to a new spool in time. Position them at a proper distance from the MMU to avoid detection delays.

9. **Follow the Happy Hare Guide**: The Happy Hare Wiki is a goldmine of guidance. Read it thoroughly, especially the toolhead dimensions calibration section to avoid extrusion and blobbing issues.

---

**Advanced Troubleshooting and Tuning**

- **Clogs in the Hotend**: If clogs occur, it’s likely due to excessive retraction before cutting. Reduce retraction distance and enable the "cooling move" option.

- **Oozing Issues**: If you see filament being pushed out when a new filament is loaded, recalibrate the toolhead dimensions.

- **High Print Quality**: Print ERCF parts in ABS/ASA at 0.4mm layer height. Ensure parts fit snugly and accurately, as tight tolerances are essential for optimal performance.

- **Cutting Blade and Torque**: Avoid over-compressing the filament cutter. Use sharp blades and manage stepper current during cuts for more torque.

- **Belt Tension**: Increase belt tension from 110Hz (stock) to 125Hz for stiffer belts and better cutting performance.

- **Servo Arm Reinforcement**: Prevent spline wear by printing the servo arm with stronger materials like nylon or using a Savox-compatible arm upgrade.

---

**Maintenance and Customization**

- **Regularly Check Servo Splines**: The stock plastic splines wear out quickly. Print a more robust arm or upgrade to a Savox-compatible arm.

- **Pre-Gate Sensor Positioning**: Position the pre-gate sensors far enough from the MMU to prevent the "hooked end" problem when switching spools.

- **Inline Filament Sensors**: Add inline pre-gate sensors for real-time filament tracking.

---

**Performance Rating and Use Cases**

After months of optimization, this user’s confidence in the ERCF’s reliability has grown. Here’s a breakdown of how the system performs:

- **Single Material Prints**: 10/10 — Remote filament selection and printing work reliably. No issues for months.

- **Endless Spool Swaps**: 6-7/10 — Filament end hooks sometimes cause jams, but recent mods have improved the process. While better than before, it’s not foolproof.

- **Multi-Material/Color Prints**: 9/10 — Completed several 500+ tool-change, 36-48 hour prints without intervention. Occasional issues persist but are less frequent.

---

**Tools and References**

1. **Happy Hare Wiki**: [Happy Hare Tuning Guide](https://github.com/moggieuk/Happy-Hare/wiki)
2. **Filamentalist Rewinder**: [GitHub Link](https://github.com/Enraged-Rabbit-Community/ERCF_v2/tree/master/Recommended_Options/Filamentalist_Rewinder)
3. **Pre-Gate Sensors**: [Standalone Lever Switch Pre-Gate Sensor](https://github.com/igiannakas/Standalone-lever-switch-pre-gate-sensor-for-ERCF-v2)
4. **Nozzle Stop and Brush**: [Gantry-Mounted Nozzle Seal](https://www.printables.com/model/882364-adjustable-gantry-mounted-nozzle-seal-parking-and)
5. **Top Panel Bowden Entry**: [Bowden Passthrough](https://www.printables.com/model/795052-ptfebowden-tube-passthrough-with-ge4c-spherical-be)

---

**Conclusion**

The ERCF V2 is a highly capable multi-material system, but it requires careful setup, tuning, and ongoing adjustments to maintain reliability. While it excels in single-material printing, endless spool swaps and multi-material prints are still prone to occasional issues, such as jams caused by filament end hooks or calibration misalignments. Improvements like pre-gate sensors, stronger servos, and proper filament handling help reduce these issues but don’t eliminate them entirely.

Users should be prepared for a learning curve and ongoing maintenance, but with persistence, the ERCF can achieve a high degree of reliability for both single and multi-material prints. Success depends on following best practices, leveraging community resources like the Happy Hare Wiki, and being ready to tinker and tweak as needed. For those willing to put in the effort, the ERCF can become a versatile and reliable addition to any Voron 3D printer setup.


{{ read_file('ads/footer-AD.md') }}
