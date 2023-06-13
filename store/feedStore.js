import Feed from '~/models/Feed'
import axios from 'axios'

  export const state = () => ({
    feeds: [],
    viewType: true,
    totalCount: null
  })

  export const mutations = {
    setFeeds(state, feeds) {
      state.feeds = feeds
    },

    setViewType(state, value){
      state.viewType = value
    },

    setTotalCount(state, value){
      state.totalCount = value
    }
  }

  export const actions = {
    async loadFeeds({ commit, state }, {news, page, search}) {
      try{
        const responseData = (await axios.get('http://localhost:3000/rss/search', {
          params: {
            feedsOnPageCount: state.viewType ? 3 : 4,
            newsOrigin: news,
            currentPage: page,
            searchInFeed: search
          }
        })).data
        const feeds = responseData.feeds.map(data => new Feed(data, true).toPlainObject())
        commit('setFeeds', feeds)
        commit('setTotalCount', responseData.totalCount)
      }catch (err) {
        console.log(err)
        commit('setFeeds', [])
      }
    },

    toggleViewType({ commit }, targetId) {
      if(targetId == 'list') commit('setViewType', true);
      if(targetId == 'table') commit('setViewType', false);
    }
  }
