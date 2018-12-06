<template>
    <div class="navbar_container">
      <div class="nav_container">
        <a href="#">
          小二
        </a>
        <div class="container">
          <a href="#">首页</a>
          <a href="#">关注</a>
          <a href="#">消息</a>
        </div>
        <div class="style_user_container">
          <div class="style_model_container">
            <img src="../assets/Aa.png" alt="">
            <div class="popver_container">

            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped lang="less">
  @import "../css/common";
  .navbar_container {
    border: 1px solid #f0f0f0;
    .nav_container {
      .mainColor;
      display: flex;
      max-width: 1400px;
      margin: 0 auto;
      justify-content: center;
      align-items: center;
      height: 56px;
      font-size: 18px;
      width: 960px;
      a {
        width: 100px;
        height: 100%;
        line-height: 56px;
        text-align: center;
        margin-right: 100px;
        font-weight: 700;
      }
      .container {
        width: 60%;
        background: red;
        a {
          width: 80px;
          margin-right: 70px;
          font-weight: normal;
        }
      }
      .style_user_container {
        padding: 0px 15px;
        background: cyan;
        width: 50px;
        height: 100%;
        position: relative;
        img {
          position: absolute;
          left: 30%;
          top: 25%;
          transform: translate(-50% -50%);
        }
        .popver_container {
          width: 230px;
          height: 200px;
          background: chartreuse;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%);
          &::before,&::after {
            position: absolute;
            top: -10px;
            left: 78%;
            content: "";
            display: inline-block;
            border: 9px solid transparent;
            border-top: none;
          }
          &::after {

          }
        }
      }
    }

  }
</style>
