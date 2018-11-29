<template>
    <div class="home_section_container">
      <div class="article_container">
        <div class="article">
          <h3>iOS代码自动翻新(混淆)专家、ConfuseSoftware</h3>
          <div class="author_container">
            <span>作者:</span>
            <h5>刘小二</h5>
            <span>2018年11月29日</span>
          </div>
        </div>
      </div>
      <div class="profile_container">1</div>
    </div>
</template>

<script>
    export default {
        name: "HomeSection"
    }
</script>

<style scoped lang="less">
  @import "../css/common";
  .home_section_container {
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    .bgColor;
    padding: 30px;
    .article_container {
      flex: 1;
      display: -webkit-flex;
      display: flex;
      .article {
        padding: 35px;
        width: 100%;
        background: white;
        h3 {
          .titleColor;
        }
        .author_container {
          display: flex;
          justify-content: center;
          margin: 20px;
          align-items: center;
          .grayColor;
          flex-wrap: nowrap;
          font-size: 15px;
          white-space: nowrap;
          h5 {
            margin: 0 10px;
            .mainColor;
            font-weight: 500;
          }
        }
      }
    }
    .profile_container {
      background: red;
      flex: 1;
      height: 100%;
    }
  }
</style>
