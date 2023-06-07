<template>
  <div id="search-input">
    <input
      type="text"
      v-model="searchStr" />
    <nuxt-link :to="{
      path: $route.path,
      query: { search: searchStr }
    }">
      <SearchIcon />
    </nuxt-link>
  </div>
</template>

<script>
import SearchIcon from './icons/SearchIcon.vue';

export default {
  data() {
    return {
      searchStr: ""
    };
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
