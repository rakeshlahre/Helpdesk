<template>
  <div id="app" class="text-center mt-2">
      <button class="btn btn-primary twitter-btn"
          @click="connectWithTwitter">
          Connect with twitter
      </button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import bNav from 'bootstrap-vue/es/components/nav/nav';
import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';
import api from '../api'

export default {
  name: 'app',
  components: {
    'b-nav': bNav,
    'b-nav-item': bNavItem
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated'
    })
  },

  methods: {
    connectWithTwitter() {
      api.connectTwitter()
      .then(({requestToken}) => {
        window.location = `https://api.twitter.com/oauth/authorize?oauth_token=${requestToken}`
      })
    }
  }
};
</script>

<style lang="scss">
  .twitter-btn{
    margin: auto;
  }
</style>