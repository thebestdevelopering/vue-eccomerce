<template>
  <div class="container-product">
    <div
      v-for="product in products"
      :key="product.id"
      :product="product"
      class="content-product"
    >
      <div class="content-product-blog">
        <div class="images-products">
          <img
            :src="`${getMainImage(product)}`"
            alt="Изображение не найдено"
            class="img-blog"
          />
        </div>
        <div class="price-product" v-if="product.attributes">
          {{ product.attributes.price }} €
        </div>
        <div class="name-products">
          <NuxtLink
            :to="`/${product.id}`"
            class="name-product-blog"
            v-if="product.attributes"
          >
            <h3>{{ product.attributes.name }}</h3>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'products/PRODUCTS',
    }),
  },

  methods: {
    ...mapActions({
      getProducts: 'products/FETCH_PRODUCTS',
    }),
    getMainImage(products) {
      let data = products.attributes.images.data
      if (!data) {
        return ''
      }
      return products.attributes.images.data[0].attributes.url
    },
    // getMainImage(product) {
    //   this.$store.commit('products/GET_MAIN_IMAGE', product)
    // },
  },
  mounted() {
    this.getProducts()
  },
}
</script>

<style>
.container-product {
  width: 85%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
}
.content-product {
  width: 30%;
  border: 1px solid #f2f2f2;
  margin-bottom: 20px;
  border-radius: 5px;
}
.content-product-blog {
  max-height: 100%;
}
.images-products {
  width: 100%;
  height: 225px;
}
.img-blog {
  width: 100%;
  height: 100%;
}
.price-product {
  position: relative;
  float: right;
  right: 14px;
  bottom: 30px;
  color: #990000;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 3px;
}
.name-products {
  padding: 10px 0px 10px 0px;
  box-sizing: border-box;
  text-align: left;
  background-color: #f4f4f4;
}
.name-products h3 {
  font-family: 'Oswald', Impact, Arial, sans-serif;
  font-weight: 100;
  margin: 0px;
}
.name-product-blog {
  text-decoration: none;
}
.name-product-blog:hover {
  color: #428bca;
}
@media only screen and (max-width: 1200px) {
  .name-product h3 {
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    height: 30px;
  }
  .content-product {
    width: 310px;
    margin-left: 20px;
  }
}
@media only screen and (max-width: 900px) {
  .container-product {
    width: 100%;
    justify-content: center;
  }
  .content-product {
    width: 310px;
    margin-left: 20px;
  }
}
@media only screen and (max-width: 600px) {
  .container-product {
    justify-content: center;
  }
  .content-product {
    width: 310px;
    margin-left: 0px;
  }
}
</style>
