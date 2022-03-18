<template>
  <div>
    <div>
      <Navbar />
    </div>

    <div class="home-main">
      <div class="container-products">
        <div
          v-for="product in getProducts"
          :key="product.id"
          :product="product"
          class="content-products"
        >
          <div class="content-products-blog">
            <div class="images-product">
              <img
                :src="`${getMainImage(product)}`"
                alt="Изображение не найдено"
                class="img-blog"
              />
            </div>
            <div class="price-product">{{ product.attributes.price }} €</div>
            <div class="name-product">
              <h3>{{ product.attributes.name }}</h3>
            </div>
            <div>
              <NuxtLink :to="`/${product.id}`">
                <button class="btn-product">View product</button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="ad">
        <div class="info-ad">
          <p>Obchod je z technicky dôvodov uzavretý</p>
          <p>v Stredu, Štvrtok a Piatok.</p>
        </div>
      </div>
      <div class="news">
        <h1>Posledné novinky</h1>
      </div>
    </div>
    <div>
      <Footer />
    </div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      token: null,
    }
  },

  methods: {
    async fetchProducts() {
      this.products = await this.$axios
        .get(`http://localhost:1337/api/products/?populate=*`)
        .then(({ data }) => data.data)
    },
    getMainImage(product) {
      let data = product.attributes.images.data
      if (!data) {
        return ''
      }
      return product.attributes.images.data[0].attributes.url
    },
    async getToken() {
      this.token = await JSON.parse(localStorage.getItem('token'))
      console.log(token)
    },
  },
  computed: {
    getProducts() {
      return this.products.slice(-3).reverse()
    },
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>

<style>
.home-main {
  width: 85%;
  margin: auto;
}
.container-products {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 30px;
}
.content-products {
  width: 30%;
  height: 310px;
  border: 1px solid #f2f2f2;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
}
.content-products-blog {
  max-height: 100%;
}
.images-product {
  width: 100%;
  height: 225px;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
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
  background-color: #357ebd;
  color: #990000;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 3px;
}
.name-product {
  margin: 20px 0px 10px 0px;
  text-align: center;
}
.name-product h3 {
  font-family: 'Oswald', Impact, Arial, sans-serif;
  font-weight: 100;
  margin-bottom: 0px;
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
.ad {
  margin: auto;
  width: 100%;
  background-color: #d9edf7;
  border-color: #bce8f1;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}
.info-ad {
  height: 45px;
  padding: 15px;
}
.ad p {
  color: #31708f;
  font-family: sans-serif;
  font-size: 14px;
  margin: 0 0 10px 0;
}
.news {
  margin-top: 50px;
}

.news h1 {
  font-family: sans-serif;
  color: #333333;
  padding-bottom: 15px;
  border-bottom: 1px solid #f2f2f2;
}
@media only screen and (max-width: 1200px) {
  .name-product h3 {
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    height: 30px;
  }
  .content-products {
    width: 310px;
    margin-left: 0px;
  }
}
@media only screen and (max-width: 900px) {
  .home {
    width: 100%;
  }
  .container-products {
    justify-content: space-between;
  }
  .content-products {
    width: 310px;
  }
}
@media only screen and (max-width: 600px) {
  .container-products {
    justify-content: center;
  }
  .content-products {
    width: 310px;
    margin-left: 0px;
  }
}
</style>
