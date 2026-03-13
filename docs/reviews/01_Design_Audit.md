# Design Review: DTUL Breakout (Brutalist Audit)

## Design Review Summary

### Assessment
The current design is a high-fidelity "Brutalist" experience, effectively communicating a raw, technical, and high-stakes mood. The use of pure red (#FF0000) against black (#000000) is bold and fitting for the "Breakout" theme. The 3D Three.js experience is well-integrated and provides a strong first impression.

### Usability & Accessibility
- **WCAG Compliance**: The red-on-black contrast (#FF0000 on #000000) has a contrast ratio of 5.25:1, which passes AA for large text but might be tight for smaller body text.
- **Navigation**: The "The Spine" vertical line is a unique navigation element, but its removal on smaller screens via `display: none` is appropriate for usability.
- **Accessibility**: The current implementation lacks ARIA landmarks and roles. The technical errors in `Experience.tsx` suggest that standard accessibility wrappers for 3D content are missing.

### Visual Design
- **Hierarchy**: Excellent. The distinction between "The Architect's" headings and technical mono readouts is clear.
- **Polish**: The glitch animations are high-quality. However, the reliance on an external Tailwind CDN and Google Fonts introduces FOUT (Flash of Unstyled Text) and external vulnerabilities.
- **Layout**: The mobile layout relies on significant `padding-top` hacks (140px) which indicate a need for more robust responsive primitives (grid/flex).

### Recommendations
1.  **Tokenize Aesthetic**: Move all CSS variables into a standard `tailwind.config.ts` to enable shadcn/ui synchronization without breaking the brutalist style.
2.  **Localize Assets**: Self-host fonts (Anton, IBM Plex Mono) and move the Tailwind script into the build pipeline.
3.  **Component Primitives**: Implement shadcn/ui `Button`, `Dialog` (for Arsenal), and `Sheet` (for mobile) to provide accessible interaction wrappers.
4.  **A11y Pass**: Add basic ARIA roles to the `Hero`, `Manifest`, and `Contact` sections.

### Evidence
- **HomeStyles.css**: Strong use of scoped variables (`.home_scope`). 
- **Experience.tsx**: Robust 3D state management, but requires TypeScript/JSX definition fixes to remove `@ts-nocheck`.
