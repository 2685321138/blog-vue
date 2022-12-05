import {createRouter,createWebHistory} from 'vue-router'
import topBar from "@/components/orders/topBar";
import archives from "@/view/Archives.vue"
import categories from "../view/categories.vue"
import tags from "@/view/tags.vue"
import about from "@/view/about.vue"
import Home from "@/view/Home.vue"
import Article from "@/view/Article";
const  constantRoutes =[
  {
    path:"/",
    component:Home,
    meta:{
      title:'主页'
    }
  },
  {
    path:"/Article/:articleId",
    component: Article,
    meta:{
      title:"文章"
    }
  },
  {
    path:'/archives',
    component:archives,
    meta:{
      title:'归档',
    }
  },
  {
    path:'/categories/:categoriesId',
    component:categories,
    meta:{
      title:'分类',
    }
  },
  {
    path:'/tags/:tagId',
    component:tags,
    meta:{
      title:'标签',
    }
  },
  {
    path:'/about',
    component:about,
    meta:{
      title:'关于',
    }
  }

]
const router = createRouter({
  history:createWebHistory(),
  routes:constantRoutes
})

router.afterEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title //修改网页的title
  }else{
    // document.title = "未知"
  }
})
export default router
