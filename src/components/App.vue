<template>
  <Page actionBarHidden="true" class="splashScreenBg" loading="loading">
    <SplashScreen color="white" />
  </Page>
</template>

<script>
import SplashScreen from "../components/SplashScreen";

export default {
  components: { SplashScreen },

  async mounted() {
    this.$store.dispatch("authInit").then(() => {
      if (this.isLogged) {
        this.$navigateTo(this.$routes.Todos, { clearHistory: true });
      } else {
        this.$navigateTo(this.$routes.Login, { clearHistory: true });
      }
    });
  },

  computed: {
    isLogged: function () {
      return this.$store.getters.isLogged;
    },
  },
};
</script>

<style scoped>
.splashScreenBg {
  width: 100%;
  height: 100%;
  background-color: #35495e;
}

@keyframes opacity {
  from {
    opacity: 0.6;
  }

  to {
    opacity: 1;
  }
}
</style>
