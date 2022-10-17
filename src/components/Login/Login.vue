<template>
  <div class="container">
    <div class="form-user">
      <form @click.prevent>
        <!-- <input type="text" name="Name" placeholder="Name" v-model="state"/> -->
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
      <p v-if="acount_defined">{{ acount_defined }}</p>
      <button type="button" class="btn btn-primary" @click="email_User()">
        Login
      </button>
      &nbsp;&nbsp;
      <button type="button" class="btn btn-secondary" @click="signUp()">
        SignUp
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
  name: "Login-U",
  data() {
    return {
      acount_defined: "",
    };
  },
  setup() {
    const state = reactive({
      pass: "",
      email: "",
    });
    const rules = computed(() => {
      return {
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
    async email_User() {
      this.v$.$validate();
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.state.email}&pass=${this.state.pass}`
      );
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        // this.acount_defined = "";
        this.redirectTo({ val: "home" });
      } else {
        this.acount_defined =
          "your acount is not defineed \r\n check your password or email";
      }
      this.v$.email.$errors.$message = "";
      this.v$.pass.$errors.$message = "";
    },
    signUp() {
      this.redirectTo({ val: "SignUp" });
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
  p {
    color: red;
  }
  button {
    padding-inline: 40px;
  }
}
</style>
