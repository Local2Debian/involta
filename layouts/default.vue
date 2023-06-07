<template>
  <div id="wrap" class="grid grid-cols-8 gap-y-9 h-screen py-9 bg-slate-200/[.1]">
    <div id="container" class="flex flex-col h-full col-start-2 col-span-6">
      <div id="header" class="flex md:flex-row flex-col justify-between">
        <div id="title" class="flex justify-between">
          <h1 class="md:text-3xl text-2xl whitespace-nowrap font-semibold">
            Список новостей
          </h1>
          <RefreshButton class="md:ml-7" />
        </div>
        <SearchInput class="my-5 md:my-auto w-full md:w-72"/>
      </div>
      <div id="delimiter" class="bg-slate-200 w-full h-px md:mt-9"></div>
      <div id="main" class="flex flex-col">
        <client-only>
          <Nuxt/>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import RefreshButton from '~/components/RefreshButton.vue';
import SearchInput from '~/components/SearchInput.vue';

export default {
    components: { RefreshButton, SearchInput }
}
</script>
