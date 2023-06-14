<template>
  <div id="search-input">
    <input
      type="text"
      v-model="searchStr"
      @input="handleInput" />
    <nuxt-link to="#">
      <SearchIcon />
    </nuxt-link>
  </div>
</template>

<script>
import SearchIcon from './icons/SearchIcon.vue';

export default {
  data() {
    return {
      searchStr: this.$route.query.search || '',
      timeoutId: null
    };
  },

  watch: {
    '$route.query.search': function(newVal) {
      this.searchStr = newVal || '';
    }
  },

  methods: {
    handleInput() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.$router.push({
          name: 'news-page',
          params: {news: this.$route.params.news, page: 1},
          query: { search: this.searchStr }
        });
      }, 500);
    }
  },

  components: { SearchIcon }
}
</script>

<style lang="postcss" scoped>
#search-input{
 @apply flex items-center h-10 py-2.5 pr-2.5 pl-0.5 rounded shadow bg-white;
 @layer shadow-black-0.05;

 input{
  @apply w-full border-none outline-none p-0.5 mr-2.5;
 }
}
</style>
