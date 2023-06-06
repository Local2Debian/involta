<template>
  <nuxt-link
    id="refresh"
    class="flex items-center justify-center p-2.5 rounded-full shadow shadow-black-[0.05] bg-white"
    to="/all/1">
    <RefreshIcon/>
  </nuxt-link>
</template>

<script>
import RefreshIcon from '~/components/icons/RefreshIcon.vue';

export default {
  components: { RefreshIcon }
}
</script>
