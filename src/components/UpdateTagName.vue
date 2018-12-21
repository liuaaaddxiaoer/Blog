<template>
    <div class="update_tag_container">
      <div class="inner_container">
        <span>{{this.title ? this.title : '请输入新文集名'}}</span>
        <input type="text" value="Macos" v-model="tagName">
        <div class="btn_container">
          <i @click="cancelClick">取消</i>
          <b @click="confirmClick">确认</b>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "UpdateTagName",
        props: ['name','title'],
        data() {
          return {
            tagName: this.name
          }
        },
        methods: {
          cancelClick: function () {
            this.$emit('update_tagName', null)
            this.$emit('login', null)
          },
          confirmClick: function () {
            this.$emit('update_tagName', this.tagName)
            this.$emit('login', this.tagName)
          },
        }
    }
</script>

<style scoped lang="less">
  .update_tag_container {
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,.65f);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20000;
    .inner_container {
      width: 321px;
      /*height: 186px;*/
      background: white;
      position: absolute;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,.2);
      left: 50%;
      top: 50%;
      animation: show 1s ease-in-out;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      padding: 16px;
      span {
        color: #4d4d4d;
        font-size: 18px;
        font-weight: 500;
        line-height: 30px;
        height: 30px;
      }
      input {
        border: 1px solid #ccc;
        padding: 5px 10px;
        border-radius: 4px;
        margin: 20px 0;
        height: 25px;
        font-size: 17px;
      }
      .btn_container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 14px;
        i {
          color: #595959;

          /*background: red;*/
          margin-right: 15px;
        }
        b {
          color: #42c02e;
          border: 1px solid #42c02e;
          width: 58px;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;

        }
      }
    }

  }
  @keyframes show {
    from {
      top: 30%;
      opacity:0;
    }
    to {
      top: 50%;
      opacity: 100%;
    }
  }
</style>
