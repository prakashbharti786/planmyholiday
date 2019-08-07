module.exports = {
  apps: [
    {
      name: 'easyitreturns-landing',
      script: 'npm run start',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      env: {
        NODE_ENV: 'production'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      log_file: 'logs/combined.outerr.log',
      out_file: 'logs/out.log',
      error_file: 'logs/error.log',
      log_type: 'json'
    }
  ]
}
