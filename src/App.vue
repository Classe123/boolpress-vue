<template>

  <HeaderComponent />
  <main class="container my-4">
    <router-view></router-view>
  </main>

</template>



<script>
import HeaderComponent from './components/HeaderComponent.vue'
export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped></style>