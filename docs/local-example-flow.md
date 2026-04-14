# Local Example Flow

All examples share the same local API contract:

- `GET /api/copilot/install-token` returns a short-lived demo token.
- `GET /api/copilot/config` returns widget theming and feature flags.
- `POST /api/chat` echoes a mock assistant response with citations.

This repo keeps the examples framework-specific while preserving a consistent backend story for demos and onboarding.
