<template>
    <div class="toast_container" v-show="isShow">
      <span>{{this.text}}</span>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        props: ['text'],
        data() {
          return {
            isShow: false
          }
        },
    }
</script>

<style scoped lang="less">
  .toast_container {
    position: absolute;
    line-height: 40px;
    color: white;
    font-size: 16px;
    top:60px;
    left: 50%;
    transform: translate(-50%);
    transition: all 2s;
    /*width: 200px;*/
    height: 40px;
    min-width: 200px;
    padding: 0px 10px;
    background: black;
    border-radius: 20px;
    z-index: 10000;
    transition: opacity 2s;
  }
</style>
