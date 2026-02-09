module.exports = {
  apps: [
    {
      name: 'guezelwebdesign-frontend',
      cwd: '/var/www/guezelwebdesign/frontend',

      // Bun ile Next start
      interpreter: '/home/orhan/.bun/bin/bun',
      script: 'run',
      args: 'start -- -p 3044 -H 127.0.0.1',

      exec_mode: 'fork',
      instances: 1,

      watch: false,
      autorestart: true,

      max_memory_restart: '400M',

      min_uptime: '30s',
      max_restarts: 10,
      restart_delay: 5000,

      kill_timeout: 8000,
      listen_timeout: 10000,

      env: {
        NODE_ENV: 'production',
        PORT: '3044',
        HOST: '127.0.0.1',
        NEXT_TELEMETRY_DISABLED: '1',
      },

      out_file: '/home/orhan/.pm2/logs/guezelwebdesign-frontend.out.log',
      error_file: '/home/orhan/.pm2/logs/guezelwebdesign-frontend.err.log',
      combine_logs: true,
      time: true,
    },
  ],
};
