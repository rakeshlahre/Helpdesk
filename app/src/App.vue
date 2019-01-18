<template>
  <div id="app">
    <b-nav class="nav" v-if="isAuthenticated">
      <b-nav-item class="nav-item" v-if="isAuthenticated" ><router-link :to="{ name: 'home' }">Home</router-link></b-nav-item>
      <!-- <b-nav-item class="nav-item" v-if="!isAuthenticated"><router-link :to="{ name: 'login' }">Login</router-link></b-nav-item>
      <b-nav-item class="nav-item" v-if="!isAuthenticated"><router-link :to="{ name: 'register' }">Register</router-link></b-nav-item> -->
      <b-nav-item class="nav-item" v-if="isAuthenticated"><router-link :to="{ name: 'logout' }">Logout</router-link></b-nav-item>
    </b-nav>
    <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import bNav from 'bootstrap-vue/es/components/nav/nav';
import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';
import api from './api'

export default {
  name: 'app',
  components: {
    'b-nav': bNav,
    'b-nav-item': bNavItem
  },
  data() {
    return {
      value: true,
    }
  },
  created () {
    this.$store.dispatch("fetchUser");
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated'
    })
  }
};
</script>

<style lang="scss">
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/css/font-awesome.min.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  @import './scss/style';
  @import '~toastr/toastr';

  .nav {
    display: flex;
    list-style: none;
    padding: 5px 0;
    margin: 0;
    background: #F5F8FA;
    border-bottom: 1px solid lightgrey;
  }
  .nav-item {
    margin: 0px 5%;
  }
</style>