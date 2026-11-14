#!/usr/bin/env bash
set -euo pipefail
export CONTENT_SHARED_ENABLED=1 CONTENT_SITE_ID="${CONTENT_SITE_ID:-gwd}" CONTENT_WRITER="${CONTENT_WRITER:-1}"
export CONTENT_DB_HOST=127.0.0.1 CONTENT_DB_PORT="${CONTENT_DB_PORT:-18346}" CONTENT_DB_USER=content_test CONTENT_DB_PASSWORD=isolated-content-fixture CONTENT_VERIFY_ORIGINS=0 CONTENT_WORKER_ENABLED=0
export DB_HOST=127.0.0.1 DB_PORT=18346 DB_USER=site_test DB_PASSWORD=isolated-site-fixture DB_NAME="${DB_NAME:-guezelwebdesign}"
export CORS_ORIGIN='https://panel.guezelwebdesign.com,https://www.guezelwebdesign.com,https://panel.gzlteknoloji.com,https://gzlteknoloji.com'
export TANITIO_CONTENT_API_KEY=isolated-tanitio-key GZL_CRM_CONTENT_API_KEY=isolated-crm-key CONTENT_MEDIA_ROOT=/tmp/gwd-shared-media STORAGE_DRIVER=local
export LOCAL_STORAGE_ROOT="/tmp/gwd-shared-site-media-$CONTENT_SITE_ID"
mkdir -p /tmp/gwd-shared-media "$LOCAL_STORAGE_ROOT"
export JWT_SECRET=isolated-fixture-jwt-secret-only-20261114 COOKIE_SECRET=isolated-fixture-cookie-secret NODE_ENV=production LOG_ENABLED=1 LOG_LEVEL=error
if [ "${TEST_SERVE:-0}" = 1 ]; then bun backend/test/shared-content/serve.ts; else bun test "${TEST_FILE:-backend/test/shared-content/contracts.test.ts}"; fi
