<template>
  <div class="container-rss">
    <div class="news">
      <GridView v-show="!viewType"/>
      <ListView v-show="viewType"/>
    </div>
  </div>
</template>

<script>
import GridView from '~/components/GridView.vue';
import ListView from '~/components/ListView.vue';
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('feedStore', ['viewType']),
  },

  methods: {
    ...mapActions('feedStore', ['loadFeeds']),
  },

  async asyncData({ store, params, route }) {
    await store.dispatch('feedStore/loadFeeds', {...params, ...route.query})
  },


  components: { GridView, ListView }
}
</script>


<style lang="postcss" scoped>
.container-rss{
  @apply flex flex-col grow;

  .news{
    @apply flex flex-col h-full;
  }
}
</style>
