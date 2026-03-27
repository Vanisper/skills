# Tags And Release Markers

For release tags:

- Prefer annotated tags for formal releases.
- Lightweight tags can be used for temporary markers, but they should not be the default style for release tags.
- Push specific tags intentionally instead of pushing all tags by default.
- Do not delete or move published tags unless the user explicitly asks.

## Useful Commands

- `git tag -a v1.2.3 -m "v1.2.3"`
- `git push origin v1.2.3`
- `git tag --list`

## Release Mindset

- Treat published tags as stable release markers.
- Be explicit about which version tag is being created or pushed.
- If the repository has an existing release process, follow that instead of inventing a new one.
