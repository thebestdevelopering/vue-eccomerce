<template>
  <div>
    <Navbar />
    <div>
      <Nuxt />
    </div>
    <div><Footer /></div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>
