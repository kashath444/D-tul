# Feature Spec: PAI Technical Alignment (Breakout Project)

## Architectural Analysis

### Problem Statement
The `dtul_-the-architect's-breakout` project current leverages an ad-hoc React/Vite stack with external CDN dependencies and `npm` package management. This diverges from the PAI standard of Bun-native, local-first, shadcn/ui-driven development. To enable efficient long-term development, we must align the foundation.

### Proposed Solution
We will perform a non-breaking "Technical Pivot" on the existing codebase to:
1.  **Migrate to Bun**: Finalize the transition from `npm` to `bun` for deterministic performance.
2.  **Localize Dependencies**: Move away from CDN-based imports in `index.html` to local `node_modules` and `bun` bundles.
3.  **Initialize shadcn/ui**: Establish the standard component architecture while preserving the project's unique "Brutalist" aesthetic.

### Design Details
- **Dependency Management**: Remove `package-lock.json`, install via `bun install`, and update `importmap` logic in `index.html` to standard module resolution.
- **Styling**: Replace the CDN Tailwind script with a local Tailwind CSS v3/v4 setup integrated into the Vite pipeline.
- **Components**: Create a `/components/ui` directory for shadcn/ui primitives.

### Trade-offs & Decisions
- **Optimizing for**: Developer velocity and system consistency with the PAI ecosystem.
- **Sacrificing**: The "no-install" simplicity of the current CDN approach for a more robust, auditable local stack.
- **Decision**: We will keep the Three.js and GSAP logic intact as they are central to the 3D experience, but move them to local imports.

### Implementation Plan
1.  **Phase 1: Bun Sync**: Delete `node_modules` and `package-lock.json`. Run `bun install`.
2.  **Phase 2: Tailwind Localization**: Install Tailwind CSS, PostCSS, and Autoprefixer. Setup `tailwind.config.ts`.
3.  **Phase 3: shadcn/ui Setup**: Initialize shadcn/ui via `bun x shadcn-ui@latest init`.
4.  **Phase 4: Entry Point Refactor**: Update `index.html` and `vite.config.ts` to support modern module resolution without the CDN import map.

### Testing Strategy
- **Build Validation**: Run `bun run build` to ensure the project bundles correctly.
- **Runtime Check**: Use the Browser Agent to verify that the 3D "Experience" and "Hero" animations still function without regression.

### Risk Assessment
- **Import Conflicts**: React 19 might have slight conflicts with older R3F versions if not pinned correctly.
- **Animation regressions**: GSAP timelines might be sensitive to the change in React execution context if `StrictMode` behavior changes.
- **Mitigation**: Perform a visual audit after each phase using the Browser Agent.
