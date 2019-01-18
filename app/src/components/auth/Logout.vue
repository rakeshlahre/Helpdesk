<template>

</template>

<script>
import api from '../../api';
import toastr from 'toastr';

export default {
  created() {
    api.onUserLogout()
      .then(response => {
        this.$store.dispatch("onLogout");
        this.$router.push({ path: '/login' });
        toastr.success('Logged Out');
      })
      .catch(err => {
          console.log(err);
      })
  }
}
</script>

