import { afterEach, beforeEach, describe, expect, test } from 'bun:test';

import { resolveBaseUrl } from './apiBase';

const ENV_KEYS = [
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_API_BASE_URL',
  'NEXT_PUBLIC_API_ORIGIN',
  'NEXT_PUBLIC_API_BASE',
] as const;

function clearApiEnv() {
  for (const key of ENV_KEYS) {
    delete process.env[key];
  }
}

describe('resolveBaseUrl', () => {
  beforeEach(clearApiEnv);
  afterEach(clearApiEnv);

  test('prefers full API URL and appends v1 for /api', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com/api';
    expect(resolveBaseUrl()).toBe('https://api.example.com/api/v1');
  });

  test('keeps explicit API version', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com/api/v2/';
    expect(resolveBaseUrl()).toBe('https://api.example.com/api/v2');
  });

  test('combines origin and base path', () => {
    process.env.NEXT_PUBLIC_API_ORIGIN = 'https://api.example.com/';
    process.env.NEXT_PUBLIC_API_BASE = 'api';
    expect(resolveBaseUrl()).toBe('https://api.example.com/api/v1');
  });

  test('uses 8044 dev fallback when env is absent', () => {
    expect(resolveBaseUrl()).toBe('http://localhost:8044');
  });
});

