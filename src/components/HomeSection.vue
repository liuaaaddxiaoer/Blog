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
          <img src="http://www.wuhaichao.com/static/image/webfanx.png" alt="">
          <p>iOS代码自动翻新(混淆)专家是一款新一代运行在MAC OS平台的App、完美支持Objc和Swift项目
            代码的自动翻新(混淆)、支持文件名、类名、方法名、属性名、添加混
            淆方法体、添加混淆属性、自动调用混淆方法等。。。功能强大而稳定。</p>
          <button @click="goToArticleDetail">查看详情</button>
        </div>
      </div>
      <div class="profile_container"><span>1</span></div>
    </div>
</template>

<script>
    export default {
        name: "HomeSection",
        methods: {
          goToArticleDetail: function () {
            alert(1)
          }
        }
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
      .article {
        display: flex;
        flex-direction: column;
        padding: 1em;
        background: white;
        h3 {
          .titleColor;
          font-size: 1rem;
          text-align: center;
        }
        .author_container {
          display: flex;
          justify-content: center;
          margin: 1rem;
          align-items: center;
          .grayColor;
          font-size: 15px;
          /*white-space: nowrap;*/
          h5 {
            margin: 0 10px;
            .mainColor;
            font-weight: 500;
          }
        }
        img {
          width: 100%;
          max-height: 400px;
        }
        p {
          color: #444443;
          margin: 1.2rem 0;
          font-size: .8rem;
          .fourLine;
        }

        button {
          .mainBgColor;
          width: 4rem;
          height: 2.2rem;
          color: white;
          font-size: .7rem;
          border-radius: 5px;
        }

      }
    }
    .profile_container {
      background: red;
      height: 100%;
      /*width: 10%;*/
      width: 0px;
      overflow: hidden;
    }
  }
</style>
