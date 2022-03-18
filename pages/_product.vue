<template>
  <div class="container">
    <div class="content-top">
      <div class="content" v-if="product">
        <h2>{{ product.attributes.name }}</h2>
        <hr />
        <div class="contents">
          <div class="images">
            <div class="main-image">
              <img class="main-image-blog" :src="mainImage" alt="" />
            </div>
            <div
              class="other-img-blog"
              v-for="(img, index) in restImages"
              :key="index"
            >
              <div class="other-images">
                <img
                  class="other-image-blog"
                  :src="`${img.attributes.url}`"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="desc">
            <div class="product-price">{{ product.attributes.price }} €</div>
            <div class="product-info">
              <div class="product-slug">{{ product.attributes.slug }}</div>
              <div class="product-sku">{{ product.attributes.sku }}</div>
              <div class="product-hits">{{ product.attributes.hits }}</div>
              <div class="product-hits">
                {{ product.attributes.publishedAt }}
              </div>
              <div>
                <button @click="addToCart()">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="product-desc" v-if="product">
          {{ product.attributes.description }}
        </div>
      </div>
      <div class="other-products">
        <h3>Последние продукты</h3>
        <ul style="padding-left: 20px">
          <li
            v-for="product in products"
            :key="product.id"
            :product="product"
            class="links-products"
          >
            <NuxtLink :to="`/${product.id}`">{{
              product.attributes.name
            }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const products = await $axios
      .$get(`http://localhost:1337/api/products/?populate=*`)
      .then((res) => {
        return res.data.slice(-75).reverse()
      })
    return { products }
  },

  data() {
    return {
      product: null,
      productsCart: [],
    }
  },

  computed: {
    mainImage() {
      let data = this.product.attributes.images.data
      if (!data) {
        return ''
      }
      return this.product.attributes.images.data[0].attributes.url
    },

    restImages() {
      let data = this.product.attributes.images.data
      if (!data) {
        return ''
      }
      return this.product.attributes.images.data.slice(1)
    },

    cart() {
      return this.$store.state.cart.data
    },
  },

  methods: {
    async fetchProduct() {
      const productId = this.$route.params.product
      this.product = await this.$axios
        .get(`http://localhost:1337/api/products/${productId}/?populate=*`)
        .then(({ data }) => data.data)
    },

    async addToCart() {
      const product = {
        quantity: 1,
        id: this.product.id,
        name: this.product.attributes.name,
        price: this.product.attributes.price,
      }

      if (this.product.attributes.images.data) {
        product.image = this.product.attributes.images.data[0].attributes.url
      }

      // Mutate the store state
      this.$store.commit('cart/add', product)
    },
  },

  async mounted() {
    await this.fetchProduct()
  },
}
</script>

<style>
.container {
  width: 80%;
  margin: auto;
}
.content-top {
  width: 100%;
  display: flex;
}
.content {
  width: 74%;
}
.contents {
  display: flex;
}
.images {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  height: 350px;
}
.main-image {
  width: 100%;
  height: 265px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 4px;
}
.main-image-blog {
  width: 100%;
  height: 100%;
}
.other-img-blog {
  display: flex;
  justify-content: center;
  width: 25%;
  height: 75px;
  border: 1px solid #dddddd;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 4px;
}

.other-image-blog {
  width: 100%;
  height: 100%;
}
.desc {
  width: 50%;
  margin-left: 10px;
}
.product-price {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 58px;
  background-color: #f2f2f2;
  color: darkred;
  font-family: sans-serif;
  font-size: 25px;
  border: 2px solid #e9e8e8;
  border-radius: 4px;
  box-sizing: border-box;
}
.product-info {
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  width: 100%;
  background-color: #f2f2f2;
  color: rgb(8, 0, 0);
  font-family: sans-serif;
  font-size: 14px;
  border: 2px solid #e9e8e8;
  border-radius: 4px;
  margin-bottom: 10px;
}
.product-info div {
  margin-bottom: 7px;
}
.product-slug {
  padding-bottom: 5px;
  border-bottom: 1px solid #d6d5d5;
}
.links-products {
  list-style-type: decimal;
}
.product-desc {
  width: 80%;
}
.other-products {
  margin-left: 20px;
}
.other-products a {
  color: #428bca;
  text-decoration: none;
}
@media only screen and (max-width: 1200px) {
  .content {
    flex-wrap: wrap;
    width: 800px;
  }
  .content-top {
    flex-wrap: wrap;
  }
  .images {
    width: 390px;
  }
  .desc {
    width: 390px;
  }
  .main-image {
    width: 390px;
  }
  .product-price {
    width: 390px;
  }
}
@media only screen and (max-width: 900px) {
  .contents {
    flex-wrap: wrap;
    justify-content: center;
  }
  .images {
    margin-bottom: 30px;
  }
  .desc {
    margin-left: 0px;
  }
}
@media only screen and (max-width: 400px) {
  .images {
    width: 320px;
  }
  .desc {
    width: 320px;
  }
  .main-image {
    width: 320px;
  }
  .product-price {
    width: 320px;
  }
}
</style>
