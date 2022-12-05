import request from "@/util/request";
//测试用
export function test(){
    return request({
        url:'/info',
        method:"get"
    })
}
//查询主页文章
export function ListArticle(){
    return request({
        url:'/ListArticles',
        method:'get',
    })
}

export function Search(data){
    return request({
        url:'/Article/title',
        method:'post',
        data:data
    })
}
