const { Entity, Schema } = require('redis-om')

class Feed extends Entity {}

const feedSchema = new Schema(Feed, {
  title: { type: 'text' },
  description: { type: 'text' },
  origin: { type: 'string' },
  link: { type: 'string' },
  pubDate: { type: 'date', sortable: true },
  enclosure: { type: 'string' },
})

module.exports = feedSchema
