<template>
  <div id="container-rss">
    <div id="filter">
      <div id="nav">
        <nuxt-link to="/all/1">Все</nuxt-link>
        <nuxt-link to="/mos/1">Mos.ru</nuxt-link>
        <nuxt-link to="/lenta/1">Lenta.ru</nuxt-link>
      </div>
      <div id="type-view">
        <div id="list" @click.capture="toggleView($event.currentTarget.id)">
          <ListIcon :class="['icon', {'active': viewTypeToggle}]"/>
        </div>
        <div id="table" @click="toggleView($event.currentTarget.id)">
          <TableIcon :class="['icon', {'active': !viewTypeToggle}]"/>
        </div>
      </div>
    </div>
    <div id="news">
      <DataView :viewType="getViewType"/>
    </div>
    <div id="pagination">

    </div>
  </div>
</template>

<script>
import DataView from '~/components/DataView.vue';
import ListIcon from '~/components/icons/ListIcon.vue';
import TableIcon from '~/components/icons/TableIcon.vue';
import { mapState } from 'vuex'

export default {
  data() {
    return {
      viewTypeToggle: true,
    };
  },

  methods: {
    toggleView(targetId) {
      if(targetId == 'list') this.viewTypeToggle = true;
      if(targetId == 'table') this.viewTypeToggle = false;

      window.localStorage.setItem('viewType', `${this.viewTypeToggle}`)
    }
  },

  computed: {
    getViewType() {
      return this.viewTypeToggle
    },

    ...mapState(['feeds'])
  },

  async asyncData({ store  }) {
    await store.dispatch('feeds/loadFeeds')
  },

  beforeMount() {
    const viewType = window.localStorage.getItem('viewType')
    if(viewType){
      this.viewTypeToggle = viewType === 'true' ? true : false
    } else {
      window.localStorage.setItem('viewType', `${this.viewTypeToggle}`)
    }
  },

  components: { ListIcon, TableIcon, DataView }
  //.fill-blue {
//  fill: #0029FF !important;
//}
}
</script>


<style lang="postcss" scoped>
#container-rss{
  @apply flex;
  @apply flex-col;

  #filter{
    @apply flex;
    @apply my-6;
    @layer fustify-between;

    #nav{
      @apply flex;
      @apply gap-x-4;

      a{
        @apply text-sm;
        @apply font-bold;
        @apply text-[#0029FF];
      }

      a.nuxt-link-exact-active{
        @apply text-black;
      }
    }

    #type-view{
      @apply flex;
      @layer flex-row;
      @apply grow;
      @apply justify-end;
      @apply gap-x-2.5;
      .icon{
        @apply fill-[#C4C4C4];
      }
      .icon.active{
        @apply fill-[#0029FF] !important;
      }
    }
  }
}
</style>
