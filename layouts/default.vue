<template>
  <div id="wrap">
    <div id="container">
      <div id="header">
        <div id="title">
          <h1>
            Список новостей
          </h1>
          <RefreshButton/>
        </div>
        <SearchInput/>
      </div>
      <div id="delimiter"></div>
      <div id="main">
        <Nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import RefreshButton from '~/components/RefreshButton.vue';
import SearchInput from '~/components/SearchInput.vue';

export default {

  middleware:[ "validate-route"],
  components: { RefreshButton, SearchInput }
}
</script>

<style lang="postcss" scoped>
#wrap{
  @apply grid grid-cols-8 gap-y-9 h-screen py-9 bg-slate-200/[.1];

  #container{
    @apply flex flex-col h-full col-start-2 col-end-8;

    #header{
      @apply flex flex-col justify-between;
      @screen md{
        @apply flex-row;
      }

      #title{
        @apply flex justify-between h-10;

        h1{
          @apply text-2xl whitespace-nowrap font-semibold;
          @screen md{
            @apply text-3xl;
          }
        }

        #refresh{
          @screen md{
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

    #delimiter{
      @apply bg-slate-200 w-full h-px;
      @screen md{
        @apply mt-9;
      }
    }

    #main{
      @apply flex flex-col;
    }
  }
}
</style>
