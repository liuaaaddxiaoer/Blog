<template>
  <div class="home_section_container">
    <div class="tag_container">
      <ul>
        <span>标签:</span>
        <li><a href="javascript:" @click="getArticles">全部</a></li>
        <li v-for="(tag,index) in tags" @click="tagClick(index)"><a href="javascript:">{{tag.tagName}}</a></li>
      </ul>
    </div>
    <div class="section_container">
      <div class="container">
        <div class="home_article_container" v-for="article in articles">
          <img src="../assets/empty.jpeg" alt="" class="emptyImg" v-show="isEmpty">
          <h3>{{article.title}}</h3>
          <div class="author_container">
            <span>标签:</span>
            <h5>{{article.tag_name}}</h5>
            <span>{{article.create_time}}</span>
          </div>
          <img :src="article.article_icon" alt="">
          <p>{{article.article_content}}</p>
          <button @click="goToArticleDetail(article.id,$event)">查看详情</button>
        </div>
      </div>
      <div class="profile_container" >
        <h3>作者简介</h3>
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544020922600&di=36fb03e2cf18e88b85ba51d346448664&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01698a563b924c6ac7259e0fd284ab.jpg"
          alt="">
        <p>目前主要从事移动端开发，坐标北京，现任职中公教育iOS高级开发工程师。</p>
        <p>技术栈：iOS(OC/Swift)、H5、Python、Vue；熟悉React-Native、React等</p>
        <div class="info_container">
          <p>邮箱: oneenddi@163.com</p>
          <p>微信: smallTwoiOS</p>
          <p>QQ: 804576234</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeSection",
    data() {
      return {
        articles: [],
        tags: [],
        currentTagIndex: 0,
        isEmpty: false
      }
    },
    watch: {
      articles(newA, oldA) {
        this.isEmpty = !newA.length
      }
    },
    created() {
      this.getArticles()

      this.http.get('tags')
        .then((response) => {
          this.tags = response.data.data;
        })
    },

    methods: {
      goToArticleDetail: function (id, event) {
        this.$router.push({
          name: 'Article',
          params: {
            id: id
          }
        }, function (a) {
          console.log(a)
        }, function (b) {
          console.log(b)
        })
      },
      tagClick: function (index) {
        this.http.post('articleList', {
          tagId: this.tags[index].id
        }).then((response) => {
          if (response.data) {
            this.articles = response.data.data
            console.log(this.articles)
          }
        })
      },
      getArticles() {
        this.http.get('articleList')
          .then((response) => {
            if (response.status == 200) {
              this.articles = response.data.data
            }
          }).catch(function (error) {
          console.log(error)
        })
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../css/common";

  @media all and (min-width: 1024px) {
    .home_section_container {
      margin: 0 auto;
      width: 88%;
    }
  }

  .home_section_container {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    .tag_container {
      ul {
        display: flex;
        margin-bottom: 20px;
        align-items: center;
        flex-wrap: wrap;
        font-size: .8rem;
        li {
          margin-left: 20px;
          text-align: center;
        }
      }
    }
    .section_container {
      display: flex;
      flex-direction: row;
      align-items: center;
      .container {
        flex: 3;
        display: flex;
        flex-direction: column;
        .home_article_container {
          min-height: 200px;
          position: relative;
          .emptyImg {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 40%;
            z-index: 1;
          }
          display: flex;

          flex-direction: column;

          display: flex;
          flex-direction: column;
          margin-bottom: 1.5rem;

          display: flex;
          flex-direction: column;
          padding: 0em;
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
            max-height: 10rem;
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
            cursor: pointer;
            /*align-self: flex-end;*/
          }
        }
      }


      .profile_container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-left: 30px;
        background: white;
        padding: 20px;
        flex: 1;
        /*background-color: red;*/
        h3 {
          font-weight: 400;
          font-size: 20px;
          color: #404040;
          padding-bottom: 12px;
          border-bottom: 1px solid #eee;
        }
        img {
          width: 120px;
          height: 120px;
          margin-top: 20px;
        }
        p {
          margin-top: 15px;
          color: #505050;
          font-size: 15px;
          line-height: 23px;
        }
        .info_container {
          display: flex;
          flex-direction: column;
          p {
            margin-top: 0px;
          }
          p:first-child {
            margin-top: 15px;
          }
        }
      }
      @media all and(max-width: 1024px) {
        .profile_container {
          height: 0;
          flex: 0;
          width: 0;
          padding: 0;
          margin: 0;
        }
        .container {
          width: 100%;
        }
      }
      /*@media all and(min-width: 1025px) {*/
        /*.profile_container {*/
          /*!*min-height: 415px;*!*/
          /*!*max-height: 450px;*!*/
        /*}*/
      /*}*/
    }

  }
</style>
