module.exports = {
  apps: [{
    name: 'daemon-parser',
    script: './server/daemon.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    cron_restart: '* */15 * * * *',
  }]
}
