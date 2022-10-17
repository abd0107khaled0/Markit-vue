<template>
  <div class="container">
    <div class="nav">
      <div class="part1">
        <div class="static">
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#staticBackdrop"
            aria-controls="staticBackdrop"
            @click="fav()"
          >
            <i class="fa-solid fa-bars"></i>
          </button>
          <div
            class="offcanvas offcanvas-start"
            data-bs-backdrop="static"
            tabindex="-1"
            id="staticBackdrop"
            aria-labelledby="staticBackdropLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="staticBackdropLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="ul-block">
                <li>
                  <router-link :to="{ name: 'home' }">Collections</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Men' }">Men</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Women' }">Women</router-link>
                </li>
                <!-- <li>
                  <router-link :to="{ name: 'About' }">About</router-link>
                </li> -->
                <li>
                  <router-link :to="{ name: 'Contact' }">Contact</router-link>
                </li>
                <li>
                  <a @click="logout()">LogOut</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h1>Sneaker</h1>
        <ul class="ul-none">
          <li>
            <router-link :to="{ name: 'home' }">Collections</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Men' }">Men</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Women' }">Women</router-link>
          </li>
          <!-- <li>
            <router-link :to="{ name: 'About' }">About</router-link>
          </li> -->
          <li>
            <router-link :to="{ name: 'Contact' }">Contact</router-link>
          </li>
          <li>
            <a @click="logout()">LogOut</a>
          </li>
        </ul>
      </div>
      <div class="part2">
        <ul>
          <li>
            <div class="fli">
              <i class="fa-solid fa-cart-shopping"></i>
              <span class="sp1">{{ numersOfCartUser }}</span>
            </div>
            <div class="lli m card" v-if="tof">
              <span class="card-header">cart</span>
              <div class="card-body">
                <div v-for="(first, i) in firstCart" :key="i">
                  <img
                    :src="
                      require('@/assets/images/' + first.name + '/' + first.img)
                    "
                    alt=""
                  />
                  <p>{{ first.inform }}</p>
                  <!-- <i class="fa-solid fa-trash"></i> -->
                </div>
                <button class="btn btn-primary" @click="goCart()">
                  Check Your Cart
                </button>
              </div>
            </div>
          </li>
          <li>
            <img src="./image-avatar.png" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "NavApp",
  data() {
    return {
      numersOfCartUser: 0,
      firstCart: [],
      tof: false,
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    let ju = JSON.parse(user);
    this.userCart(ju.id);
  },
  methods: {
    ...mapActions(["redirectTo"]),
    logout() {
      localStorage.removeItem("user-info");
      this.redirectTo({ val: "Login" });
    },
    fav() {
      let offcanvas = document.querySelector(".show");
      if (offcanvas) {
        offcanvas.style.width = "100%";
        offcanvas.style.height = "100%";
        offcanvas.classList.add("wh");
      }
    },
    async userCart(numUser) {
      let result = await axios.get(
        `http://localhost:3000/cart?userId=${numUser}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.numersOfCartUser = result.data.length;
        let results = await axios.get(
          `http://localhost:3000/shose?id=${
            result.data[result.data.length - 1].locatinId
          }`
        );
        if (results.status == 200) {
          this.firstCart = results.data;
          this.tof = true;
        } else {
          console.log("none");
        }
      } else console.log("no cart");
    },
    goCart() {
      this.redirectTo({ val: "Cart" });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-block-end: 1px solid #ddd;
  padding-block-start: 30px;
  .part1 {
    .static {
      display: none;
      button.btn-primary {
        background: transparent;
        color: #000;
        border: none;
        font-size: 20px;
        padding: 0 16px 0 0;
      }
    }
    display: flex;
    align-items: center;
    h1 {
      margin: 0;
      font-size: calc(1rem + 1vw);
      font-weight: var(--font-weight);
      padding-inline-end: 30px;
    }
    ul {
      margin: 0;
      display: flex;
      padding: 0;
      li {
        padding-block: 15px;
        padding-inline: 10px;
        transition: 0.1s ease-in-out;
        border-block-end: 3px solid transparent;
        a {
          font-weight: bold;
          color: #8f8f8f;
          padding: 12px 0px;
          cursor: pointer;
          &.router-link-exact-active {
            color: var(--sacond-color);
          }
        }
      }
      li:hover {
        border-block-end: 3px solid var(--sacond-color);
      }
    }
  }
  .part2 {
    // position: relative;
    ul {
      display: flex;
      align-items: center;
      justify-content: end;
      margin: 0;
      li {
        cursor: pointer;
      }
      li:first-of-type {
        margin-inline-end: 20px;
        margin-block-end: -10px;
        position: relative;
        span.sp1 {
          position: absolute;
          top: -16px;
          background-color: var(--sacond-color);
          width: 20px;
          left: 8px;
          border-radius: 10px;
          font-size: 14px;
        }
        .lli {
          display: none;
          position: absolute;
          width: 100%;
          inset-block-end: 10px;
          transition: 1s ease-in-out;
          inset-block-end: -152px;
          inset-inline-start: -350px;
          width: 370px;
          z-index: 2;
          .lli span {
            width: 100%;
            position: initial;
          }
          .card-body {
            width: 100%;
            div {
              display: flex;
              align-items: center;
              justify-content: space-around;
              img {
                width: 50px;
              }
              p {
                margin: 0;
              }
              i:hover {
                color: red;
              }
            }
          }
        }
      }
      li:first-of-type:hover .lli {
        display: flex;
      }
      li:last-of-type {
        margin-block-end: 2px;
        width: 30%;
        border: 2px solid var(--sacond-color);
        border-radius: 50%;
        position: relative;
        transition: 1s ease-in-out;
        img {
          width: 100%;
        }
      }
      li:last-of-type:hover .lli {
        display: flex;
      }
    }
  }
}
.wh {
  width: 100% !important;
  height: 100% !important;
}

@media (max-width: 992px) {
  .part1 {
    .static {
      display: block !important;
    }
    .ul-none {
      display: none !important;
    }
  }
  .ul-block {
    display: block !important;
    width: fit-content !important;
    margin: 10px auto !important;
  }
  .offcanvas-start {
    width: 60% !important;
  }
  .offcanvas-backdrop.fade.show {
    width: 100% !important;
    height: 100% !important;
  }
}
@media (max-width: 425px) {
  .nav .part2 ul li:first-of-type .lli {
    inset-block-end: -157px;
    inset-inline-start: -285px;
    width: 305px;
    z-index: 2;
  }
}
</style>
