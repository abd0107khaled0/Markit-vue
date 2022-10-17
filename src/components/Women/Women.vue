<template>
  <div class="home">
    <h1>Collection For Women</h1>
    <div class="container">
      <div class="boxs">
        <!-- <div class="box" v-for="(imglop, i) in images" :key="i">
          <span>{{ imglop.name }}</span>
          <img
            :src="
              require('@/assets/' + 'images/' + imglop.name + '/' + imglop.img)
            "
            alt=""
          />
        </div> -->
        <div
          class="box card"
          style="width: 18rem"
          v-for="(imglop, i) in images"
          :key="i"
        >
          <img
            :src="
              require('@/assets/' + 'images/' + imglop.name + '/' + imglop.img)
            "
            alt=""
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">{{ imglop.name }}</h5>
            <p class="card-text">
              {{ imglop.inform }}
            </p>
            <router-link
              :to="{ name: 'Show', params: { showId: imglop.id } }"
              class="btn btn-primary"
              >shom more</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import shose from "@/DB/shose.json";
export default {
  name: "WomenV",
  data() {
    return {
      images: "",
      myshose: shose,
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "Login" });
    }

    // getImagge
    // this.getImg();

    this.getMyShose();
  },
  methods: {
    // async getImg() {
    //   let result = await axios.get("http://localhost:3000/images");
    //   if (result.status == 200) {
    //     this.images = result.data;
    //     console.log(this.images[0]);
    //   } else console.log("exist error ");
    // },
    getMyShose() {
      let my = [];
      for (let i = 0; i < this.myshose.length; i++) {
        if (this.myshose[i].name == "women") {
          my.push(this.myshose[i]);
        }
      }
      this.images = my;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 60px auto;
  h1 {
    margin: 2.6rem 0;
  }
  .boxs {
    display: flex;
    gap: 30px;
    flex-flow: wrap;
    justify-content: space-evenly;
    .box {
      box-shadow: 0px 0px 4px 3px var(--main-color);
      transition: 0.2s ease-in-out;
      overflow: hidden;
      img {
        transition: 0.2s ease-in-out;
      }
      .card-body {
        display: flex;
        flex-direction: column;
        h5,
        p {
          color: #a79999;
        }
        p {
          font-size: 14px;
        }
        a {
          background: var(--sacond-color);
          outline: none;
          border: none;
        }
        a:hover {
          background: #d78500;
        }
      }
    }
    .box:hover {
      box-shadow: 0px 0px 3px 6px var(--main-color);
      transform: scale(1.055);
      img {
        transform: scaleX(1.1) skewX(5deg);
      }
    }
    // .box:hover
  }
}
</style>
