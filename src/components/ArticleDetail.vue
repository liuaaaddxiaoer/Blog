<template>
  <div class="article_detail_container">
    <h1>标题</h1>
    <mavon-editor v-model="msg" style="height: 100%" defaultOpen="preview" :ishljs="true" class="edit"
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
    data() {
      return {
        code_style: 'xcode',
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
    /*height: 600px;*/
    .edit {
      text-align: left;
      box-shadow: none;
      .v-note-panel {
        box-shadow: 0 0 0 #333;
      }
    }
  }
</style>
