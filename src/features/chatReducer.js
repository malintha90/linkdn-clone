import {GET_MESSAGES} from '../constants/eventConstant';

export const getChats = (state={chats:[]},action) => {
    switch(action.type){
        case GET_MESSAGES:
            return {chats: action.payload}
        default:
            return state
    }
}