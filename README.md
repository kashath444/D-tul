# DTUL: The Architect's Breakout

## Project Overview
This project contains the D-TUL digital ecosystem, featuring a high-fidelity 3D product experience and a structured technical home page.

## Site Map

### 1. Home Page (`/`)
- **Source**: Integrated from `@dtul---technical-engineering-void`.
- **Description**: Technical "Void" theme with boot sequence, manifest, and arsenal.
- **Key Components**: `Hero`, `Manifest`, `Arsenal`, `Loading` (Boot Sequence).
- **Styles**: Scoped to `.home_scope` via `components/HomeStyles.css`.

### 2. First Contact Page (`/first-contact`)
- **Description**: 3D interactive experience (formerly linked as Product).
- **Key Components**: `Experience`, `Overlay`.
- **Access**: Via "Work" Dropdown or "Handbook First Contact" in Arsenal.

## Integration Notes
- **Namespace Isolation**: The Home Page styles are strictly scoped. Global styles in `index.html` primarily serve the Product Page but are compatible.
- **Routing**: `react-router-dom` handles navigation.
- **Security**: Strict CSP implemented in `index.html`.

## Development
- `npm run dev`: Start Vite development server.
- `npm run build`: Build for production.

## Archives
- Original v1 entry points (`App.tsx`, `index.tsx`) are archived in `src/archive/original-v1`.
