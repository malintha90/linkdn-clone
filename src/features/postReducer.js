import {GET_ARTICLE, SET_LOADING, GET_ARTICLE_FAIL} from '../constants/postConstant';

export const initialLoadingState = (state={loading:false}, action) => {
    switch(action.type){
        case SET_LOADING:
            return {loading: action.status}
        default:
            return state
    }
}

export const getArticles = (state={articles:[]}, action) => {
    switch(action.type){
        case GET_ARTICLE:
            return {articles: action.payload}
        case GET_ARTICLE_FAIL:
            return {articles: action.payload}
        default:
            return state
    }
}