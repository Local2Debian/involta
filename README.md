# involta

## Run App

```bash
# install dependencies
$ npm install

# install pm2

$ npm install -g pm2

# start redis in Docker

$ docker-compose run

# start the app
# dev start 
$ npm run dev
# deploy
$ npm run bild
$ npm run start

# run pm2 daemon
$ pm2 start ./daemon.config.js
```

## Config .env
```env
REDIS_URL - link to redis for connection default is http://localhost:6379
RSS_LINKS - links to rss .xml resources
TTL - time for cache feeds default 15 days
```

