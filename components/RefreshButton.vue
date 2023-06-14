<template>
  <nuxt-link
    id="refresh"
    :to="{ name: 'news-page', params: { news: 'all', page: 1 }, query: {}}">
    <RefreshIcon/>
  </nuxt-link>
</template>

<script>
import RefreshIcon from '~/components/icons/RefreshIcon.vue';

export default {
  components: { RefreshIcon }
}
</script>

<style lang="postcss" scoped>
a{
  @apply flex items-center justify-center p-2.5 rounded-full shadow bg-white;
  @layer shadow-black-0.05;
}
</style>
