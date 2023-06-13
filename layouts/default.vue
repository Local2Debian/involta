<template>
  <div class="wrap">
    <div class="container">
      <div class="header">
        <div class="title">
          <h1>Список новостей</h1>
          <RefreshButton/>
        </div>
        <SearchInput/>
      </div>
      <div class="delimiter"></div>
      <div class="filter">
        <div class="nav">
          <nuxt-link
            :to="{ name: 'news-page', params: { news: 'all', page: 1 }, query: $route.query}">Все</nuxt-link>
          <nuxt-link
            v-for="link in nav"
            :key="link.domain"
            :to="{ name: 'news-page', params: { news: link.href, page: 1 }, query: $route.query}">
            {{ link.content }}
          </nuxt-link>
        </div>
        <div class="type-view">
          <div id="list" @click.capture="toggleView($event.currentTarget.id)">
            <ListIcon :class="['icon', {'active': viewType}]"/>
          </div>
          <div id="table" @click="toggleView($event.currentTarget.id)">
            <TableIcon :class="['icon', {'active': !viewType}]"/>
          </div>
        </div>
      </div>
      <div class="main">
        <Nuxt/>
      </div>
      <div class="footer flex justify-center py-9">
        <div class="pagination">
          <Pagination/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RefreshButton from '~/components/RefreshButton.vue';
import SearchInput from '~/components/SearchInput.vue';
import Pagination from '~/components/Pagination.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import ListIcon from '~/components/icons/ListIcon.vue';
import TableIcon from '~/components/icons/TableIcon.vue';

export default {
  data() {
    return {
      nav: process.env.RSS_LINKS.trim().split(',').map(link => {
        const domain = link.split("/")[2].split(".").slice(-2).join(".")
        const content = domain.charAt(0).toUpperCase() + domain.slice(1)
        const href = domain.split('.')[0]
        return {
          domain,
          content,
          href
        }
      })
    }
  },

  middleware:[ "validate-route"],

  methods: {
    ...mapMutations('feedStore', ['setViewType']),
    ...mapActions('feedStore', ['loadFeeds']),

    toggleView(targetId) {
      if(targetId == 'list') this.setViewType(true);
      if(targetId == 'table') this.setViewType(false);
      window.localStorage.setItem('viewType', `${this.viewType}`)
    },
  },

  computed: {
    ...mapState('feedStore', ['viewType']),
  },

  async asyncData({ store, params, route }) {
    await store.dispatch('feedStore/loadFeeds', {...params, ...route.query})
  },

  async beforeUpdate() {
    await this.loadFeeds({...this.$route.params, ...this.$route.query})
  },

  mounted(){
    const viewType = window.localStorage.getItem('viewType')
    if(viewType){
      this.setViewType(viewType === 'true')
    } else {
      window.localStorage.setItem('viewType', `${this.viewType}`)
    }
  },

  components: { RefreshButton, SearchInput, Pagination, ListIcon, TableIcon }
}
</script>

<style lang="postcss" scoped>
.wrap{
  @apply grid grid-cols-8 h-screen box-border py-9 bg-[#E5E5E5]/[.1];

  .container{
    @apply flex flex-col h-full col-start-2 col-end-8;

    .header{
      @apply flex flex-col justify-between;
      @screen md{
        @apply flex-row;
      }

      .title{
        @apply flex justify-between h-10;

        h1{
          @apply text-2xl whitespace-nowrap font-semibold;
          @screen md{
            @apply text-3xl;
          }
        }

        #refresh{
          @screen md {
            @apply ml-7;
          }
        }
      }

      #search-input{
        @apply my-5 w-full;
        @screen md {
          @apply my-auto w-72;
        }
      }
    }

    .filter{
      @apply flex;
      @apply my-6;
      @layer fustify-between;

      .nav{
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

      .type-view{
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

    .delimiter{
      @apply bg-slate-200 w-full h-px;
      @screen md{
        @apply mt-9;
      }
    }

    .main{
      @apply flex flex-col grow;
    }
  }
}
</style>
