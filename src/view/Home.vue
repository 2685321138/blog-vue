<template>
<div>
  <div class="home-banner">
<!--    打字机-->
    <div class="blog-intro">
      {{ obj.output }} <span class="typed-cursor">|</span>
    </div>
    <div class="scroll-down" @click="scrollDown">
      <div color="#fff" class="scroll-down-effects">
      </div>
    </div>
  </div>
</div>
<!--  <div style="height: 10000px;width: 100px;"></div>-->
<!--  下方卡片文章列表(左侧文章，右侧个人信息)-->
<!--  左侧-->
  <el-row class="home-container">
    <el-col :span="16" >
      <el-card
          shadow="hover"
          class="animate__animated animate__zoomIn article-card"
          style="border-radius: 12px 8px 8px 12px"
          v-for="(item,index) in articleItem"
          :key="index"
      >
        <div  class="on-hover" :class="LeftorRight(index)" style="background-color: #fff;display: inline-block">
          <router-link :to="'/Article/'+item.id">
          <el-image
            :src="item.photo"
            style="width: 100%;
            height: 100%;"
            lazy
          />
          </router-link>
        </div>
        <div class="article-wrapper">
          <div style="line-height: 1.4">
<!--            标题-->
            <router-link :to="'/Articles/'+item.id">
              {{item.title}}
            </router-link>
          </div>
          <div class="article-info">
            <span v-if="item.isTop==true">
              <span style="color: red">
                <i class="iconfont iconzhiding">置顶</i>
              </span>
              <span class="separator">|</span>
            </span>
            <calendar class="icon_style"></calendar>
              {{formatter(item.createTime)}}
            <span class="separator">|</span>
                <router-link :to="'/categories/' + item.typeId">
                  <Management class="icon_style"></Management>
                  {{item.typeName}}
                </router-link>
            <span class="separator">|</span>
            <router-link
              :to="'/tags/' + item.id"
              style="display: inline-block"
              class="mr-1"
              v-for="tag of item.tagDTOList"

            >
              <i class="iconfont iconbiaoqian" />{{tag.tagName}}
            </router-link>
<!--            内容-->
            <div class="article-content">
              {{HtmlRemoveTag(item.context)}}
            </div>
          </div>
        </div>


      </el-card>
    </el-col>
<!--    右侧-->
    <el-col :span="7" style="margin-left: 10px" class="d-md-block d-none">

      <div class="blog-wrapper">
        <el-card shadow="hover" class="animate__animated animate__zoomIn blog-card mt-5">

        </el-card>
        <el-card shadow="hover" class="blog-card animate__animated animate__zoomIn mt-5 big">

        </el-card>
        <el-card shadow="hover" class="blog-card animate__animated animate__zoomIn mt-5">

        </el-card>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import {ListArticle} from "@/api/HomeRequest";
import EasyTyper from "easy-typer-js";
export default {
name: "Home",
  created() {
  this.init()
  },
  data(){
  return{
    articleItem:[
      {id:"https://tse2-mm.cn.bing.net/th/id/OIP-C.YPIQgoHSEVA2vVsgBSVpiQAAAA?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",text:"1",isTop:0,createTime:"2022/2/1",categoryId:"分类跳转id",categoryText:"分类1",tag:"标签",tagList:["标签1","标签2"],title:"标题1"},
      {id:"https://tse3-mm.cn.bing.net/th/id/OIP-C.8olSEek1RZjSQDgPizhxEAHaJ3?w=124&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",text:"1",isTop: 1,createTime:"2022/2/1",categoryId:"0",categoryText:"456",tag:"标签2",tagList:["标签1","标签2"],title:"标题2"},
      {id:"https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg",text:"1",isTop: 0,createTime:"2022/2/1",categoryId:"0",categoryText:"789",tag:"标签3",tagList:["标签1","标签2"],title:"标题3"},
      {id:"https://scpic.chinaz.net/files/pic/pic9/202009/apic27858.jpg",text:"1",isTop: 0,createTime:"2022/2/1",categoryId:"0",categoryText:"101112",tag:"标签4",tagList:["标签1","标签2"],title:"标题4"}
    ],
    obj: {
      output: "",
      isEnd: false,
      speed: 300,
      singleBack: false,
      sleep: 0,
      type: "rollback",
      backSpeed: 40,
      sentencePause: true
    },
  }
  },
  computed:{
    LeftorRight(index){
      return function(index) {
        if (index % 2 == 0) {
          return "article-cover left-radius";
        }
        return "article-cover right-radius";
      };
    }
  },
methods:{
  //清除html标签
  HtmlRemoveTag (str) {
    return str ? str.replace(/<[^>]+>/g,"") : ''
  },
  formatter (row) {
    const zoneDate = new Date(row).toJSON()
    const date = new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return date
  },
  scrollDown() {
    window.scrollTo({
      behavior: "smooth",
      top: document.documentElement.clientHeight
    });
  },
  init() {
    document.title = '首页'
    fetch("https://v1.hitokoto.cn?c=i")
        .then(res => {
          return res.json();
        })
        .then(({ hitokoto }) => {
          this.initTyped(hitokoto);
        });
    ListArticle().then((res)=>{
      this.articleItem = res.data
    }).catch((e)=>{
      this.$message.error("查询主页文章失败")
    })
  },
  initTyped(input, fn, hooks) {
    const obj = this.obj;
    const typed = new EasyTyper(obj, input, fn, hooks);
  },
}
}
</script>


<style scoped>

.scroll-down {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.scroll-down i {
  font-size: 2rem;
}
.scroll-down-effects {
  width: 70px;
  height: 50px;
  display: inline-block;
  background: url("../assets/photo/箭头.png") center no-repeat;
  background-size:110px 117px;
  -webkit-font-smoothing: antialiased;
  animation: scroll-down-effect 1.5s infinite;
}
.typed-cursor{
  opacity: 1;
  animation: blink 0.7s infinite
}
@keyframes blink{
  0%{
    opacity: 1
  }
  50%{
    opacity: 0
  }
  100%{
    opacity: 1
  }
}
.home-banner{
  position: absolute;
  top: 5.556vh;
  left: 0;
  right: 0;
  height: 94vh;
  background: url("../assets/photo/homeBackground.jpg") center
  center / cover no-repeat;
  background-color: #49b1f5;
  background-attachment: scroll;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s;
}
@keyframes scroll-down-effect {
  0% {
    /*top: -16px;*/
    /*bottom: 0px;*/
    background-position-y: -35px;
    opacity: 1;
  }
  50% {
    /*bottom: 50px;*/
    background-position-y: -30px;
    opacity: 0.4;
    filter: none;
  }
  100% {
    top: 0;
    background-position-y: -35px;
    opacity: 1;
  }
}
.article-wrapper {
  font-size: 14px;
}
.blog-intro {
    margin-top: 43vh;
    color: wheat;
    font-size: 2rem;
}

@media (min-width: 760px) {
  .home-container {
    max-width: 1300px;
    margin: calc(100vh - 48px) auto 28px auto;
    padding: 0 5px;
  }
  .article-card {
    display: flex;
    align-items: center;
    height: 300px;
    width: 100%;
    margin-top: 20px;
  }
  .article-card:hover .on-hover {
    transform: scale(1.1);
  }
  .article-wrapper {
    /*padding: 0 2.5rem;*/
    width: 65%;
  }
  .article-wrapper a {
    font-size: 1.5rem;
    text-decoration: none;
    transition: all 0.3s;
  }
  .article-cover{
    overflow: hidden;
    height: 100%;
    width: 45%;
  }
}
@media (max-width: 759px) {
  .home-container {
    width: 100%;
    margin: calc(100vh - 66px) auto 0 auto;
  }
  .article-card {
    margin-top: 1rem;
  }
  .article-cover {
    border-radius: 8px 8px 0 0 !important;
    height: 230px !important;
    width: 100%;
  }
  .article-cover div {
    border-radius: 8px 8px 0 0 !important;
  }
}

.blog-wrapper {
  position: sticky;
  top: 10px;
}
.blog-card {
  line-height: 2;
  padding: 1.25rem 1.5rem;
}

.left-radius {
  border-radius: 8px 0 0 8px !important;
  order:0;
}
.right-radius {
  border-radius: 0 8px 8px 0 !important;
  order: 1;
}
.el-card ::v-deep .el-card__body {
  padding: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: powderblue;
}
.on-hover {
  transition: all 0.6s;
}
.author-avatar {
  transition: all 0.5s;
}
.author-avatar:hover {
  transform: rotate(360deg);
}
.article-info {
  font-size: 95%;
  color: #858585;
  line-height: 2;
  margin: 0.375rem 0;
}
.article-info a {
  font-size: 95%;
  color: #858585 !important;
}
.icon_style{
  width: 1rem;
  height: 1rem;
}
.article-content {
  line-height: 3;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.article-wrapper a:hover {
  color: #8e8cd8;
}
</style>
