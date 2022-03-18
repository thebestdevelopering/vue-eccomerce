<template>
  <div class="cart-container">
    <div class="cart-content">
      <h1>Cart</h1>
      <div v-for="(product, index) in cart" :key="index" class="cart-products">
        <div class="cart-images">
          <img :src="product.image" alt="" class="cart-img" />
        </div>
        <div class="cart-info">
          <div class="cart-name">
            <h3 class="cart-name-h3">{{ product.name }}</h3>
            <p class="cart-quantity-text">Quantity</p>
            <div class="cart-quantity-price">
              <button
                class="cart-quantity-btn"
                @click="decrementQuantity(product.id)"
              >
                -
              </button>
              <span class="cart-quantity"> {{ product.quantity }}</span>
              <button
                class="cart-quantity-btn"
                @click="incrementQuantity(product.id)"
              >
                +
              </button>
              <span class="cart-total-price"
                >{{ +product.quantity * +product.price }} €</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="cart-total">
        <span class="cart-total-text">Total</span>
        <span class="cart-total-text">{{ totalPrice }} €</span>
      </div>
    </div>
    <div class="cart-contacts">
      <h1>Registration</h1>
      <div class="cart-contacts-info">
        <div class="cart-shopper-name">
          <p class="cart-contacts-text">Fullname</p>
          <input
            class="cart-contacts-input"
            type="text"
            v-model="clients_fullname"
            :class="{
              'in-valid': errors.clients_fullname,
            }"
          />
        </div>
        <div class="cart-address">
          <p class="cart-contacts-text">Address</p>
          <input
            class="cart-contacts-input"
            type="text"
            v-model="address"
            :class="{
              'in-valid': errors.address,
            }"
          />
        </div>
        <div class="cart-phone-number">
          <p class="cart-contacts-text">Phone number</p>
          <input
            class="cart-contacts-input"
            type="number"
            v-model="phone_number"
            :class="{
              'in-valid': errors.phone_number,
            }"
          />
        </div>
        <div v-if="!authUser">
          <p>{{ message }}</p>
          <button class="cart-order-message">
            <NuxtLink to="/signin">Log in</NuxtLink>
          </button>
        </div>
        <div v-else>
          <button class="cart-order-btn" @click="addOrder">Add order</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _productVue from './_product.vue'
import axios from 'axios'
export default {
  data() {
    return {
      products: null,
      message: 'You are not authorized',
      authUser: null,
      errors: {
        address: '',
        clients_fullname: '',
        phone_number: '',
      },
      address: null,
      clients_fullname: null,
      phone_number: null,
    }
  },

  computed: {
    totalPrice() {
      return this.$store.state.cart.data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    },

    cart() {
      const data = this.$store.state.cart.data

      return data
    },
  },

  watch: {
    address(val) {
      if (this.errors.address) {
        delete this.errors.address
      }
    },
    clients_fullname(val) {
      if (this.errors.clients_fullname) {
        delete this.errors.clients_fullname
      }
    },
    phone_number(val) {
      if (this.errors.phone_number) {
        delete this.errors.phone_number
      }
    },
    carts(newValue) {
      localStorage.setItem('products', JSON.stringify(newValue))
    },
  },
  methods: {
    incrementQuantity(id) {
      this.$store.commit('cart/increment', id)
    },
    decrementQuantity(id) {
      this.$store.commit('cart/decrement', id)
    },
    validation() {
      let error = false
      if (!this.address) {
        error = true
        this.errors['address'] = 'Введите адрес'
      }
      if (!this.clients_fullname) {
        error = true
        this.errors['clients_fullname'] = 'Введите имя'
      }
      if (!this.phone_number) {
        error = true
        this.errors['phone_number'] = 'Введите номер'
      }
      return error
    },

    async addOrder() {
      if (this.validation()) {
        return
      }
      this.carts = this.carts.map((item) => ({
        ...item,
      }))

      const { data } = await axios.post('http://localhost:1337/api/orders/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          quantity: this.carts.reduce((a, b) => a + b.quantity, 0),
          user_id: 1,
          total_price: this.totalPrice,
          clients_fullname: this.clients_fullname,
          address: this.address,
          phone_number: this.phone_number,
          content: this.carts.map((item) => {
            return {
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            }
          }),
        },
      })
    },

    async fetchCartProduct() {
      this.carts = await JSON.parse(localStorage.getItem('products'))
    },

    async fetchToken() {
      this.authUser = await localStorage.getItem('token')
    },
  },

  async mounted() {
    await this.fetchCartProduct()
    await this.fetchToken()
  },
}
</script>
<style>
.in-valid {
  border: 1px solid red;
}

.cart-container {
  width: 85%;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.cart-content {
  width: 600px;
}
.cart-contacts {
  width: 500px;
}
.cart-contacts-info {
  background: #f5f5fe;
  padding: 30px;
  border-radius: 15px;
}
.cart-contacts-text {
  width: 300px;
  margin-bottom: 5px;
}
.cart-contacts-input {
  height: 30px;
  width: 300px;
  border-radius: 5px;
}

.cart-order-btn {
  margin-top: 30px;
  width: 200px;
  height: 40px;
  color: #ffffff;
  background-color: #428bca;
  border: 1px solid #357ebd;
  border-radius: 5px;
  cursor: pointer;
}
.cart-order-btn:hover {
  background-color: #357ebd;
}
.cart-order-message {
  width: 200px;
  height: 40px;
  background-color: #428bca;
  border: 1px solid #357ebd;
  border-radius: 5px;
  cursor: pointer;
}
.cart-order-message a {
  text-decoration: none;
  color: #ffffff;
}
.cart-order-message:hover {
  background-color: #357ebd;
}

.cart-products {
  display: flex;
  width: 600px;
  height: 250px;
  margin-bottom: 20px;
  border: 1px solid #f2f2f2;
  border-radius: 15px;
}
.cart-images {
  width: 50%;
  height: 200px;
  margin-top: 25px;
  margin-left: 25px;
}
.cart-img {
  width: 100%;
  height: 100%;
}
.cart-info {
  width: 100%;
}
.cart-name {
  margin-left: 30px;
}
.cart-name-h3 {
  font-size: 20px;
  font-family: 'Circe bold';
}
.cart-quantity-text {
  margin-top: 0;
  font-size: 18px;
  font-family: 'Circe bold';
  font-weight: 400;
}
.cart-quantity-btn {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background-color: inherit;
  border-radius: 5px;
  border: 1px solid #f2f2f2;
  cursor: pointer;
}
.cart-quantity-btn:hover {
  background-color: #f5f5f5;
}
.cart-quantity {
  margin-right: 10px;
  font-size: 20px;
  font-weight: 700;
}
.cart-total-price {
  font-size: 20px;
  font-weight: 700;
  margin-left: 40%;
}
.cart-total {
  display: flex;
  justify-content: space-between;
  margin: 30px 30px 30px 0px;
}
.cart-total-text {
  font-size: 26px;
  font-weight: 600;
}
@media only screen and (max-width: 1320px) {
  .cart-content {
    width: 550px;
  }
  .cart-contacts {
    width: 400px;
  }
}
@media only screen and (max-width: 1200px) {
  .cart-content {
    width: 550px;
  }

  .cart-products {
    width: 100%;
  }
  .cart-contacts {
    width: 380px;
  }
}
@media only screen and (max-width: 1130px) {
  .cart-container {
    flex-wrap: wrap;
    justify-content: center;
  }
  .cart-content {
    width: 650px;
  }
  .cart-contacts {
    width: 550px;
    margin-bottom: 30px;
  }
  @media only screen and (max-width: 650px) {
    .cart-content {
      width: 90%;
      margin: auto;
    }
    .cart-products {
      width: 100%;
      height: 170px;
    }
    .cart-contacts {
      width: 450px;
    }
    .cart-total-price {
      margin-left: 30%;
    }
    .cart-images {
      width: 40%;
      height: 117px;
    }
    .cart-img {
      width: 100%;
    }
  }
}
@media only screen and (max-width: 580px) {
  .cart-total-price {
    margin-left: 15%;
  }
  .cart-img {
    width: 117px;
    height: 117px;
  }
}
@media only screen and (max-width: 520px) {
  .cart-total-price {
    margin-left: 20px;
  }
}
@media only screen and (max-width: 480px) {
  .cart-products {
    height: 240px;
  }
}
</style>
