<template>
    <div class="home_section_container">
      <div class="article_container" v-for="article in articles">
        <div class="article">
          <h3>{{article.title}}</h3>
          <div class="author_container">
            <span>作者:</span>
            <h5>刘小二</h5>
            <span>{{article.create_time}}</span>
          </div>
          <img :src="article.article_icon" alt="">
          <p>{{article.article_content}}</p>
          <button @click="goToArticleDetail(article.id,$event)">查看详情</button>
        </div>
      </div>
      <div class="profile_container"><span>1</span></div>
    </div>
</template>

<script>
    export default {
        name: "HomeSection",
        data() {
          return {
            articles: []
          }
        },

        mounted() {
          this.http.get('articleList')
            .then((response)=>{
              if (response.status == 200) {
                if (response.data) {
                  this.articles = response.data.data
                }
              }
            }).catch(function (error) {
              console.log(error)
          })
        },

        methods: {
          goToArticleDetail: function (id,event) {
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
          }
        }
    }
</script>

<style scoped lang="less">
  @import "../css/common";
  .home_section_container {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    .bgColor;
    padding: 1.5rem;
    .article_container {
      flex: 1;
      margin-bottom: 1.5rem;
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
        }

      }
    }
    .profile_container {
      background: red;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
