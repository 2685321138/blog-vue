<template>
      <el-dialog v-model="searchFlag" width="550px" @close="text = undefined" >
        <div
            id="div"
            class="outside"
            v-if="searchFlag"
            @close="searchFlag=false"
        >
          <div class="place">本地搜索</div>
<!--          <div class="outside-close" @click="outsideClose"></div>-->
          <div class="search">
            <div class="icon"></div>
            <input
                class="search-bar"
                placeholder="请输入搜索的内容. . . . . ."
                v-model="text"
            />
          </div>
          <hr style="
      margin: 20px 0;
      border: 2px dashed #d2ebfd;
      overflow: visible;"/>
          <div style="
      overflow-y: scroll;
      height: 365px;">
            <p v-show="text&&resultList.length==0" style="margin-left: 15px;font-size: 0.85rem;">找不到你输入的消息: {{text}}</p>
            <search-item></search-item>
          </div>
        </div>
      </el-dialog>
</template>

<script>
import SearchItem from "@/components/other/searchItem";
import {Search} from "@/api/HomeRequest";

export default {
name: "SearchModel",
  components: { SearchItem},
  mounted(){
    // this.$nextTick(()=>{
    //   window.addEventListener('click',(event)=>{
    //     if(!this.$refs.search.contains(event.target)){
    //       if(document.getElementById("open").contains(event.target)){
    //       }else {
    //         this.text = undefined
    //         this.$store.commit('setSearchFlag',false)
    //       }
    //     }
    //   })
    // } )
  },
  watch:{
  text(title,oldVal){
    if(title == undefined){
      this.$store.commit("setSearchList",[])
      return
    }
    Search(title).then(res=>{

      this.$store.commit("setSearchList",res.data)
    })
    //请求搜索接口(待完善)
    //测试
    // this.$store.commit("setSearchList",[{title:"1",context:"1"}])

  },
  },
  computed:{
    resultList:{//获取返回的搜索信息
      get(){
        return this.$store.state.searchList;
      }
    },
    searchFlag: {//搜索框的关闭和开启
      set(value) {
        this.$store.commit('setSearchFlag',value)
      },
      get() {
        return this.$store.state.searchFlag;
      }
    },
  },
  methods:{
    outsideClose(){
      this.$store.commit('setSearchFlag',false)
    }
  },
  data(){
  return{
    text:undefined,//用户输入的信息
  }
  }
}
</script>

<style lang="less">
.icon{
  margin-top: 2px;
  display: inline-block;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  background-image: url("../../assets/photo/搜索.png");
  margin-left: 10px;
}
.place{
  margin-left: 10px;
  color: deepskyblue;
  font-size: 23px;
  width: 150px;
}
.outside{
  position: relative;
  top: 20%;
  border-radius: 3%;
  /*background-color: lightgrey;*/
  /*left: 38%;*/
  width: 500px;
  height: 500px;
  /*overflow: hidden;*/
  /*overflow-y: scroll;*/
}
.outside-close{
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 25px;
  margin:-29px 5px 0px 0px;
  float: right;
  height: 25px;
  background-image: url("../../assets/photo/exit.png");
}
.search{
  width: 100%;
  height: 30px;
  border-radius: 2rem;
  margin-top: 3%;
  border:2px solid #8e8cd8;;
}
.search-bar{
  position: absolute;
  border-style: none;
  border-radius: 0;
  width: 91%;
  margin-left: 5px;
  background-color:transparent;
  outline:none;
}


.el-dialog__wrapper {
  transition-duration: 0.3s;
}
.dialog-fade-enter-active{
  animation: none !important;
}
.dialog-fade-leave-active {
  transition-duration: 0.15s !important;
  animation: none !important;
}
.dialog-fade-enter-active .el-dialog,
.dialog-fade-leave-active .el-dialog{
  animation-fill-mode: forwards;
}
.dialog-fade-enter-active .el-dialog{
  animation-duration: 0.3s;
  animation-name: anim-open;
  //animation-timing-function: cubic-bezier(0.6,0,0.4,1);
}
.dialog-fade-leave-active .el-dialog{
  animation-duration: 0.3s;
  animation-name: anim-close;
}
@keyframes anim-open {
  0% { opacity: 0;  transform: scale3d(0, 0, 1); }
  100% { opacity: 1; transform: scale3d(1, 1, 1); }
}
@keyframes anim-close {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 1);
  }
}



</style>
