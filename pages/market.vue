<template>
  <div class="container-market">
    <div class="image-market">
      <img
        class="img-market"
        src="https://placeimg.com/1146/309/nature"
        alt=""
      />
    </div>
    <div class="ad">
      <div class="info-ad">
        <p>Obchod je z technicky dôvodov uzavretý</p>
        <p>v Stredu, Štvrtok a Piatok.</p>
      </div>
    </div>
    <div class="content-top">
      <div class="schedule-market">
        <div class="schedule-text">
          <h1>OBCHODNÉ ODDELENIE</h1>
        </div>
        <div class="schedule-info">
          <div class="schedule-table">
            <table class="table">
              <thead>
                <tr>
                  <td>Deň</td>
                  <td>Otváracie hodiny</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pondelok</td>
                  <td>09:00 - 12:00 &nbsp;&nbsp; 13:00 - 17:00</td>
                </tr>
                <tr>
                  <td>Utorok</td>
                  <td>09:00 - 12:00 &nbsp;&nbsp; 13:00 - 17:00</td>
                </tr>
                <tr>
                  <td>Streda</td>
                  <td>09:00 - 12:00 &nbsp;&nbsp; 13:00 - 17:00</td>
                </tr>
                <tr>
                  <td>Štvrtok</td>
                  <td>09:00 - 12:00 &nbsp;&nbsp; 13:00 - 17:00</td>
                </tr>
                <tr>
                  <td>Piatok</td>
                  <td>09:00 - 12:00 &nbsp;&nbsp; 13:00 - 17:00</td>
                </tr>
                <tr>
                  <td>Sobota</td>
                  <td>09:00 - 12:00</td>
                </tr>
                <tr>
                  <td>Nedeľa</td>
                  <td>Zatvorené</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="schedule-desc">
            <p>
              Radi Vás privítame v našej predajni Poľovnícke potreby SOLDAT na
              Budovateľskej 62 v Šali. Ponúkame široký sortiment zbraní,
              streliva, nožov a rôznych doplnkov pre poľovníkov, turistiku a
              voľný čas
            </p>

            <p>
              Sme výhradný dovozca nožov Kizlyar, AiR Zlatoust, Severnaja
              Korona, Sander, Basko a Mr. Blade na slovenský trh. V ponuke máme
              zbrane a strelivo, optické vybavenie, oblečenie, obuv, batohy,
              tašky. Ďalej teleskopické obušky, putá, svietidlá, obranné spreje,
              ďalekohľady, brusivo na nože...
            </p>
            <p>Vykonávame aj brúsenie nožov.</p>
          </div>
          <div class="maps-market">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2574.9115919458463!2d2.2952389921619796!3d48.85876819574648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1640697166209!5m2!1sru!2sru"
              width="750px"
              height="358"
              style="border: 0"
              border-radius="5px"
              allowfullscreen=""
              loading="lazy"
              class="maps-iframe"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="others-products">
        <h3>Posledné články</h3>
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
}
</script>
<style>
.container-market {
  width: 85%;
  margin: auto;
  margin-top: 40px;
}
.image-market {
  margin-bottom: 40px;
}
.img-market {
  width: 100%;
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
.schedule-market {
  width: 80%;
}
.schedule-info {
  display: flex;
  flex-wrap: wrap;
}
.schedule-desc {
  width: 400px;
  padding: 0 15px 15px;
}
.schedule-text {
  color: #428bca;
  font-family: sans-serif;
  font-weight: 100;
}
.schedule-desc p {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.428571429;
  color: #333333;
}
.schedule-table {
  width: 400px;
  display: flex;
  padding: 15px;
}
.table {
  border-collapse: collapse;
  margin-bottom: 20px;
  width: 100%;
}
.table td,
.table th {
  border: 1px solid #dddddd;
  padding: 8px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333333;
}
.maps-market {
  margin-left: 30px;
  margin-bottom: 30px;
}

.others-products {
  margin-top: 15px;
}
.others-products h3 {
  color: #333333;
  font-family: 'Oswald', Impact, Arial, sans-serif;
  font-weight: 100;
  font-size: 24px;
}
.others-products a {
  color: #428bca;
  text-decoration: none;
}
@media only screen and (max-width: 1300px) {
  .schedule-market {
    width: 100%;
  }
  .schedule-table {
    width: 35%;
  }
  .schedule-desc {
    width: 35%;
  }
}
@media only screen and (max-width: 900px) {
  .schedule-market {
    width: 100%;
    margin: auto;
  }

  .schedule-table {
    width: 45%;
  }
  .schedule-desc {
    width: 45%;
  }
  .maps-market {
    margin-left: 0px;
  }
  .maps-iframe {
    width: 400px;
  }
}
@media only screen and (max-width: 750px) {
  .schedule-table {
    width: 90%;
  }
  .schedule-desc {
    width: 90%;
  }
  .maps-market {
    margin-left: 0px;
  }
  .maps-iframe {
    width: 400px;
  }
}
@media only screen and (max-width: 750px) {
  .maps-iframe {
    width: 300px;
    height: 220px;
  }
}
</style>
