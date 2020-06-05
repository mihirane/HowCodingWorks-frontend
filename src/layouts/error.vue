<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404 && error.message !== null">
      {{ error.message }}
    </h1>
    <h1 v-else>
      404 Page Not Found
    </h1>
    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  layout: 'default'
}
</script>
