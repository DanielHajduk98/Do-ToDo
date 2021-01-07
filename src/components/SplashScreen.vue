<template>
  <StackLayout class="splashScreen">
    <Image src="res://logo" gravity="center" width="200" height="200" />
    <ActivityIndicator
      busy="true"
      :color="color ? color : 'black'"
      width="150"
      height="150"
      class="loadingSpinner"
    ></ActivityIndicator>
  </StackLayout>
</template>

<script>
export default {
  props: {
    color: String,
  },
};
</script>

<style scoped>
.splashScreen {
  width: 100%;
  height: 100%;
  vertical-align: center;
  horizontal-align: center;
  background-color: #35495e;

  android-elevation: 10;
}

.loadingSpinner {
  animation-name: opacity;
  animation-duration: 1s;
}

@keyframes opacity {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
