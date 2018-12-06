<template>
  <div class="article_detail_container">
    <h1>{{article.title}}</h1>
    <mavon-editor v-model="article.article_content" style="height: 100%" defaultOpen="preview" :ishljs="true" class="edit"
                  :codeStyle="code_style" default_open="preview" :toolbarsFlag="false"  :subfield="false" :boxShadow="false" :box_shadow="false"  @change="change"/>
  </div>
</template>
<script>
  // import 'mavon-editor/dist/css/index.css'
  // // Local Registration
  // import { mavonEditor } from 'mavon-editor'

  import 'mavon-editor/dist/css/index.css'
  import 'mavon-editor/src/lib/css/markdown.css'
  export default {
    name: 'ArticleDetail',
    props:['id'],
    data() {
      return {
        code_style: 'xcode',
        article: {}
      }
    },
    components: {
      // mavonEditor
    },
    created() {
      this.http.get('articleById',{
        params: {
          articleId: this.id
        }
      }).then((response)=>{
        console.log(response.data)
        this.article = response.data.data
      })
    },
    methods: {
      change: function (a,b) {
        console.log(b)
      }
    }
  }
</script>
<style  lang="less">
  .article_detail_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    h1 {
      color: black;
      font-size: 30px;
      font-weight: 700;
    }
    /*height: 600px;*/
    .edit {
      flex: 1;
      text-align: left;
      box-shadow: none;
      .v-show-content {
        min-height: 80vh !important;
      }
      p {
        color: #2f2f2f;
      }
      .v-note-panel {
        box-shadow: 0 0 0 #333;
      }
    }
  }
</style>
