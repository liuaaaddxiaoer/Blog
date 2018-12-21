<template>
  <div class="home_header_container home">
    <h1>刘小二的技术博客</h1>
    <div class="tag_container">
      <span @click="goToHome">首页</span>
      <span @click="goToGithub">Github</span>
      <span>关于</span>
      <span @click="goToWriter">后台管理</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeHeader",
    data() {
      return {
        gitAddress: 'https://github.com/liuaaaddxiaoer'
      }
    },
    methods: {
      // 前往Github
      goToGithub: function () {
        window.location.href = this.gitAddress
      },
      goToHome: function () {
        this.$router.push('/')
      },
      goToWriter: function () {
        this.$router.push('/writer')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../css/common";

  /*@media screen and (min-width: 768px) {*/
    /*.home_header_container.home{*/
      /*height: 300px;*/
    /*}*/
  /*}*/
  .home_header_container {
    height: 9rem;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    background: url("https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3132607591,1075681328&fm=27&gp=0.jpg") 0 -35px;
    background-size: 150px 150px;
    h1 {
      .mainColor;
      text-align: center;
      font-size: 35px;
      margin-bottom: 55px;
    }
    .tag_container {
      cursor: pointer;
      height: 56px;
      .normalColor;
      display: flex;
      background-color: white;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      border-top: 1px solid #ebebeb;
      border-bottom: 1px solid #e1e1e1;
      font-size: 14px;
      span {
        flex: 1;
        line-height: 56px;
      }
      span:hover {
        .mainColor;
      }
    }
  }

</style>
