
  export const state = () => ({
    feeds: []
  })

  export const mutations = {
    setFeeds(state, feeds) {
      state.feeds = feeds
    }
  }

  export const actions = {
    async loadFeeds({ commit }) {
      const Parser = require('rss-parser')
      const parser = new Parser()

      try {
        let [mosFeeds, lentaFeeds] = await Promise.all([
          parser.parseURL('https://www.mos.ru/rss'),//.then(async response => await parser.parseString(await response.text())),
          parser.parseURL('https://lenta.ru/rss/news')//.then(async response => await parser.parseString(await response.text()))
        ]);

        const feeds = [...mosFeeds.items, ...lentaFeeds.items]

        commit('setFeeds', feeds)
      } catch (err) {
        console.log(err);
        commit('setFeeds', [])
      }
    }
  }
