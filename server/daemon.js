const { Client } = require('redis-om')
const Parser = require('rss-parser')
const feedSchema = require('./redis/schemas/FeedSchema')
const Feed = require('../models/Feed.js')
require('dotenv').config({path: './.env'})

async function DaemonParser() {
  try {
    const parser = new Parser({
        headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    const feeds = (await Promise.all(process.env.RSS_LINKS.trim().split(',').map(link => parser.parseURL(link)))).flatMap(channel => channel.items)

    const client = await new Client().open(process.env.REDIS_URL)

    if(client.isOpen()){
      const feedRepository = client.fetchRepository(feedSchema)
      await feedRepository.createIndex()

      for (const feed of feeds) {
        if(! await feedRepository.search().where('link').eq(feed.link).return.count()){
          const newFeedEntity = await feedRepository.createAndSave(new Feed(feed).toPlainObject())
          await client.expire(`${newFeedEntity.prefix}:${newFeedEntity.entityId}`, eval(process.env.TTL))
        }
      }

      await client.close()
    }
  } catch (err) {
    console.log(err);
  }
}

DaemonParser().then(() => {
  console.log('All good')
}).catch((err) => console.error('Error: ' + err ))
