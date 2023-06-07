<template>
  <div id="container-rss" class="flex flex-col">
    <div id="filter" class="flex fustify-between my-6">
      <div id="nav" class="flex gap-x-4">
        <nuxt-link :class="['text-sm', 'font-bold', {'text-[#0029FF]': $nuxt.$route.params.news != 'all'}]" to="/all/1">Все</nuxt-link>
        <nuxt-link :class="['text-sm', 'font-bold', {'text-[#0029FF]': $nuxt.$route.params.news != 'mos'}]" to="/mos/1">Mos.ru</nuxt-link>
        <nuxt-link :class="['text-sm', 'font-bold', {'text-[#0029FF]': $nuxt.$route.params.news != 'lenta'}]" to="/lenta/1">Lenta.ru</nuxt-link>
      </div>
      <div id="type-view" class="flex flex-row grow justify-end gap-x-2.5">
        <div id="list" @click.capture="toggleView($event.currentTarget.id)">
          <ListIcon :class="['fill-[#C4C4C4]', {'fill-blue': viewTypeToggle}]"/>
        </div>
        <div id="table" @click="toggleView($event.currentTarget.id)">
          <TableIcon :class="['fill-[#C4C4C4]', {'fill-blue': !viewTypeToggle}]"/>
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

  // async asyncData({ $axios }) {
  //   await $axios.get('http://localhost:3000/parse')
  // },

  mounted() {
    const viewType = window.localStorage.getItem('viewType')
    if(viewType){
      this.viewTypeToggle = viewType === 'true' ? true : false
    } else {
      window.localStorage.setItem('viewType', `${this.viewTypeToggle}`)
    }
  },

  components: { ListIcon, TableIcon, DataView }
}
</script>


<style scoped>
.fill-blue {
  fill: #0029FF !important;
}
</style>
