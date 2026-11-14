#!/usr/bin/env bash
set -euo pipefail
export CONTENT_SHARED_ENABLED=1 CONTENT_SITE_ID="${CONTENT_SITE_ID:-gwd}" CONTENT_WRITER="${CONTENT_WRITER:-1}"
export CONTENT_DB_HOST=127.0.0.1 CONTENT_DB_PORT="${CONTENT_DB_PORT:-18346}" CONTENT_DB_USER=content_test CONTENT_DB_PASSWORD=isolated-content-fixture CONTENT_VERIFY_ORIGINS=0
export DB_HOST=127.0.0.1 DB_PORT=18346 DB_USER=site_test DB_PASSWORD=isolated-site-fixture DB_NAME="${DB_NAME:-guezelwebdesign}"
export JWT_SECRET=isolated-fixture-jwt-secret-only-20261114 COOKIE_SECRET=isolated-fixture-cookie-secret NODE_ENV=production LOG_ENABLED=1 LOG_LEVEL=error
bun test "${TEST_FILE:-backend/test/shared-content/contracts.test.ts}"
