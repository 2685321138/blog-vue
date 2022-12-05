import { createStore } from 'vuex'

export default createStore({
    state: {
        searchFlag:false,
        searchList:[],
        Y:undefined
    },
    mutations: {
        setSearchFlag(state,value){
            state.searchFlag = value
        },
        setSearchList(state,value){
            state.searchList = value
        },
        setY(state,value){
            state.Y = value
        }
    },
    actions: {
    },
    modules: {
    }
})
