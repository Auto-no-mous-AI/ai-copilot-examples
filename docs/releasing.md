# Releasing

## CI workflow

- Workflow: CI
- Trigger: push to main, pull requests to main, or manual workflow_dispatch
- Purpose: validate the repository on GitHub-hosted runners before release

## Release workflow

- Use the `Release Bundle` workflow when you want a downloadable artifact of the example workspace. Trigger it manually or push a `v*` tag.
- Release type: artifact bundle

## Recommended release sequence

1. Run the CI workflow successfully on main.
2. Update package or artifact metadata if needed.
3. Trigger the release workflow manually from GitHub Actions or push a * tag.
4. Verify the published package, container image, or uploaded artifact.

## Notes

- CI checks out the sibling SDK repos in GitHub Actions so the local `file:` integration story is exercised on runners too.
