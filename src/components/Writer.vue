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
        <li v-for="(tag,index) in tags" @click="tagClick(index)">{{tag.tagName}}</li>
      </ul>
    </div>
    <div class="notes_container">
      <div class="new_notes_container">
        + 新建文章
      </div>
      <ul>
        <li v-for="article in articles">
          <h1>{{article.title}}</h1>
          <span>{{article.article_content}}</span>
          <div class="time_container">
            <span>字数: {{article.article_content.length}}</span>
            <span>{{'创建日期:&nbsp&nbsp' + article.create_time}}</span>
          </div>
        </li>
      </ul>
    </div>
    <mavon-editor v-model="msg" style="height: 100%" defaultOpen="preview" :ishljs="true" class="edit"
                  :codeStyle="code_style"  :toolbarsFlag="false"  :subfield="false" :boxShadow="true"  @change="change"/>
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
        notebook_currentIndex: 0,
        msg: '1. babel可以进行代码的转换\n' +
          '2. a 会报错 b不会 用let修饰的变量只在代码块内起作用\n ![百度](https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2920084749,2018893236&fm=58&s=39C718720E8EBE011B398BAC0300F024&bpow=121&bpoh=75)'  +
          '用var修饰会将变量提前\n' +
          '```\n' +
          '{\n' +
          '    let a = 10;\n' +
          '    var b = 20;\n' +
          '}\n' +
          '\n' +
          'console.log(a);\n' +
          'console.log(b);\n' +
          '```\n' +
          '```\n' +
          'function test2() {\n' +
          '    // 用let修饰只在代码块内所以结果会是报错的\n' +
          '    for(var  i=0;i<10;i++){\n' +
          '\n' +
          '    }\n' +
          '    console.log(i);\n' +
          '}\n' +
          'test2();\n' +
          '```\n' +
          '结果是6如果用var修饰是10\n' +
          '```\n' +
          'function test3() {\n' +
          '    var a = [];\n' +
          '    for(let i =0;i<10;i++){\n' +
          '        a[i] = function(){\n' +
          '            console.log(i);\n' +
          '        }\n' +
          '    }\n' +
          '    a[6]();\n' +
          '}\n' +
          '\n' +
          'test3();\n' +
          '```\n' +
          '不存在变量的提升\n' +
          '```\n' +
          'function test4() {\n' +
          '    console.log(b);\n' +
          '    var b = 10;\n' +
          '    console.log(a);\n' +
          '    let a= 10;\n' +
          '}\n' +
          'test4();\n' +
          '```\n' +
          '暂时性死区  变量在代码块内如果用let const修饰那么即使有全局的变量也不允许提前进行使用\n' +
          '```\n' +
          'function test5() {\n' +
          '\n' +
          '    var a= 10;\n' +
          '    function test() {\n' +
          '        a = 20;\n' +
          '        console.log(a);\n' +
          '        let a = 1;\n' +
          '    }\n' +
          '    test();\n' +
          '}\n' +
          '```\n' +
          '不允许重复声明\n' +
          '```\n' +
          'function test6(arg) {\n' +
          '    let arg = 10;\n' +
          '}\n' +
          'test6()\n' +
          '```\n' +
          '\n' +
          'const 修饰的是常量无法修改而且必需在定义的时候进行初始化\n' +
          '```\n' +
          'function test8() {\n' +
          '    const a = 10;\n' +
          '    a = 20;\n' +
          '    const b;\n' +
          '}\n' +
          '```\n' +
          '\n' +
          'const 修改的仅仅是指针不能修改如果const修饰的变量指的是一个对象类型那么对象的属性等是可以进行修改的\n' +
          '```\n' +
          'function test9() {\n' +
          '    const a = {\n' +
          '        "username" : \'liuxiaoer\',\n' +
          '        \'age\':20\n' +
          '    };\n' +
          '\n' +
          '    a.username = 20;\n' +
          '}\n' +
          '```\n' +
          '如果想真的让指向的对象无法修改可以使用Object.freeze();\n' +
          '```\n' +
          ' const b = Object.freeze({\'username\':20});\n' +
          '    b.username = 10;\n' +
          '    console.log(b);\n' +
          '```\n' +
          '如果对象的属性也是一个对象\n' +
          '```\n' +
          'var constantize = (obj) => {\n' +
          '  Object.freeze(obj);\n' +
          '  Object.keys(obj).forEach( (key, i) => {\n' +
          '    if ( typeof obj[key] === \'object\' ) {\n' +
          '      constantize( obj[key] );\n' +
          '    }\n' +
          '  });\n' +
          '};\n' +
          '\n' +
          '```\n' +
          '\n' +
          '全局对象属性  es6有6创建变量的方法 es5有var和function es6为了兼容规定全局变量被var 或funtion的是默认是global的属性其他的不是\n' +
          '```\n' +
          'function test11() {\n' +
          '   let a = 10;\n' +
          '    console.log(global.a);\n' +
          '}\n' +
          '```\n' +
          '\n' +
          '> 阮一峰的博客 let 和const  http://es6.ruanyifeng.com/#docs/let\n'
      }
    },
    components: {
      // mavonEditor
      Toast
    },
    created() {
      this.getTags()
      this.notebook_currentIndex = 0;
    },
    methods: {
      getTags: function() {
        this.http.get('tags')
          .then((response)=>{
            if (response.data) {
              this.tags = response.data.data;
              console.log(this.tags)
            }else {
              alert(response.data.errMsg);
            }
          })
      },
      change: function (a,b) {
        // console.log(b)
      },
      goToHome: function () {
        this.$router.push('/')
      },
      newNoteClick: function () {
        this.note_show = true
      },
      new_tag_cancel: function() {
        this.$refs.tag_input.value = ''
        this.note_show = false
      },
      new_tag_submit: function () {
        var tagName = this.$refs.tag_input.value
        if (tagName.length == 0) {
          this.errMsg = 'tag不能为空'
          setTimeout(()=>{this.errMsg = ''},2000)
        }else {
          this.http.post('new_tag',{
            tagName: tagName
          }).then((response)=> {
            if (response.data && response.data.code == 0) {
              // 添加成功
              this.errMsg = '创建成功'
              this.$refs.tag_input.value = ''
              setTimeout(()=>{this.errMsg = ''},2000)
              this.getTags()
              this.note_show = false
            }else {
              console.log(response.data.errMsg)
              this.errMsg = response.data.errMsg
              setTimeout(()=>{this.errMsg = ''},2000)
            }
          })
        }
      },
      tagClick: function (index) {
        var tag_id = this.tags[index].id
        this.http.post('articleList',{
          tagId: tag_id
        }).then((response)=>{
          if (response.data ) {
            this.articles = response.data.data
          }
        })
      }
    }
  }
</script>
<style  lang="less">
  @import "../css/common";
  .writer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    max-height: 100vh !important;
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
      }
    }
    .notes_container {
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
          padding: 15px;
          border-bottom: 1px solid #eee;
          text-align: left;
          h1,span {
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
      }
    }
    .edit {
      max-height: 100vh;
      overflow: hidden;
      flex:6;
      text-align: left;
      box-shadow: none;
      .v-note-panel {
        box-shadow: 0 0 0 #333;
      }
    }
  }
</style>
