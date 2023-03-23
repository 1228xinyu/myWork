<template>
  <div id="app">
    <weaTher />
  </div>
</template>

<script>
import weaTher from "./components/weather.vue";

export default {
  name: "App",

  components: {
    weaTher,
  },
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
