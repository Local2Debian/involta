
<template>
  <div id="pagination">
    <nuxt-link v-show="prevActive"
      :to="{
        name: 'news-page',
        params: {news: $route.params.news, page: Number($route.params.page) - 1},
        query: $route.query
      }">Предыдущая</nuxt-link>
    <nuxt-link v-show="nextActive"
      :to="{
        name: 'news-page',
        params: {news: $route.params.news, page: Number($route.params.page) + 1},
        query: $route.query
      }">Следующая</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('feedStore', ['totalCount', 'viewType']),

    nextActive(){
      return Number(this.$route.params.page) < (this.viewType ? Math.ceil(this.totalCount / 3) : Math.ceil(this.totalCount / 4))
    },

    prevActive(){
      return Number(this.$route.params.page) !== 1
    }
    // pages() {
    //   let pages = []
    //   for (let index = 1; index < this.viewType ? Math.ceil(this.totalCount / 3) : Math.ceil(this.totalCount / 4); index++) {
    //     pages.push({
    //       name: 'news-page',
    //       params: this.$route.params,
    //       query: this.$route.query,
    //       content: index
    //     })
    //   }
    // }
  },
}
</script>
