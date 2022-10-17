<template>
  <div class="cart">
    <h1>Your Cart</h1>
    <div class="container">
      <div class="boxs">
        <table v-if="dataCart">
          <tr>
            <th>Product</th>
            <th>Informations</th>
            <th>Type</th>
            <th>Count</th>
            <th>Status</th>
          </tr>
          <tr v-for="(cart, i) in dataCart" :key="i">
            <td class="td1">
              <img
                :src="require('@/assets/images/' + cart.name + '/' + cart.img)"
                alt=""
              />
            </td>
            <td class="td2">{{ cart.inform }}</td>
            <td class="td3">{{ cart.name }}</td>
            <td class="td4">{{ numberOfCart[i] }}</td>
            <td class="td5">
              <button class="btn btn-danger" @click="deleteCart(idOfCart[i])">
                Delete
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <button class="btn btn-primary go-home" @click="goHome()">Go Home</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "CartV",
  data() {
    return {
      dataCart: "",
      numberOfCart: "",
      idOfCart: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    const userJson = JSON.parse(user).id;
    this.getCart(userJson);
  },
  methods: {
    ...mapActions(["redirectTo"]),
    goHome() {
      this.redirectTo({ val: "home" });
    },
    async getCart(userId) {
      let myData = [];
      let numberCart = [];
      let idCart = [];
      let result = await axios.get(
        `http://localhost:3000/cart?userId=${userId}`
      );
      if (result.status == 200) {
        for (let i = 0; i < result.data.length; i++) {
          numberCart.push(result.data[i].numberOfCart);
          idCart.push(result.data[i].id);
          let result2 = await axios.get(
            `http://localhost:3000/shose/${result.data[i].locatinId}`
          );
          myData.push(result2.data);
        }
      }
      this.dataCart = myData;
      this.numberOfCart = numberCart;
      this.idOfCart = idCart;
    },
    async deleteCart(idCart) {
      let result = await axios.delete(`http://localhost:3000/cart/${idCart}`);
      if (result.status == 200) {
        location.reload();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  .boxs {
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      td,
      th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      .td1 {
        width: 50px !important;
        img {
          width: 100%;
          border-radius: 4px;
        }
      }
      .td5 {
        width: 50px;
      }
    }
  }
}
.go-home {
  margin: 30px auto;
}
</style>
