<template>
<!--  <testforeditortohtml></testforeditortohtml>-->
  <top-bar/>
  <!--  <router-view  />-->

<!--  根据路径来适配router地址-->
 <div class="context">
   <router-view :key="$route.fullPath"/>
 </div>
  <SearchModel/>



</template>

<script>
import SearchModel from "@/components/model/SearchModel";
import TopBar from "./components/orders/topBar"
import test from "./view/test";
import richContext from "@/components/other/richContext";
import testforeditortohtml from "@/view/Article";
export default {
  name: 'App',
  components: {
    TopBar,
    SearchModel,
    test,
    richContext,
  }
}
</script>

<style scoped>
.context{
  padding-top: 60px;
}
/*body *::-webkit-scrollbar {*/
/*  width: 10px;*/
/*  height: 10px;*/
/*}*/
/*body *::-webkit-scrollbar-track {*/
/*  background: #fff;*/
/*  border-radius: 2px;*/
/*}*/
/*body *::-webkit-scrollbar-thumb {*/
/*  background: linear-gradient(to left,lightyellow,wheat);*/

/*  border-radius: 15px;*/
/*}*/
body *::-webkit-scrollbar-thumb:hover {
  background: lightskyblue;
}
/*body *::-webkit-scrollbar-corner {*/
/*  background:  #fff;*/
/*}*/
</style>
