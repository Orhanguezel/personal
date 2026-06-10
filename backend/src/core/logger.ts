import type { FastifyServerOptions } from 'fastify';

function isProd() {
  return process.env.NODE_ENV === 'production';
}

export function buildLoggerConfig(): FastifyServerOptions['logger'] {
  if (process.env.LOG_ENABLED === '0') return false;

  return {
    level: process.env.LOG_LEVEL || (isProd() ? 'info' : 'debug'),
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.headers["set-cookie"]',
        'res.headers["set-cookie"]',
      ],
      censor: '[redacted]',
    },
    formatters: {
      level(label: string) {
        return { level: label };
      },
      bindings(bindings) {
        return isProd()
          ? {}
          : {
              pid: bindings.pid,
              hostname: bindings.hostname,
            };
      },
    },
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          host: req.headers?.host,
          remoteAddress: req.ip,
          remotePort: req.socket?.remotePort,
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
      err(error) {
        return {
          type: error.name,
          message: error.message,
          stack: isProd() ? '' : (error.stack ?? ''),
          code: 'code' in error ? error.code : undefined,
        };
      },
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  };
}

export function writeStartupFailure(error: unknown) {
  const err = error instanceof Error ? error : new Error(String(error));
  process.stderr.write(
    `${JSON.stringify({
      level: 'error',
      time: new Date().toISOString(),
      msg: 'server_failed',
      err: {
        type: err.name,
        message: err.message,
        stack: isProd() ? undefined : err.stack,
      },
    })}\n`,
  );
}
