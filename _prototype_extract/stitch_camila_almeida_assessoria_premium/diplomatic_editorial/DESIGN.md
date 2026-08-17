---
name: Diplomatic Editorial
colors:
  surface: '#fff9ef'
  surface-dim: '#dfd9d1'
  surface-bright: '#fff9ef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f3ea'
  surface-container: '#f3ede4'
  surface-container-high: '#ede7de'
  surface-container-highest: '#e7e2d9'
  on-surface: '#1d1b16'
  on-surface-variant: '#564241'
  inverse-surface: '#32302a'
  inverse-on-surface: '#f6f0e7'
  outline: '#897170'
  outline-variant: '#dcc0be'
  surface-tint: '#a13d3f'
  primary: '#6f181d'
  on-primary: '#ffffff'
  primary-container: '#8e2f32'
  on-primary-container: '#ffadab'
  inverse-primary: '#ffb3b1'
  secondary: '#525f73'
  on-secondary: '#ffffff'
  secondary-container: '#d3e0f8'
  on-secondary-container: '#566377'
  tertiary: '#4a3510'
  on-tertiary: '#ffffff'
  tertiary-container: '#634c24'
  on-tertiary-container: '#ddbe8c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#81262a'
  secondary-fixed: '#d6e3fa'
  secondary-fixed-dim: '#bac7de'
  on-secondary-fixed: '#0f1c2d'
  on-secondary-fixed-variant: '#3b485a'
  tertiary-fixed: '#ffdeaa'
  tertiary-fixed-dim: '#e2c290'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#59431c'
  background: '#fff9ef'
  on-background: '#1d1b16'
  surface-variant: '#e7e2d9'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1120px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 120px
  element-gap: 32px
---

## Brand & Style

The design system is anchored in a **Modern Editorial** aesthetic, specifically tailored for high-end visa consultancy. It avoids the cluttered, frantic energy of travel agencies in favor of the calm, methodical authority of a diplomatic office. The brand personality is specialized, reliable, and exclusive.

The UI should evoke the tactile quality of a premium business card—heavy paper stocks, fine-line engravings, and intentional negative space. We utilize a mix of **Minimalism** and **Tonal Layering** to ensure the user feels guided by an expert hand. Visual motifs include high-fidelity editorial photography, subtle passport-inspired textures, and discrete gold accents that signify "gold standard" service.

## Colors

The palette is rooted in a heritage-inspired selection that balances the authority of the United States with the sophistication of a personal concierge.

- **Primary Burgundy (#8E2F32):** Used for brand-critical elements, primary actions, and major headings. It represents maturity and expertise.
- **Dark Burgundy (#641F24):** Reserved for interactive states (hover/active) and deep-contrast accents in long-form reading.
- **Primary Cream (#F5EFE6):** The foundational "paper" color of the design system. It is softer and more premium than pure white.
- **Off-white (#FCFAF6):** Used for elevated surfaces like cards and form fields to create subtle depth against the Cream background.
- **American Navy (#182536):** Used sparingly for technical details, secondary icons, and to ground the design in a formal, governmental context.
- **Discrete Gold (#B79A6B):** Used exclusively for "quality markers"—dividers, success icons, and premium decorative elements.

## Typography

The typography system relies on a high-contrast pairing between a sophisticated serif and a functional sans-serif.

- **Headings (Playfair Display):** Use medium weights to maintain an airy, editorial feel. Letter spacing should be slightly tightened for large display sizes to increase the "custom-set" look.
- **Body & Labels (Montserrat):** Used for all functional text. Line heights are generous (1.6x) to ensure legibility and a sense of "breathing room."
- **Capitalization:** Use uppercase with increased tracking for labels and small sub-headers to evoke the look of official document headers.

## Layout & Spacing

This design system uses a **Fixed Grid** approach for desktop to maintain the tight, composed look of a printed editorial piece. 

- **Grid:** 12-column layout with a 1120px max-width.
- **Whitespace:** Use aggressive vertical spacing (`section-gap`) between content blocks to emphasize exclusivity. Elements should never feel crowded.
- **Responsive:** On tablet, margins increase to 40px. On mobile, the layout collapses to a single column with 20px side margins, and font sizes scale down specifically for headlines to prevent awkward wrapping.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Fine Outlines** rather than heavy shadows.

- **Surfaces:** Cards use the `Off-white` hex against the `Cream` background. This 1-step shift in value creates depth without visual noise.
- **Borders:** Use 1px solid borders in `border_subtle` (#E6D9CA) for cards and input fields.
- **Shadows:** When necessary (e.g., on hover), use a "Whisper Shadow": `0px 10px 30px rgba(24, 37, 54, 0.04)`. It should be barely perceptible, providing a soft lift rather than a harsh drop.
- **Dividers:** Use the `Discrete Gold` for hairline dividers (0.5px or 1px) to separate major content sections elegantly.

## Shapes

The shape language is "Soft-Square." This choice reflects the structured nature of legal/visa work while maintaining a premium, approachable feel.

- **Components:** Buttons and input fields use a consistent 0.25rem (4px) corner radius.
- **Cards:** Larger containers may use the `rounded-lg` (8px) setting to feel slightly more modern and inviting.
- **Imagery:** Photography should always have sharp or very slightly rounded (4px) corners—never circular or pill-shaped—to maintain the editorial look.

## Components

- **Primary Buttons:** Solid `Primary Burgundy` with `Off-white` text. No gradients. Hover state shifts to `Accent Dark`. 
- **Secondary Buttons:** Ghost style with a `Primary Burgundy` 1px border and text. 
- **Input Fields:** `Off-white` background with a `border_subtle` stroke. Labels should use the `label-md` typography style (uppercase, tracked out).
- **Cards:** Minimalist with no heavy shadows. Use a 1px `border_subtle` and a padding of 40px to give content significant internal margin.
- **Timelines:** For visa processes, use large `Discrete Gold` numbers in Playfair Display next to Montserrat body text, connected by a fine 1px vertical Navy line.
- **Chips/Status:** For application status (e.g., "Approved"), use low-saturation background tints with Navy text to keep the aesthetic professional and understated.
- **Icons:** Use thin-stroke (1.5pt) icons in Burgundy or Navy. Avoid filled or "bubbly" icon sets.