<template>
  <div class="main">
    <ul class="list-categories">
      <!-- <li>
        <NuxtLink :to="`/category/categories`">Все категории</NuxtLink>
      </li> -->
      <li
        v-for="category in categories"
        :key="category.id"
        :category="category"
      >
        <NuxtLink
          :to="`/category/${category.id}`"
          class="links"
          v-if="category.attributes.parent.data === null"
          >{{ category.attributes.name }}</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: [],
    }
  },
  methods: {
    async fetchCategories() {
      this.categories = await this.$axios
        .get('http://localhost:1337/api/categories/?populate=*')
        .then(({ data }) => data.data)
    },
    // parentCategory(product) {
    //   let data = product.attributes.categories.data
    //   if(!data) {
    //     return product
    //   }
    //   return product.attributes.categories.data
    // }
  },

  async mounted() {
    await this.fetchCategories()
  },
}
</script>
<style>
.main {
  margin: auto;
  width: 80%;
}
.list-categories {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  height: 30px;
  padding-right: 40px;
}
.links {
  text-decoration: none;
}
.all-categories {
  display: flex;
  flex-wrap: wrap;
}
.list-all-categories {
  width: 27%;
}
.btn-links {
  width: 100%;
  height: 40px;
  background-color: #f2f2f2;
  border: 1px solid #d8d7d7;
  border-radius: 4px;
  color: #0a0101;
  font-weight: 600;
  font-size: 18px;
}
.btn-links:hover {
  background-color: rgb(252, 252, 252);
  cursor: pointer;
}

@media only screen and (max-width: 900px) {
  .main {
    width: 100%;
    text-align: center;
  }
}
</style>
