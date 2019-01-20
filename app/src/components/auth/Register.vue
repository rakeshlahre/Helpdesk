<template>
  <div class="wrapper">
    <div class="form-signin">
      <h2 class="form-signin-heading">Create an account</h2>
      <div>
        <b-form v-on:submit.prevent="register">
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

          <b-button class="btn btn-lg btn-primary btn-block" type="submit" variant="primary">Register</b-button>
        </b-form>
      </div>
      <div class="register-text">
        <p>Already have account <router-link :to="{ name: 'login' }">Login Here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import router from "../../router";
import bForm from 'bootstrap-vue/es/components/form/form';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import bButton from 'bootstrap-vue/es/components/button/button';
import toastr from 'toastr';
export default {
  data() {
    return {
      name: '',
      username: '',
      password: '',
    }
  },

  components: {
    'bForm': bForm,
    'bFormInput': bFormInput,
    'bFormGroup': bFormGroup,
    'bButton': bButton
  },

  methods: {
    register() {
      api
        .onUserRegister(this.username, this.password)
        .then(data => {
          this.$store.dispatch("onLogin", data);
          this.$router.push({ path: '/' });
          toastr.success('Logged In successfully');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.b-form {
  margin: 15px 20%;
}
.login-heading {
  margin: 15px 20%;
}

</style>

