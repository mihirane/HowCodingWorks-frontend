<template>
  <div class="ma-0 pa-0">
    <h1 class="mb-4">
      How Coding Works
    </h1>
    <p>How Coding Works is a blogging website about technology and computer programming.</p>
    <br><br><br>
    <nuxt-link to="/AngularJs">
      Angular Js
    </nuxt-link>
    <nuxt-link to="/Firebase">
      Firebase
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'default',
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>
