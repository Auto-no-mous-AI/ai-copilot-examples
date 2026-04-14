# AI Copilot Examples
[![CI](https://github.com/Auto-no-mous-AI/ai-copilot-examples/actions/workflows/ci.yml/badge.svg)](https://github.com/Auto-no-mous-AI/ai-copilot-examples/actions/workflows/ci.yml) [![Release](https://github.com/Auto-no-mous-AI/ai-copilot-examples/actions/workflows/release.yml/badge.svg)](https://github.com/Auto-no-mous-AI/ai-copilot-examples/actions/workflows/release.yml)



Reference host applications for embedding the AI Copilot widget into vanilla JavaScript, React, and Angular apps.

## Layout

- `shared-mocks/`: local HTTP mock for token minting, embed config, and chat stubs.
- `vanilla-example/`: Vite-powered vanilla JavaScript host app.
- `react-example/`: React host app using `@auto-no-mous/copilot-react`.
- `angular-example/`: Angular host app using `@auto-no-mous/copilot-angular`.

## Quick Start

1. Run the one-command bootstrap:
   ```bash
   npm run bootstrap:local
   ```
2. Start the shared mock API:
   ```bash
   npm run mock:api
   ```
3. Open one example and run its dev server:
   ```bash
   cd vanilla-example && npm run dev
   cd react-example && npm run dev
   cd angular-example && npm start
   ```

The mock API defaults to `http://127.0.0.1:4010`.

## What The Bootstrap Does

- installs and builds the sibling SDK repos
- generates a local secrets manifest in the sibling infra repo
- installs all example app dependencies
- leaves the workspace ready for local widget testing

## CI And Release

- Manual CI trigger is available through the CI workflow in GitHub Actions.
- Release instructions live in [docs/releasing.md](./docs/releasing.md).

