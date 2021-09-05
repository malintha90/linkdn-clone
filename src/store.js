import {combineReducers, compose, applyMiddleware, createStore} from 'redux';
import  { loginUser, chatUsers }  from './features/userReducer';
import { getArticles,initialLoadingState } from './features/postReducer';
import { getEvents } from './features/eventReducer';
import {getChats} from './features/chatReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user:loginUser,
    articles: getArticles,
    loading: initialLoadingState,
    events: getEvents,
    userList: chatUsers,
    chats:getChats 
});

const initialState = {   
    user:{
      user: localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{}    
    }
};

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhanser(applyMiddleware(thunk)));

export default store;