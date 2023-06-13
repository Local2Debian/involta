<template>
  <div class="list-view">
    <div class="item" v-for="feed in feeds">
      <div class="body">
        <img :src="feed.enclosure"/>
        <div class="content">
          <a :href="feed.link"><h1 class="title">{{ feed.title }}</h1></a>
          <h2 class="description">{{ feed.description || feed.content }}</h2>
        </div>
      </div>
      <div class="footer">
        <a class="origin" :href="('http://' || 'https://') + feed.origin">{{feed.origin}}</a>
        <span class="pub-date">{{ feed.pubDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('feedStore',['feeds'])
  },
}
</script>

<style lang="postcss" scoped>
.list-view{
  @apply flex flex-col space-y-5;
  .item{
    @apply  flex flex-col box-border content-between pt-8 px-8 pb-1 shadow;
    @layer shadow-black-0.05;
    .body{
      @apply flex flex-col space-y-5;
      @screen md{
        @apply flex-row space-x-5 space-y-0;
      }
      img{
        @apply object-cover h-24;
      }
      .content{
        @apply flex flex-col justify-between space-y-5;
        @screen md{
          @apply space-y-0;
        }
        .title{
          @apply line-clamp-2 text-[#0029FF] text-lg font-bold grow;
        }
        .description{
          @apply line-clamp-2 text-sm;
        }
      }
    }

    .footer{
      @apply flex justify-between pt-5;
      @screen md {
        @apply pt-9;
      }
      .origin{
        @apply text-sm text-[#DCDCDC] underline decoration-1 underline-offset-2;
      }
      .pub-date{
        @apply text-sm text-[#DCDCDC];
      }
    }
  }
}
</style>
