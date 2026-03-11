module.exports = {
  apps: [
    {
      name: 'guezelwebdesign-admin-panel',
      cwd: '/var/www/guezelwebdesign/admin_panel',
      script: 'npm',
      args: 'start -- -p 3045 -H 127.0.0.1',
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
        PORT: '3045',
        HOST: '127.0.0.1',
      },
      out_file: '/home/orhan/.pm2/logs/guezelwebdesign-admin-panel.out.log',
      error_file: '/home/orhan/.pm2/logs/guezelwebdesign-admin-panel.err.log',
      combine_logs: true,
      time: true,
    },
  ],
};
