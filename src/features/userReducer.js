
import {LOG_OUT_USER,LOGIN_USER_SUCCESS,USER_REGISTER,UPDATE_PROFILE,GET_USERS} from '../constants/userConstant';

export const loginUser = (state={user:{}},action) => {

    switch (action.type){
      case LOGIN_USER_SUCCESS:
        return {...state,user: action.user}
      case LOG_OUT_USER: 
        return {user:action.user}
      case USER_REGISTER: 
        return {...state,user:action.user}
      case UPDATE_PROFILE:
        return {...state,user: action.user}  
      default:
        return state
    }
}

export const chatUsers = (state = {usersList:[]}, action) => {
  switch (action.type){
    case GET_USERS:
      return {...state,userList: action.userPayload}
    default:
      return state
  }
}

