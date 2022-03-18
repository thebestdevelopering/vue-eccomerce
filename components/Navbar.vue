<template>
  <div class="nav-header">
    <div class="nav-text">
      <div class="navlinks">
        <li class="list">
          <NuxtLink to="/" class="link">HOME</NuxtLink>
        </li>
        <li class="list">
          <NuxtLink to="/products" class="link">HISTORY KIZLYAR</NuxtLink>
        </li>
        <li class="list">
          <NuxtLink to="/market" class="link">MARKET</NuxtLink>
        </li>
      </div>
      <div class="auth-links">
        <li></li>
        <li><NuxtLink to="/cart" class="link">Cart</NuxtLink></li>
        <template v-if="!authUser">
          <li><NuxtLink to="/signin" class="link">Login</NuxtLink></li>
          <li>
            <NuxtLink to="/signup" class="link">Registration</NuxtLink>
          </li>
        </template>
        <li v-else class="cart-user">{{ authUser.username }}</li>
      </div>
    </div>
    <div class="sidebar">
      <div class="lower-header">
        <div class="logo-blog">
          <NuxtLink to="/" class="logo-link">KIZLYAR</NuxtLink>
          <div class="logo-img">
            <img class="logo" src="../images/logo-kizlyar.png" alt="" />
          </div>
          <span class="signature">Exclusive to present in France</span>
        </div>
        <div class="list-section">
          <li class="list-sidebar">
            <NuxtLink to="/" class="link-sidebar">HOME</NuxtLink>
          </li>
          <li class="list-sidebar">
            <NuxtLink to="/products" class="link-sidebar">CATALOG</NuxtLink>
          </li>
          <li class="list-sidebar">
            <NuxtLink to="/category/categories" class="link-sidebar"
              >CATEGORIES</NuxtLink
            >
          </li>
        </div>
      </div>
      <div class="bottom-strip"></div>
    </div>
    <div class="bar">
      <ul class="bar-list">
        <img class="logo-home" src="../assets/logo-home.png" alt="" />
        <li>/ Hlavná stránka</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      authUser: null,
    }
  },

  mounted() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.authUser = user
    }
  },
})
</script>

<style>
body {
  margin: 0;
}
.nav-header {
  width: 100%;
  max-width: 100%;
}

.nav-text {
  display: flex;
  justify-content: space-between;
  background-color: #2f2f2f;
  color: #fff;
  margin: auto;
  width: 100%;
}
.navlinks {
  margin-left: 110px;
  height: 42px;
  width: 85%;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-user {
  color: rgb(11, 180, 11);
}
.auth-links {
  display: flex;
  align-items: center;
  margin-right: 50px;
}
.auth-links li {
  list-style: none;
  padding-left: 30px;
}
.auth-links li a {
  font-size: 14px;
}
.list {
  list-style: none;
}
.link {
  color: #fff;
  text-decoration: none;
  font-size: 10px;
}
.sidebar {
  width: 100%;
  max-width: 100%;
  height: 120px;
  background-image: linear-gradient(to bottom, #ffffff 0%, #ececec 100%);
  background-repeat: repeat-x;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.lower-header {
  display: flex;
  align-items: center;
  margin: auto;
  width: 85%;
  height: 120px;
}
.logo-blog {
  width: 75%;
}
.logo-link {
  font-family: 'Oswald', Impact, Arial, sans-serif;
  line-height: 50px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 1px 1px 1px #fff;
  position: relative;
  z-index: 1;
  font-size: 50px;
  text-decoration: none;
  color: #444;
  font-weight: 300;
}
.logo-img {
  margin-left: 75px;
}
.signature {
  display: block;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: -0.2px;
  color: #333333;
}
.logo {
  width: 138px;
  height: 132px;
  position: absolute;
  top: 30px;
  opacity: 0.2;
}
.list-section {
  width: 30%;
  display: flex;

  align-items: center;
  justify-content: space-between;
}

.list-sidebar {
  display: flex;
  align-items: center;
  height: 120px;
  list-style: none;
}
.link-sidebar {
  color: #000;
  text-decoration: none;
  font-size: 20px;
  font-family: Arial, sans-serif;
  font-weight: 500;
}
.list-section li:hover {
  background-image: linear-gradient(to bottom, #ffffff 0%, #f3f3f3 100%);
  background-repeat: repeat-x;
}
.bottom-strip {
  width: 100%;
  border-top: 5px solid #d5d5d5;
  border-bottom: 2px solid #888;
}
.bar {
  display: flex;
  align-items: center;
  margin: auto;
  width: 85%;
  background-color: #f5f5f5;
  color: #999999;
  height: 30px;
  margin-top: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 3px #777;
  padding: 0px 15px;
}
.logo-home {
  width: 17px;
  height: 16px;
}
.bar-list {
  list-style: none;
  display: flex;
}
.bar-list li {
  padding-left: 7px;
}

@media only screen and (max-width: 700px) {
  .navlinks {
    width: 100%;
  }
  .list-section {
    justify-content: center;
    flex-wrap: wrap;
  }
  .list-sidebar {
    font-size: 14px;
    height: 20px;
  }
  .link-sidebar {
    font-size: 16px;
  }
}
@media only screen and (max-width: 1200px) {
  .list-section {
    width: 50%;
  }
  .list-sidebar {
    margin-left: 20px;
  }
}
@media only screen and (max-width: 600px) {
  .list-section {
    justify-content: center;
    flex-direction: column;
  }
  .navlinks {
    margin: auto;
  }
}
</style>
