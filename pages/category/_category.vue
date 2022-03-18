<template>
  <div>
    <Categories />
    <div class="main" v-if="categories">
      <h2>
        <span>{{ categories.attributes.name }}</span>
      </h2>
      <div>
        <p>{{ categories.attributes.description }}</p>
        <div class="category-products" v-if="products">
          <div
            v-for="(product, index) in products"
            :key="index"
            class="product-container"
          >
            <div class="product-container-blog">
              <div class="info-product">
                <div class="images-product">
                  <img
                    v-if="product.attributes.images.data"
                    :src="product.attributes.images.data[0].attributes.url"
                    alt=""
                    class="img-blog"
                  />
                </div>
                <div class="name-product">
                  <h3>{{ product.attributes.name }}</h3>
                </div>
                <div class="btn-product">
                  <NuxtLink :to="`/${product.id}`">
                    <button class="btn-product">View product</button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-category">
          <ul class="list-subcategory">
            <li
              class="list-item"
              v-for="(subcategory, index) in categories.attributes.categories
                .data"
              :key="index"
            >
              <NuxtLink :to="`/category/${subcategory.id}`" class="list-links">
                <button class="btn-links">
                  {{ subcategory.attributes.name }}
                </button>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      products: null,
      categories: null,
    }
  },
  // async asyncData({ params, $axios }) {
  //   const category = await $axios.$get(
  //     `http://localhost:1337/api/categories/${params.category}/?populate=*`
  //   )
  //   return { category }
  // },

  methods: {
    async fecthCategory() {
      const categoryId = this.$route.params.category
      const { data } = await this.$axios.get(
        `http://localhost:1337/api/categories/${categoryId}/?populate=*`
      )
      this.categories = data.data
    },
    async fetchProduct() {
      this.products = await this.$axios
        .get(`http://localhost:1337/api/products/?populate=*`)
        .then(({ data }) => data.data)
      this.products = this.products.filter((item) => {
        return item.attributes.category.data.id == this.$route.params.category
      })
    },
  },
  async mounted() {
    await this.fecthCategory()
    await this.fetchProduct()
  },
}
</script>

<style>
.main {
  width: 80%;
}
.category-products {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.product-container {
  width: 400px;
}
.product-container-blog {
  width: 100%;
  max-width: 310px;
  border: 1px solid #dddddd;
  border-radius: 5px;
}
.info-product {
  padding: 10px;
  text-align: center;
  box-sizing: border-box;
}
.images-product {
  width: 100%;
  height: 225px;
  border-radius: 5px;
  border: 1px solid #dddddd;
}
.img-blog {
  width: 100%;
  height: 100%;
}
.btn-product {
  width: 100%;
  height: 30px;
  color: #ffffff;
  background-color: #428bca;
  border: 1px solid #357ebd;
  border-radius: 5px;
}
.btn-product:hover {
  background-color: #357ebd;
}
.list-subcategory {
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.list-item {
  width: 27%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 20px;
}
.list-links {
  width: 100%;
  text-decoration: none;
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
.btn-product {
  width: 100%;
}
@media only screen and (max-width: 900px) {
  .main {
    width: 100%;
  }
  .product-container {
    justify-content: center;
  }
}
@media only screen and (max-width: 1200px) {
  .product-container-blog {
    width: 310px;
  }
}
@media only screen and (max-width: 900px) {
  .product-container-blog {
    width: 100%;
    justify-content: center;
  }
  .info-product {
    width: 310px;
  }
}
@media only screen and (max-width: 600px) {
  .product-container {
    justify-content: center;
  }
  .info-product {
    width: 310px;
  }
}
</style>
