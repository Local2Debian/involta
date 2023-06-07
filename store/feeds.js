
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
          parser.parseURL('http://localhost:3000/proxy/mos'),
          parser.parseURL('http://localhost:3000/proxy/lenta')
        ]);

        const feeds = [...mosFeeds.items, ...lentaFeeds.items]

        commit('setFeeds', feeds)
      } catch (err) {
        console.log(err);
        commit('setFeeds', [])
      }
    }
  }
