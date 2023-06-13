const app = require('express')()
const { Client } = require('redis-om')
const feedSchema = require('./redis/schemas/FeedSchema')

app.get('/search', async (req, res, error) => {
  try{
    const feedsCount = req.query.feedsOnPageCount
    const currentPage = req.query.currentPage
    const feedsOrigin = req.query.newsOrigin !== 'all' ? process.env.RSS_LINKS.trim().split(',').find(link => link.match(req.query.newsOrigin)).split('/')[2] : null
    const searchInFeed = req.query.searchInFeed

    const client = await new Client().open('redis://localhost:6379')

    if(client.isOpen()){
      const feedRepository = client.fetchRepository(feedSchema)
      const query = feedRepository.search()

      if(feedsOrigin && searchInFeed)
        query.where('origin').eq(feedsOrigin).and('title').matches(searchInFeed).or('description').matches(searchInFeed)

      if(searchInFeed)
        query.where('title').matches(searchInFeed).or('description').matches(searchInFeed)

      if(feedsOrigin)
        query.where('origin').eq(feedsOrigin)

      const pageFeeds = await query.sortDescending('pubDate').return.page((currentPage - 1) * feedsCount, feedsCount)
      const totalCount = await query.return.count()
      res.json({
        feeds: pageFeeds,
        totalCount: totalCount
      })
    }
    await client.close()
  }catch(err){
    console.log('Error:' + err);
  }
})

module.exports = app
