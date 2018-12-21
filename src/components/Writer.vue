<template>
  <div class="writer">
    <Update_Tag @update_tagName="update_tagName" v-if="isShow_updateTag"/>
    <Update_Tag @login="login" v-if="isLogin" title="登陆"/>
   <div class="login_container" ref="container">
     <Toast :text="errMsg" v-show="errMsg.length"/>
     <div class="notebooks_container" >
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
             :class="notebook_currentIndex==index?'notebook_select':''">
           <span>{{tag.tagName}}</span>
           <div class="update_container">
             <i v-show="notebook_currentIndex==index" @click="update_tag(notebook_currentIndex)">修改</i>
             <b v-show="notebook_currentIndex==index" @click="delete_tag">删除</b>
           </div>
         </li>
       </ul>
     </div>
     <div class="notes_container">
       <span v-show="isNoteEmpty" class="empty">空空如也</span>
       <div class="new_notes_container" @click="postArticle">
         + 新建文章
       </div>
       <ul>
         <li v-for="(article, index) in articles" :class="note_currentIndex == index ? 'note_select' : '' "
             @click="note_click(index)">
           <h1>{{article.title}}</h1>
           <span>{{article.article_content ? article.article_content:''}}</span>
           <div class="time_container">
             <span>字数: {{article.article_content? article.article_content.length:0}}</span>
             <span>{{'创建日期:&nbsp&nbsp' + article.create_time ? article.create_time:''}}</span>
             <i v-show="note_currentIndex == index" @click="delete_article(index)">删除</i>
           </div>
         </li>
       </ul>
     </div>
     <div class="edit_container">
       <input type="file" value="上传封面" @change="uploadFile" ref="file">
       <input type="text" class="titleInput" v-model="title">
       <mavon-editor v-model="msg" style="height: 100%" defaultOpen="preview" default_open="preview" :ishljs="true"
                     class="edit"
                     :codeStyle="code_style" :toolbarsFlag="true" :subfield="false" :boxShadow="true" @change="change" ref="md" @imgAdd="$imgAdd" @imgDel="$imgDel"
                     @save="uploadimg"
       />
     </div>
     <span v-show="isNoteEmpty" class="msgEmpty">空空如也</span>
     <i class="goArticleDetail" @click="goToArticleDetail">发布</i>
   </div>
  </div>

</template>
<script>


  import Toast from './Toast'
  import Update_Tag from './UpdateTagName'
  export default {
    name: 'editor',
    data() {
      return {
        code_style: 'vs2015',
        tags: [],
        articles: [],
        note_show: false,
        errMsg: '',
        notebook_currentIndex: -1,
        note_currentIndex: 0,
        isNoteEmpty: false,
        msg: '',
        title: '',
        url: '',
        tagName: '',
        isShow_updateTag: false,
        img_file: {},
        pw: '',
        isLogin: false
      }
    },
    components: {
      // mavonEditor
      Toast,
      Update_Tag
    },
    mounted() {
      this.getTags()
      console.log(this.$refs.container);
      this.$refs.container.addEventListener('click', function (event) {
          this.pw == '123' ? this.isLogin = false : (this.errMsg = '请先登陆', this.isLogin = true , event.stopPropagation(), event.preventDefault());

      }.bind(this), true)


    },
    watch: {
      articles(newA, oldA) {
        if (newA == undefined) return
        if (newA.length == 0) {
          this.errMsg = '空空如也'
          this.msg = ''
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
        }
        this.isNoteEmpty = !newA.length
      },
      errMsg(newM,oldM) {
        if (newM && newM.length) {
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
        }
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
              this.tagClick(this.tags.length - 1)
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
        // alert(2);
        if (index == this.notebook_currentIndex) return;
        this.notebook_currentIndex = index
        this.note_currentIndex = 0
        var tag_id = this.tags[index].id

        this.http.post('articleList', {
          tagId: tag_id
        }).then((response) => {
          if (response.data) {
            this.articles = response.data.data
            console.log(this.articles)
            if (this.articles == undefined) return
            if (this.articles.length > 0) {
              this.note_click(0)
            }
          }
        })
      },
      note_click: function (index) {
        this.note_currentIndex = index
        var article = this.articles[index]
        if (article == undefined ) return;
        this.msg = article.article_content ? article.article_content:''
        this.title = article.title ? article.title: ''
        this.tagName = this.tags[this.notebook_currentIndex].tagName
      },
      goToArticleDetail: function () {

        var art = null

        if (this.articles && this.articles.length) {
          art = this.articles[this.note_currentIndex]
        }

        if (this.title == undefined ||  this.title.length == 0) {
          this.errMsg = '标题不能为空'
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
          return
        }

        if ((this.url == undefined ||  this.url.length == 0)) {
          console.log(art)
          if (art == null || !art.article_icon) {
            this.errMsg = '必须上传封面图片'
            setTimeout(() => {
              this.errMsg = ''
            }, 2000)
            return
          }
        }

        if (this.msg == undefined ||  this.msg.length == 0) {
          this.errMsg = '内容不能为空'
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
          return
        }
        var id = ''
        if (this.articles && this.articles.length) {
          id = this.articles[this.note_currentIndex].id
        }
        this.http.post('postArticle',{
          title: this.title,
          url: this.url,
          content: this.msg,
          tag: this.tagName,
          id: id
        }).then((response)=> {
          if (response.data.code == 0) {

            this.errMsg = '创建成功'
            setTimeout(() => {
              this.errMsg = ''
            }, 2000)

            if (this.articles == undefined) return

            if (this.articles.length) {
              if (this.note_currentIndex < this.articles.length) {
                var article = this.articles[this.note_currentIndex]
                console.log(article)
                article.id = response.data.data.id
                this.$router.push({
                  name: 'Article',
                  params: {
                    id: article.id
                  }
                })
              }
            }
          }
        })



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
              var str = '1'

                if (response.data.code === 0) {
                  console.log(response.data)
                  this.url = response.data.data.url.split(',')[0]
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
      postArticle: function () {
        console.log(this.articles)
        if (this.articles == undefined) {
          this.articles = []
        }
        console.log(this.articles)
        var index = this.articles.push({
          title: new Date().toLocaleDateString(),
          article_content: '',
          create_time: new Date().toLocaleString()
        })

        // this.title = new Date().toLocaleDateString()
        this.note_click(index - 1)

      },
      update_tagName: function(name) {
        if (name == null || name.length == 0) {
          this.isShow_updateTag = false
          return
        }
        var tag = this.tags[this.notebook_currentIndex]
        if (tag) {
          var tagName = name
          var id = tag.id
          this.http.post('update_tag',{
            tagName:tagName,
            id:id,
          }).then((response)=> {
            this.isShow_updateTag = false
            if (response.data.code == 0) {
              this.errMsg = '修改成功'
              tag.tagName = name
            }else  {
              this.errMsg = response.data.errMsg
            }
          }).catch(()=> {
            this.isShow_updateTag = false
          })
        }
      },
      login: function(name) {
        this.pw = name;
        this.isLogin = false;
        if (name === '123') {

        }else {
          this.errMsg = '密码不正确';
        }
      },
      update_tag: function (index) {
        this.isShow_updateTag = true
      },
      delete_tag: function () {
        var tag = this.tags[this.notebook_currentIndex]
        if (tag) {
          var id = tag.id
          this.http.post('delete_tag',{
            id:id,
          }).then((response)=> {
            if (response.data.code == 0) {
              this.errMsg = response.data.data
              this.tags.splice(this.notebook_currentIndex,1)
              this.notebook_currentIndex = -1
              this.tagClick(0)
            }else  {
              this.errMsg = response.data.errMsg
            }
          }).catch(()=> {
          })
        }
      },
      delete_article: function (index) {
        var article = this.articles[index]

        if (article.id) {
          this.http.post('delete_article',{
            id: article.id
          }).then((respose) => {
            if (respose.data.code == 0) {
              this.errMsg = respose.data.data
              this.articles.splice(index,1)
            }else {
              this.errMsg = respose.data.errMsg
            }
          })
        }else {
          this.note_currentIndex = 0
          this.articles.splice(index,1)

        }
      },

      // 绑定@imgAdd event
      $imgAdd(pos, $file){
        // 缓存图片信息
        this.img_file[pos] = $file;
      },
      $imgDel(pos){
        delete this.img_file[pos];
      },
      uploadimg($e){
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        console.log(this.img_file)
        for(var _img in this.img_file){
          formdata.append(_img, this.img_file[_img]);
        }


        // 添加请求头
        // this.http.post('articleIcon', formData, {
        //   headers: {'Content-Type': 'multipart/form-data'}
        // }).

        this.http({
          url: 'articleIcon',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
          /**
           * 例如：返回数据为 res = [[pos, url], [pos, url]...]
           * pos 为原图片标志（0）
           * url 为上传后图片的url地址
           */
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          console.log(res.data)
            if (res.data.code != 0) return;
          var arr = res.data.data.url.split(',')
          var keys = Object.keys(this.img_file)
          arr.forEach(function (value, index) {
            // $vm.$img2Url 详情见本页末尾
            console.log(keys[index])
            console.log(value)
            if (value.length == 0) {
              return;
            }
            this.$refs.md.$img2Url(keys[index],value);
          },this)
        })
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
    min-width: 1000px;

    .login_container {
      width: 100%;
      height: 100%;
      display: flex;
    }


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
      cursor: pointer;
    }
    /*height: 600px;*/
    .notebooks_container {
      flex: 1.5;
      min-width: 223px;
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
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            /*max-width: 100px;*/
            /*overflow: hidden;*/
          }
          .update_container {
            display: flex;
            i {
              .mainColor;
              font-size: 13px;
            }
            b {
              color: red;
              font-size: 13px;
              margin-right: 15px;
            }
          }
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
            position: relative;
            font-size: 12px;
            span {
              margin-right: 20px;

            }
            i {
              position: absolute;
              right: 15px;
              color: red;
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
