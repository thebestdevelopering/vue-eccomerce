<template>
  <p>
    {{ message }}
  </p>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      message: '',
    }
  },
  async mounted() {
    const res = await fetch('http://localhost:1337/api/users', {
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    const content = await res.json()
    console.log(content)
  },
})
</script>
