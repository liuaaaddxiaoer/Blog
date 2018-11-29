<template>
    <div class="home_container">
      <HomeHeader />
      <HomeSection />
    </div>
</template>

<script>
  import HomeHeader from './HomeHeader'
  import HomeSection from "./HomeSection";
    export default {
        name: "Home",
      data() {
        return {
          msg: 'ios'
        }
      },
      components: {
        HomeSection,
        HomeHeader
      }
    }
</script>

<style scoped>
  .home_container {
    display: flex;
    flex-direction: column;
  }
</style>
