<template>
  <div>this is id {{ id }}</div>
</template>

<script>
export default {
  data: () => ({
    id: null,
  }),
  mounted() {
    this.id = this.$route.params.id
  },
}
</script>
