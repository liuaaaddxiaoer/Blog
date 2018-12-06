<template>
  <div class="writer">
    <Toast :text="errMsg" v-show="errMsg.length"/>
    <div class="notebooks_container">
      <div class="goHome" @click="goToHome"><span>回首页</span></div>
      <div class="new_notebook_container">
        <div class="new_topButton_container" @click="newNoteClick">
          <i>+</i>
          <span>新建文集</span>
        </div>
        <div class="new_tag_container" v-show="note_show">
          <input type="text" placeholder="请输入文集名..." autofocus ref="tag_input">
          <div class="new_tag_btns_container">
            <i @click="new_tag_submit">提交</i>
            <b @click="new_tag_cancel">取消</b>
          </div>
        </div>
      </div>
      <ul>
        <li v-for="(tag,index) in tags" @click="tagClick(index)"
            :class="notebook_currentIndex==index?'notebook_select':''">{{tag.tagName}}
        </li>
      </ul>
    </div>
    <div class="notes_container">
      <span v-show="isNoteEmpty" class="empty">空空如也</span>
      <div class="new_notes_container">
        + 新建文章
      </div>
      <ul>
        <li v-for="(article, index) in articles" :class="note_currentIndex == index ? 'note_select' : '' "
            @click="note_click(index)">
          <h1>{{article.title}}</h1>
          <span>{{article.article_content}}</span>
          <div class="time_container">
            <span>字数: {{article.article_content.length}}</span>
            <span>{{'创建日期:&nbsp&nbsp' + article.create_time}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="edit_container">
      <input type="file" value="上传封面" @change="uploadFile" ref="file">
      <input type="text" :value="title" class="titleInput">
      <mavon-editor v-model="msg" style="height: 100%" defaultOpen="preview" default_open="preview" :ishljs="true"
                    class="edit"
                    :codeStyle="code_style" :toolbarsFlag="true" :subfield="false" :boxShadow="true" @change="change"/>
    </div>
    <span v-show="isNoteEmpty" class="msgEmpty">空空如也</span>
    <i class="goArticleDetail" @click="goToArticleDetail">发布</i>
  </div>

</template>
<script>
  // import 'mavon-editor/dist/css/index.css'
  // // Local Registration
  // import { mavonEditor } from 'mavon-editor'

  import 'mavon-editor/dist/css/index.css'
  import 'mavon-editor/src/lib/css/markdown.css'
  import Toast from './Toast'

  export default {
    name: 'editor',
    data() {
      return {
        code_style: 'xcode',
        tags: [],
        articles: [],
        note_show: false,
        errMsg: '',
        notebook_currentIndex: -1,
        note_currentIndex: 0,
        isNoteEmpty: false,
        msg: '',
        title: '',
      }
    },
    components: {
      // mavonEditor
      Toast
    },
    created() {
      this.getTags()
    },
    watch: {
      articles(newA, oldA) {
        console.log(newA)
        if (newA.length == 0) {
          this.errMsg = '空空如也'
          this.msg = ''
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
        }
        this.isNoteEmpty = !newA.length
      }
    },
    methods: {
      getTags: function () {
        this.http.get('tags')
          .then((response) => {
            if (response.data) {
              this.tags = response.data.data;
              console.log(this.tags)
              // alert(this.tags.length);
              if (this.tags.length > 0) {
                this.tagClick(0)
              }
            } else {
              alert(response.data.errMsg);
            }
          })
      },
      change: function (a, b) {
        // console.log(b)
      },
      goToHome: function () {
        this.$router.push('/')
      },
      newNoteClick: function () {
        this.note_show = true
      },
      new_tag_cancel: function () {
        this.$refs.tag_input.value = ''
        this.note_show = false
      },
      new_tag_submit: function () {
        var tagName = this.$refs.tag_input.value
        if (tagName.length == 0) {
          this.errMsg = 'tag不能为空'
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
        } else {
          this.http.post('new_tag', {
            tagName: tagName
          }).then((response) => {
            if (response.data && response.data.code == 0) {
              // 添加成功
              this.errMsg = '创建成功'
              this.$refs.tag_input.value = ''
              setTimeout(() => {
                this.errMsg = ''
              }, 2000)
              this.getTags()
              this.note_show = false
            } else {
              console.log(response.data.errMsg)
              this.errMsg = response.data.errMsg
              setTimeout(() => {
                this.errMsg = ''
              }, 2000)
            }
          })
        }
      },
      tagClick: function (index) {
        if (index == this.notebook_currentIndex) return;
        this.notebook_currentIndex = index
        this.note_currentIndex = 0
        var tag_id = this.tags[index].id

        this.http.post('articleList', {
          tagId: tag_id
        }).then((response) => {
          if (response.data) {
            this.articles = response.data.data
            if (this.articles.length > 0) {
              this.note_click(0)
            }
          }
        })
      },
      note_click: function (index) {
        this.note_currentIndex = index
        var article = this.articles[index]
        this.msg = article.article_content
        this.title = article.title
      },
      goToArticleDetail: function () {
        if (this.articles.length) {
          if (this.note_currentIndex < this.articles.length) {
            var article = this.articles[this.note_currentIndex]
            console.log(article)
            this.$router.push({
              name: 'Article',
              params: {
                id: article.id
              }
            })
          }
        }
      },
      uploadFile: function () {
        var file = this.$refs.file.files[0]
        if (file) {
          if (file.type.startsWith('image/')) {
            var formData = new FormData()
            formData.append('file',file,file.name)
            formData.append('thunk','0')

            // 添加请求头
            this.http.post('articleIcon', formData, {
              headers: {'Content-Type': 'multipart/form-data'}
            }).then(response => {
                if (response.data.code === 0) {
                  console.log(response.data())
                }
                console.log(response.data)
              })

          }else {
            this.errMsg = '只能上传图片'
            setTimeout(() => {
              this.errMsg = ''
            }, 2000)
          }
        }
      },
    }
  }
</script>
<style lang="less">
  @import "../css/common";

  .writer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    max-height: 100vh !important;
    height: 100vh;
    position: relative;
    .msgEmpty {
      position: absolute;
      color: #333;
      right: 30%;
      top: 40%;
      transform: translate(-50%, 0);
      z-index: 10000;
      font-size: 15px;
    }
    .goArticleDetail {
      color: white;
      .mainBgColor;
      border-radius: 50%;
      width: 55px;
      height: 55px;
      font-size: 16px;
      position: absolute;
      line-height: 55px;
      right: 100px;
      bottom: 100px;
      z-index: 10000;
    }
    /*height: 600px;*/
    .notebooks_container {
      flex: 1.5;
      background: #404040;
      overflow: scroll;
      overflow-x: hidden;
      color: #f2f2f2;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      font-size: 15px;
      padding: 40px 0;
      .goHome {
        display: flex;
        margin-bottom: 20px;
        align-items: center;
        span {
          .mainColor;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          border: 1px solid #ea6f5a;
          width: 100%;
          margin: 0 20px;
        }
      }
      .new_notebook_container {
        margin: 20px 0;
        display: flex;

        flex-direction: column;
        padding: 0 25px;
        justify-content: flex-start;
        align-items: flex-start;
        .new_topButton_container {
          width: 100%;
          text-align: left;
          span {
            margin-left: 5px;
          }
        }
        .new_tag_container {
          display: flex;
          width: 100%;
          flex-direction: column;
          input {
            height: 30px;
            text-indent: 5px;
            margin: 6px;
            background: #666;
            color: #f2f2f2;

            &::-webkit-input-placeholder {
              color: #999;
            }
          }
          .new_tag_btns_container {
            display: flex;
            align-items: center;
            margin-top: 10px;
            i {
              color: #42c02e;
              height: 28px;
              border-radius: 14px;
              width: 58px;
              line-height: 30px;
              border: 1px solid #42c02e;
            }
            b {
              color: #666;
              margin-left: 15px;
            }
          }
        }
      }

      ul {
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: center;
        li {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-indent: 25px;
          cursor: pointer;
          font-size: 17px;
          user-select: none;
        }
        li:hover {
          background: #666;
        }
        li.notebook_select {
          background: #666;
          border-left: 5px solid #ea6f5a;
        }
      }
    }
    .notes_container {
      display: flex;
      flex-direction: column;
      position: relative;
      .empty {
        position: absolute;
        color: #333;
        left: 50%;
        top: 40%;
        transform: translate(-50%, 0);
        z-index: 1000;
      }
      width: 30%;
      flex: 2.5;
      background: white;
      overflow-y: scroll;
      font-size: 15px;
      cursor: pointer;
      .new_notes_container {
        color: #595959;
        border-bottom: 1px solid #eee;
        height: 50px;
        line-height: 50px;

      }
      ul {
        display: flex;
        flex-direction: column;
        li {
          &:hover {
            background: #e6e6e6;
          }
          padding: 15px;
          border-bottom: 1px solid #eee;
          text-align: left;
          h1, span {
            .oneLine;
            color: #595959;
            font-size: 17px;
          }
          h1 {
            color: #333;
            margin-bottom: 10px;
            font-weight: bold;
            white-space: nowrap;
          }
          span {
            font-size: 15px;
          }
          .time_container {
            display: flex;
            margin-top: 10px;
            span {
              margin-right: 20px;
              font-size: 12px;
            }
          }
        }
        li.note_select {
          background: #e6e6e6;
          border-left: 5px solid #ea6f5a;
        }
      }
    }
    .edit_container {

      flex: 6;
      display: flex;
      flex-direction: column;
      background-color: white;
      /*padding-top: 20px;*/

      .titleInput {
        margin-top: 20px;
        margin-bottom: 20px;
        color: #595959;
        font-size: 30px;
        margin-right: 30px;
      }
      input {
        margin-left: 30px;
        margin-top: 10px;
      }

      .edit {
        max-height: 100vh;
        overflow: hidden;
        text-align: left;
        box-shadow: none;
        .v-note-panel {
          box-shadow: 0 0 0 #333;
        }
      }
    }

  }
</style>
