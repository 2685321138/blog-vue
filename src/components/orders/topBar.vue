<template>
<div class="bigcontainer" :class="hide">
    <div class="container-left">
      <router-link to="/" class="blog-name">
        xxx的空间
      </router-link>
    </div>
    <div style="float: right;display: flex;flex-direction: row">
      <div id="open" class="menu-item" @click="openSearch">
        <a ><i class="iconfont iconsousuo" /> 搜索</a>
      </div>
      <div class="menu-item">
        <router-link to="/">
          <i class="iconfont iconzhuye" /> 首页
        </router-link>
      </div>

      <div class="menu-item">
        <router-link to="/archives">
          <i class="iconfont iconguidang" /> 归档
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/categories">
          <i class="iconfont iconfenlei" /> 分类
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/tags">
          <i class="iconfont iconbiaoqian" /> 标签
        </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/about">
          <i class="iconfont iconzhifeiji" /> 关于
        </router-link>
      </div>
    </div>


</div>

</template>

<script>
export default {
  name: "topBar",
  data(){
    return{
    hide:'nothide'
    }
},
  computed:{
    searchFlag: {
      set(value) {
        this.$store.commit('setSearchFlag',value)
      },
      get() {
        return this.$store.state.searchFlag;
      }
    },
  },
  created() {
    window.addEventListener("scroll",this.scroll)
  },
  methods:{
    scroll() {
      const that = this;
      let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.hide = "hide";
      } else {
        that.hide = "nothide";
      }
    },
    openSearch(){
      this.$store.commit('setSearchFlag',true)
      console.log(this.$store.state.searchFlag)
    }
  }
}

</script>

<style scoped>

.blog-name{
  float: left;
  line-height: 60px;
  height: 60px;
  font-family: "";
}
.bigcontainer{
  float: left;
  display: flex;
  flex-direction: row;
  background-color: ghostwhite;
  opacity: 0.8;
  width: 100%;
  height: 60px;
}
.menu-item:hover{
  background-color: powderblue;
}
.container-left * {
  text-decoration: none;
}
.menu-item *{
  text-decoration: none;
}
.menu-item{
  display: flex;
  align-items: center;
  height: var(--el-menu-item-height);
  line-height: var(--el-menu-item-height);
  font-size: var(--el-menu-item-font-size);
  color: var(--el-menu-text-color);
  padding: 0 var(--el-menu-base-level-padding);
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: border-color var(--el-transition-duration),background-color var(--el-transition-duration),color var(--el-transition-duration);
  box-sizing: border-box;
  white-space: nowrap;
}
.container-left{
  margin-left: 20px;
}
@media (max-width: 1200px) {
  .bigcontainer{
    width: 1170px;
  }
}

@media (max-width: 992px) {
  .bigcontainer{
    width: 970px;
  }
}
@media (max-width: 768px) {
  .bigcontainer{
    width: 100%;
  }
}
.nothide{
  display: block;
  animation-name: show;
  animation-duration: 1s;
  transform: translateY(0px);

}
.hide{
  display: none;
  animation-name: show;
  animation-duration: 1s;
  animation-direction: alternate;
  transform: translateY(-60px);

}
@keyframes show {
  0% {
    opacity: 0;
    transform: translateY(-60px);
  }
  100% {
    opacity: 0.8;
    transform: translateY(0px);
  }
}
</style>
