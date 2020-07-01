<template>
  <div id="app">
    <TheMonsterSlayer />
  </div>
</template>

<script>
import TheMonsterSlayer from './components/TheMonsterSlayer.vue'

export default {
  name: 'App',
  components: {
    TheMonsterSlayer
  }
}
</script>

<style>
@import './css/foundation.min.css';
@import './css/app.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
