<template>
  <div class="wrap">
    <div class="item">
      <h1>{{ $props.viewType }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    viewType: {
      type: Boolean,
      required: true
    }
  }
}
</script>
