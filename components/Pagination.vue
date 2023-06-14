
<template>
  <div class="pagination">
    <nuxt-link v-show="prevActive"
      :to="{
        name: 'news-page',
        params: {news: $route.params.news, page: 1},
        query: $route.query
      }">1</nuxt-link>
    <span v-show="prevActive" class="delimiter">...</span>
    <nuxt-link
      v-for="page in pages" :key="page.index"
      :to="page.route"
      :class="{'active': $route.params.page == page.index}">
      {{ page.index }}
    </nuxt-link>
    <span v-show="nextActive" class="delimiter">...</span>
    <nuxt-link v-show="nextActive"
      :to="{
        name: 'news-page',
        params: {news: $route.params.news, page: pagesCount},
        query: $route.query
      }">{{pagesCount}}</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('feedStore', ['totalCount', 'viewType']),

    nextActive(){
      return Number(this.$route.params.page) + 2 < (this.viewType ? Math.ceil(this.totalCount / 3) : Math.ceil(this.totalCount / 4))
    },

    pagesCount() {
      return this.viewType ? Math.ceil(this.totalCount / 3) : Math.ceil(this.totalCount / 4)
    },

    pages() {
      const pages = []
      const currentPage = this.$route.params.page
      for (let index = 1; index <= this.pagesCount; index++) {
        pages.push({
          route: {
            name: 'news-page',
            params: {news: this.$route.params.news, page: index},
            query: this.$route.query
          },
          index
        })
      }

      console.log(currentPage - this.pagesCount - 2);

      return pages.slice(currentPage - this.pagesCount - 2, currentPage + 2)
    },

    prevActive(){
      return Number(this.$route.params.page) - 1 > 1
    }
  },
}
</script>


<style lang="postcss" scoped>
.pagination{
  @apply flex justify-around space-x-5;
  a, span{
    @apply font-bold text-lg;
  }

  a.active{
    @apply text-[#0029FF]
  }
}
</style>
