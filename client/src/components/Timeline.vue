<template>
  <div class="home">
    <Activities></Activities>
  </div>
</template>

<script>
// @ is an alias to /src
import Activities from './Activities.vue';

export default {
  name: 'activities',
  components: {
    Activities,
  },
};
</script>
<style scoped>
  .home {
    text-align: left;
    padding-left: 20px;
  }
</style>
