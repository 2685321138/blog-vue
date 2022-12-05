<template>
<div class="searchList" v-for="(item,index) in searchList" >
  <div>
    <span class="title" @click="toArticle(item.articleId)">
      {{item.title}}
    </span>
  </div>

  <div>
      <span class="context" @click="toArticle(item.articleId)">
      {{HtmlRemoveTag(item.context)}}
    </span>
  </div>
</div>
</template>

<script>
export default {
name: "searchItem",
  computed:{
  searchList:{
    get(){
      return this.$store.state.searchList
    },
    // set(val){
    //   return this.$store.commit("setSearchList",val)
    // }
  }

  },
  methods:{
    //清除html标签
    HtmlRemoveTag (str) {
      return str ? str.replace(/<[^>]+>/g,"") : ''
    },
    toArticle(articleId){
      this.$store.commit('setSearchFlag',false)
      this.$router.push({path:"/Article/" + articleId})
    }
  }
}
</script>

<style scoped>
.searchList{
  width: 100%;
  height: 100px;
}
.title{
  color: #555;
  font-weight: bold;
  border-bottom: 1px solid #999;
  text-decoration: none;
}
.context{
  color: #555;
  cursor: pointer;
  border-bottom: 1px dashed #ccc;
  padding: 5px 0;
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
