<template>
  <div id="app">
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import bNav from 'bootstrap-vue/es/components/nav/nav';
import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';

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
  }
};
</script>

<style lang="scss">
</style>