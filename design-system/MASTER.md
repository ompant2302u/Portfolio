# Om Prakash Pant Portfolio — Design System

This project follows the UI/UX Pro Max workflow concept of a project-level master design system: coherent visual direction first, implementation second.

## Direction
- Product: personal developer portfolio
- Audience: recruiters, engineering teams, collaborators, clients
- Mood: editorial, cinematic, technical, confident, human
- Layout: asymmetric, content-first, large typography, minimal chrome
- Avoid: generic glass-card dashboards, purple/pink AI gradients, fake metrics, excessive pills, stock illustrations

## Palette
- Ink: #080B0D
- Paper: #F3EFE5
- Acid accent: #CCFF4A
- Orange accent: #FF6A2C
- Blue accent: #8FB4FF

## Typography
- Display/UI: Space Grotesk
- Body: Manrope
- Editorial accent: Instrument Serif

## Motion
- Scroll reveal: 850–1050ms with cubic-bezier(.22,1,.36,1)
- Pointer tilt: subtle only; never blocks interaction
- Continuous motion: marquee and contained visual scenes only
- Reduced motion: all nonessential transitions and animations collapse under prefers-reduced-motion

## Components
Use bespoke composition rather than a reusable generic component library. Repetition comes from tokens and spacing, not identical card shells.

## Accessibility
- Semantic sections and headings
- Keyboard-operable navigation
- Focusable native links/buttons
- Real alt text for portrait
- Decorative graphics hidden from assistive technology
- High contrast dark and light surfaces
- Motion preference respected
