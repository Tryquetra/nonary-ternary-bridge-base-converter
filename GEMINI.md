# Nonary Arithmetic - Base Converter

## Project Overview
This project is an advanced, educational base converter web application built with **TypeScript** and **Bun**. It specializes in **Nonary (Base 9)**, **Balanced Ternary (Base 3)**, and **Heptavintimal (Base 27)** systems, visualizing the underlying algorithms for educational purposes.

### Core Philosophy
Unlike standard converters that use `parseInt(x, base).toString(targetBase)`, this project implements specific mathematical algorithms to demonstrate optimization:
*   **Synthetic Division (p→p±1)**: Used for adjacent bases (e.g., 9 ↔ 10).
*   **Power Mappings**: Constant time `O(d)` conversions between powers of 3 (3 ↔ 9 ↔ 27).
*   **Bridge Architecture**: Uses Base 9 as a "bridge" to convert efficiently between Base 10 and Base 3/27, avoiding large number arithmetic overhead where possible.

## Technical Stack
*   **Runtime/Bundler**: [Bun](https://bun.sh)
*   **Language**: TypeScript
*   **Frontend**: HTML5, Tailwind CSS (via CDN), Lucide Icons (via CDN)
*   **Testing**: Bun Test

## Directory Structure
```
/
├── src/
│   ├── app.ts            # Main UI controller (DOM, Events, State)
│   ├── converter.ts      # Core mathematical logic & algorithms
│   ├── translations.ts   # i18n Dictionary (EN/PT)
│   └── sw.ts             # Service Worker for PWA support
├── tests/
│   └── converter.test.ts # Unit tests for math logic
├── js/
│   └── app.js            # Compiled output (do not edit directly)
├── index.html            # Main entry point
├── package.json          # Dependency & Script definitions
└── tsconfig.json         # TypeScript configuration
```

## Key Components & logic

### 1. `src/converter.ts` (The Brain)
Contains the pure functions for base conversion.
*   **`HEPT_DIGITS`**: Defines the "Jones Alphabet" for Base 27 (skips I, J, L, O, Q, S, U, W, Y).
*   **`balancedDigits`**: Maps standard digits to balanced values (e.g., Base 3: `+, 0, -`).
*   **Algorithms**:
    *   `convertAdjacentBases`: Implements synthetic division for `p` to `p+1` or `p-1`.
    *   `convertViaNonary`: The "Bridge" logic connecting Base 10 and 3 via 9.
    *   `convertViaPowerMapping`: Bit-shifting-like logic for 3 ↔ 9 ↔ 27.

### 2. `src/app.ts` (The View)
Handles the application state and DOM updates.
*   **State**: Tracks `inputValue`, `sourceBase`, `targetBase`, `balanced` flags, and `conversionSteps`.
*   **Rendering**: Generates HTML for the step-by-step visualization (`renderSteps`, `renderComplexity`).

### 3. `src/translations.ts`
Type-safe internationalization object. Currently supports `en` (English) and `pt` (Portuguese).

## Development Workflow

### Prerequisites
*   [Bun](https://bun.sh) installed.

### Commands
*   **Install Dependencies**:
    ```bash
    bun install
    ```
*   **Start Dev Server** (Watches `src/app.ts`):
    ```bash
    bun run dev
    ```
    *Note: Open `index.html` in your browser manually or via a static file server.*
*   **Build Production**:
    ```bash
    bun run build
    ```
    (Compiles `app.ts` → `js/app.js` and `sw.ts` → `sw.js` with minification)
*   **Run Tests**:
    ```bash
    bun test
    ```

## Conventions & Style
*   **Math First**: Correctness of the algorithm takes precedence over UI flashiness.
*   **Zero Dependencies (Runtime)**: The compiled app relies only on CDNs for styles/icons; no heavy JS framework bundles.
*   **Strict Types**: Use TypeScript interfaces for all data structures (e.g., `ConversionStep`, `ComplexityResult`).
*   **Localization**: All user-facing text must go through `src/translations.ts`.

## Mathematical Details (Context for AI)
*   **Balanced Ternary**: Uses digits `-1, 0, 1` (displayed as `-, 0, +`).
*   **Symmetric Nonary**: Balanced Base 9 using digits `-4` to `+4` (Mapped to `W, X, Y, Z, 0, 1, 2, 3, 4`).
*   **Heptavintimal**: Base 27. Useful because $3^3 = 27$. It compacts 3 ternary digits into one character.
