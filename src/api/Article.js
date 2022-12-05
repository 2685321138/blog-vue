import request from "@/util/request";
//根据id查看
export function getArticleById(id){
    return request({
        url:"/Article/"+id,
        method:'GET'
    })
}
