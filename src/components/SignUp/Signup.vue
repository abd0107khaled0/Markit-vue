<template>
  <div class="container">
    <div class="form-user">
      <p v-if="exist">{{ exist }}</p>
      <form @click.prevent>
        <input
          type="text"
          name="name"
          placeholder="Name"
          v-model="state.name"
        />
        <span class="error-feedback" v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </span>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          v-model="state.email"
        />
        <span class="error-feedback" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </span>
        <input
          type="password"
          name="Password"
          placeholder="Password"
          v-model="state.pass"
        />
        <span class="error-feedback" v-if="v$.pass.$error">
          {{ v$.pass.$errors[0].$message }}
        </span>
      </form>
      <button type="button" class="btn btn-primary" @click="signUp()">
        SignUp
      </button>
      &nbsp;&nbsp;
      <button type="button" class="btn btn-secondary" @click="login()">
        Login
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "Signup-U",
  data() {
    return {
      exist: "",
    };
  },
  setup() {
    const state = reactive({
      name: "",
      pass: "",
      email: "",
    });
    const rules = computed(() => {
      return {
        name: { required },
        email: { required, email },
        pass: { required },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["redirectTo"]),
    async signUp() {
      this.v$.$validate();
      let resuit_g = await axios.get(
        ` http://localhost:3000/users?email=${this.state.email}`
      );
      if (resuit_g.status == 200 && resuit_g.data.length > 0) {
        this.exist = "this your email is exist";
      } else {
        this.exist = "";
        if (!this.v$.$error) {
          let result = await axios.post(`http://localhost:3000/users`, {
            name: this.state.name,
            email: this.state.email,
            pass: this.state.pass,
          });
          if (result.status == 201) {
            console.log(result.data[0]);
            localStorage.setItem("user-info", JSON.stringify(result.data));
            this.redirectTo({ val: "home" });
          } else {
            this.redirectTo({ val: "signup" });
          }
        } else {
          this.redirectTo({ val: "signup" });
        }
      }
    },
    login() {
      console.log("sign");
      this.redirectTo({ val: "Login" });
    },
  },
};
</script>

<style scoped lang="scss">
.form-user {
  width: 280px;
  margin: 10px auto;
  form {
    input {
      width: 100%;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #b1b1b1;
      outline: none;
      margin-block: 10px;
    }
    span {
      color: red;
    }
  }
  button {
    padding-inline: 40px;
  }
}
</style>
