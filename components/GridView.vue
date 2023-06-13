
<template>
  <div class="grid-view">
    <div class="item" v-for="feed in feeds">
      <h1 class="title">{{ feed.title }}</h1>
      <div class="body">
        <h2 class="description">{{ feed.description || feed.content }}</h2>
        <a class="detail" :href="feed.link">Подробнее</a>
        <div class="footer">
          <a class="origin" :href="('http://' || 'https://') + feed.origin">{{feed.origin}}</a>
          <span class="pub-date">{{ feed.pubDate }}</span>
        </div>
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
.grid-view{
  @apply flex flex-col gap-5;
  @screen md {
    @apply grid grid-cols-2;
  }
  .item{
    @apply flex flex-col box-border content-between pt-8 px-8 pb-5 shadow;
    @layer shadow-black-0.05;
    .title{
      @apply mb-5 grow line-clamp-2 text-[#0029FF] text-lg font-bold;
    }
    .body{
      @apply flex flex-col space-y-5;
      .description{
        @apply line-clamp-2 text-sm;
      }
      .detail{
        @apply text-sm text-[#0029FF] underline decoration-1 underline-offset-4;
      }
      .footer{
        @apply flex justify-between;
        .origin{
          @apply text-sm text-[#DCDCDC] underline decoration-1 underline-offset-2;
        }
        .pub-date{
          @apply text-sm text-[#DCDCDC];
        }
      }
    }
  }
}
</style>
