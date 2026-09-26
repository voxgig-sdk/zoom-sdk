# API definition provenance

## zoom-api-v2-openapi.json

- **Source:** https://raw.githubusercontent.com/zoom/api/master/openapi.v2.json
- **Publisher:** Zoom (zoom/api, the official Zoom-maintained repository)
- **Retrieved:** 2026-09-26
- **Format:** Swagger 2.0
- **Size:** 481487 bytes
- **Coverage:** 103 paths, 155 operations, 108 definitions, API version 2.0.0 — the whole Zoom REST API v2.

Unmodified vendor file. Do not hand-edit it: refresh it from the source URL
above and re-record the retrieval date.

## Replaces `zoom-meetings-only.json`

That file was hand-authored and covered two paths,
`/users/{userId}/meetings` and `/meetings/{meetingId}`, out of 103 — one
entity, `meeting`. It was removed on 2026-09-26 under the policy that an SDK
covers its API in full.
