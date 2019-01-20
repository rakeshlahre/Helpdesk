<template>
  <div class="wrapper">
    <div class="form-signin">
      <h2 class="form-signin-heading">Login into your account</h2>
      <div>
        <b-form v-on:submit.prevent="login">
          <b-form-input
            id="Username"
            type="text"
            v-model="username"
            required
            placeholder="Username"
          ></b-form-input>

          <b-form-input
            id="Password"
            type="password"
            v-model="password"
            required
            placeholder="Password"
          ></b-form-input>

          <b-button class="btn btn-lg btn-primary btn-block" type="submit" variant="primary">Login</b-button>
        </b-form>
      </div>
      <div class="register-text">
        <p>Don't have account <router-link :to="{ name: 'register' }">Register here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import router from "../../router";
import bForm from "bootstrap-vue/es/components/form/form";
import bFormInput from "bootstrap-vue/es/components/form-input/form-input";
import bFormGroup from "bootstrap-vue/es/components/form-group/form-group";
import bButton from "bootstrap-vue/es/components/button/button";
import toastr from "toastr";
import { mapGetters } from 'vuex';

export default {
  name: "login",
  props: {
    dataSuccessMessage: {
      type: String
    }
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated'
    })
  },

  components: {
    bForm: bForm,
    bFormInput: bFormInput,
    bFormGroup: bFormGroup,
    bButton: bButton
  },
  methods: {
    login() {
      api
        .onUserLogin(this.username, this.password)
        .then(data => {
          this.$store.dispatch("onLogin", data);
          this.$router.push({ path: "/" });
          toastr.success("Logged In successfully");
        })
        .catch(error => {
          toastr.error(error.response.data.error || "error");
        });
    }
  }
};
</script>

<style lang="scss">
.wrapper {
  margin-top: 40px;
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 10px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);

  .form-signin-heading {
    text-align: center;
  }
  .checkbox {
    margin-bottom: 30px;
  }

  .checkbox {
    font-weight: normal;
  }

  .form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    &:focus {
      z-index: 2;
    }
  }

  input[type="text"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  input[type="password"] {
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .register-text{
    margin-top: 10px;
  }
}
</style>


