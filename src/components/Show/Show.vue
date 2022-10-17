<template>
  <div class="show">
    <NavApp />
    <div class="container">
      <div class="boxs" v-for="(img, i) in dataShow" :key="i">
        <div class="box1">
          <figure>
            <img
              v-if="
                mainImage.length < 1
                  ? (mainImage = require('@/assets/images/' +
                      img.name +
                      '/' +
                      img.img))
                  : mainImage
              "
              :src="mainImage"
              alt=""
              class="card-img-top"
            />
          </figure>
          <div class="all-img">
            <div class="img" v-for="(oimg, i) in img.images" :key="i">
              <img
                :src="require('@/assets/images/' + img.name + '/' + oimg)"
                @mouseenter="
                  mainImage = require('@/assets/images/' +
                    img.name +
                    '/' +
                    oimg)
                "
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="box2">
          <div class="shp">
            <span>{{ img.website }}</span>
            <h1>{{ img.inform }}</h1>
            <p>{{ img.company }}</p>
          </div>
          <div class="ss">
            <h4>{{ img.price }}</h4>
            <span>{{ img.disc }}</span>
          </div>
          <div class="db">
            <div class="bsb">
              <button @click="decrement()" class="dec">-</button>
              <span>{{ numbrOfCart }}</span>
              <button @click="increment()" class="inc">+</button>
            </div>
            <button class="cart" @click="addToCart()" v-if="addCart">
              {{ addCart }}
            </button>
            <p class="loading" v-if="tof">Loading...</p>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" @click="goHome()">Lets Back</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavApp from "../Header/NavApp.vue";
import { mapActions } from "vuex";
export default {
  name: "ShowV",
  data() {
    return {
      pt: this.$route.params.showId,
      addCart: "Add to cart",
      dataShow: "",
      numbrOfCart: 1,
      locatinId: "",
      mainImage: "",
      tof: false,
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    ...mapActions(["redirectTo"]),
    goHome() {
      // this.redirectTo({ val: "home" });
      history.back();
    },
    async getLocation() {
      let my = [];
      let result = await axios.get(` http://localhost:3000/shose/${this.pt}`);
      if (result.status == 200) {
        my.push(result.data);
        this.locatinId = my[0].id;
      } else {
        console.log("exist error");
      }
      this.dataShow = my;
    },
    increment() {
      if (this.numbrOfCart >= 1) this.numbrOfCart += 1;
    },
    decrement() {
      if (this.numbrOfCart > 1) {
        this.numbrOfCart -= 1;
      }
    },
    async addToCart() {
      let user = localStorage.getItem("user-info");
      let getId = JSON.parse(user).id;
      let result = await axios.post("http://localhost:3000/cart", {
        userId: getId,
        locatinId: this.locatinId,
        numberOfCart: this.numbrOfCart,
      });
      if (result.status == 201) {
        this.addCart = "";
        this.tof = true;
        location.reload();
      }
    },
  },
  components: { NavApp },
};
</script>

<style lang="scss" scoped>
.boxs {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-block: 90px;
  gap: 30px;
  column-gap: 100px;
  .box1 {
    figure {
      width: 500px;
      img {
        width: 100%;
        border-radius: 15px;
      }
    }
    .all-img {
      display: flex;
      justify-content: space-between;
      .img {
        width: 100px;
        img {
          width: 100%;
          border-radius: 15px;
          cursor: pointer;
        }
      }
    }
  }
  .box2 {
    text-align: start;
    .shp {
      span {
        font-size: 22px;
        font-family: none;
        color: #ff9e00;
      }
      h1 {
        margin: 0;
        margin-block-end: 25px;
        font-weight: bold;
        font-size: calc(0.6rem + 2vw);
      }
      p {
        color: #a79999;
        font-size: 20px;
        margin-block: 29px;
      }
    }
    .ss {
      display: flex;
      width: fit-content;
      align-items: center;
      margin-block-end: 20px;
      h4 {
        font-weight: bold;
        margin: 0;
        margin-inline-end: 15px;
      }
      span {
        padding: 1px 7px;
        background-color: var(--main-color);
        color: #ff9e00;
        font-weight: 700;
      }
    }
    .db {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      width: 50%;
      .bsb {
        background-color: #ddd;
        width: 50%;
        // padding: 5px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 8px;
        button {
          border: none;
          outline: none;
          padding: 8px;
          background: transparent;
          color: #ff9e00;
          font-size: 25px;
        }
      }
      button.cart {
        width: 50%;
        border: none;
        border-radius: 8px;
        background-color: #ff9e00;
        color: #fff;
      }
      button.cart:active {
        background-color: #cf8205;
        color: #000;
      }
      .loading {
        padding: 10px 10px 10px 0;
        margin: 0;
        font-weight: bold;
      }
    }
  }
}
@media (max-width: 1200px) {
  .boxs {
    flex-direction: column;
  }
  .shp {
    text-align: center;
  }
  .ss {
    margin: 10px auto;
  }
  .db {
    margin: 10px auto;
  }
}
@media (max-width: 768px) {
  figure {
    width: 90% !important;
    margin: 0 auto 35px auto;
  }
}
@media (max-width: 475px) {
  .boxs {
    margin-block-end: 30px;
    .img {
      width: 22% !important;
    }
    .shp {
      p {
        font-size: calc(0.2rem + 2vw);
      }
    }
    .db {
      flex-direction: column;
      width: 100%;
      align-items: center;
      .cart {
        padding: 13px 0;
      }
    }
  }
}
</style>
