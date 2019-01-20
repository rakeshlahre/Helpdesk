<template>
  <bContainer class="text-center">
      <bRow>
        <bCol cols="4" class="list-container">
            <div v-for="tweet in list" :key="tweet.id">
                {{tweet.tweet}}
            </div>
        </bCol>
        <bCol cols="8" class="feed-container">

        </bCol>
      </bRow>
  </bContainer>
</template>

<script>
import {mapGetters} from 'vuex';
import bContainer from 'bootstrap-vue/es/components/layout/container';
import bRow from 'bootstrap-vue/es/components/layout/row';
import bCol from 'bootstrap-vue/es/components/layout/col';
import api from '../api'

export default {
  name: 'dashboard',
  components: {
      bContainer,
      bRow,
      bCol
  },
  data: () => ({
      list: [
          {tweet: 'This is a smaple', id: '1'},
          {tweet: 'This is a smaple', id: '2'},
          {tweet: 'This is a smaple', id: '3'},
          {tweet: 'This is a smaple', id: '4'},
          {tweet: 'This is a smaple', id: ''}
      ]
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated'
    })
  },
  mounted () {
    this.fetchData();
  },
  methods: {
    fetchData() {
      api.getUserTweets()
        .then(data => {
          this.list = data.map(tweet => {return {id: tweet.id, tweet: tweet.text}})
        })
    }
  }
};
</script>

<style lang="scss">
    .list-container {
        display: flex;
        flex-direction: column;
        border-right: solid 1px black;
    }
    .feed-container {
        display: flex;
        flex-direction: column;
        border-right: solid 1px black;
    }
</style>