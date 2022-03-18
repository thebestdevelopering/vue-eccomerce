<template>
  <div class="footer">
    <div class="footer-container">
      <div class="contacts">
        <ul>
          <h5>KONTAKTNÉ ÚDAJE</h5>

          <li>
            <span class="info"
              >Petra Pazmaňa 519/9 <br />
              92701 Šaľa, SVK</span
            >
          </li>
          <li>
            <span>+421 313 812 003</span>
          </li>
          <li>
            <span class="info">+421 905 876 003 </span>
          </li>
          <li><span class="info">+421 908 761 071 </span></li>
          <li><span class="info">noze@kizlyar.sk </span></li>
          <li>
            <span class="info">
              Pon - Pia 09:00 - 17:00 <br />
              Sobota 09:00 - 12:00</span
            >
          </li>
        </ul>
      </div>
      <div class="categories">
        <ul>
          <h5>KATEGÓRIE</h5>
          <li
            v-for="category in categories"
            :key="category.id"
            :category="category"
            class="footer-links"
          >
            <NuxtLink :to="`/category/${category.id}`">
              {{ category.attributes.name }}</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="address">
        <h5>NÁŠ OBCHOD</h5>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2574.9115919458463!2d2.2952389921619796!3d48.85876819574648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1640697166209!5m2!1sru!2sru"
          width="300"
          height="190"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
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
  },

  mounted() {
    this.fetchCategories()
  },
}
</script>

<style>
.footer {
  width: 100%;
  background-color: #333333;
  padding: 20px 0;
}
.footer-container {
  display: flex;
  justify-content: right;
  margin-right: 100px;
}

.contacts h5 {
  padding: 5px;
  padding-left: 10px;
  border-left: 3px solid #666;
}

.contacts ul {
  color: #fff;
}
.contacts ul li {
  margin-bottom: 5px;
}
.info {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 10px;
  font-weight: 700;
}
.categories {
  width: 20%;
  margin-left: 20px;
}
.footer-links {
  width: 100%;
  border-bottom: 1px solid #111;
  color: #fff;
  font-size: 13px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  padding: 5px 0;
}
.footer-links:hover {
  background-color: #1f1f1f;
}
.categories ul li {
  color: #fff;
}
.categories ul li a {
  text-decoration: none;
  color: #fff;
}
.categories h5 {
  color: #fff;
  padding: 5px;
  padding-left: 10px;
  border-left: 3px solid #666;
}
.address {
  float: right;
  margin-left: 20px;
}
.address h5 {
  color: #fff;
  padding: 5px;
  padding-left: 10px;
  border-left: 3px solid #666;
}
@media only screen and (max-width: 1000px) {
  .footer-container {
    justify-content: center;
    flex-wrap: wrap;
    margin-right: 0px;
  }
  .contacts {
    width: 200px;
  }
  .categories {
    width: 200px;
  }
}
@media only screen and (max-width: 400px) {
  .footer-container {
    justify-content: left;
  }
  .categories ul {
    padding-left: 20px;
  }
  .address {
    padding-left: 20px;
  }
}
</style>
