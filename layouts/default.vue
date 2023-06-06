<template>
  <div id="wrap" class="grid grid-cols-8 gap-y-9 h-screen py-9 bg-slate-200/[.1]">
    <div id="container" class="flex flex-col h-full col-start-2 col-span-6">
      <div id="header" class="flex md:flex-row flex-col justify-berween">
        <div id="title" class="flex justif-between">
          <h1 class="md:text-3xl text-2xl whitespace-nowrap font-semibold">
            Список новостей
          </h1>
          <!--Refresh-->
        </div>
        <!--Search-->
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
</script>
