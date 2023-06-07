export default async ({ store }) => {
  const Parser = require('rss-parser')
  const parser = new Parser()

  try {
    let [mosFeeds, lentaFeeds] = await Promise.all([
      parser.parseURL('http://localhost:3000/proxy/mos'),//.then(async response => await parser.parseString(await response.text())),
      parser.parseURL('http://localhost:3000/proxy/lenta')//.then(async response => await parser.parseString(await response.text()))
    ]);

    const feeds = [...mosFeeds.items, ...lentaFeeds.items]

    store.commit('feeds/setFeeds', feeds)
  } catch (err) {
    console.log(err);
    store.commit('feeds/setFeeds', [])
  }
}
