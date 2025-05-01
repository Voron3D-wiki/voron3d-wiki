# Wiring Guidelines

## Overview

This guide provides comprehensive wiring guidelines for Voron 3D printers, covering wire selection, routing, and best practices.

## Wire Selection

### Wire Gauge
- **Power Wires**
  - 24V Main Power: 14AWG
  - Bed Heater: 14AWG
  - Hotend Heater: 18AWG
  - Fans: 20AWG

- **Signal Wires**
  - Stepper Motors: 20AWG
  - Endstops: 22AWG
  - Thermistors: 22AWG
  - LEDs: 22AWG

### Wire Types
- **Power Wires**
  - Stranded copper
  - High-temperature rated
  - UL/CE certified
  - Proper insulation

- **Signal Wires**
  - Shielded when needed
  - Twisted pairs
  - Proper insulation
  - Flexible

## Wiring Practices

### Power Distribution
1. **Main Power**
   - Use proper gauge
   - Secure connections
   - Add fuses
   - Check polarity

2. **Component Power**
   - Calculate current
   - Use proper gauge
   - Add protection
   - Verify connections

### Signal Wiring
1. **Stepper Motors**
   - Use twisted pairs
   - Keep lengths equal
   - Avoid interference
   - Secure connections

2. **Sensors**
   - Shield when needed
   - Keep away from power
   - Use proper gauge
   - Secure connections

## Cable Management

### Routing
1. **Power Cables**
   - Separate from signals
   - Use proper strain relief
   - Avoid sharp bends
   - Secure properly

2. **Signal Cables**
   - Bundle similar signals
   - Use cable chains
   - Add strain relief
   - Label cables

### Protection
1. **Physical**
   - Use cable chains
   - Add strain relief
   - Protect from heat
   - Secure properly

2. **Electrical**
   - Add fuses
   - Use protection circuits
   - Check grounding
   - Test connections

## Connectors

### Types
1. **Power Connectors**
   - XT60/XT90
   - JST
   - Molex
   - Terminal blocks

2. **Signal Connectors**
   - JST
   - Dupont
   - Molex
   - Terminal blocks

### Installation
1. **Crimping**
   - Use proper tools
   - Check crimps
   - Test connections
   - Secure properly

2. **Soldering**
   - Use proper technique
   - Check joints
   - Add strain relief
   - Test connections

## Testing

### Continuity
1. **Power Circuits**
   - Check connections
   - Verify polarity
   - Test protection
   - Measure voltage

2. **Signal Circuits**
   - Check connections
   - Verify signals
   - Test sensors
   - Check motors

### Safety
1. **Before Power On**
   - Check all connections
   - Verify grounding
   - Test protection
   - Document changes

2. **After Power On**
   - Monitor voltage
   - Check temperature
   - Test functions
   - Document results

## Resources

- [Voron GitHub](https://github.com/VoronDesign)
- [Klipper Documentation](https://www.klipper3d.org/)
- [Electrical Standards](../standards.md)
- [Component Specifications](../specifications.md) 