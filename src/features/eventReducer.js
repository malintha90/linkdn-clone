import {GET_EVENTS} from '../constants/eventConstant';

export const getEvents = (state={events:[]},action) => {
    switch(action.type){
        case GET_EVENTS:
            return {events: action.payload}
        default:
            return state
    }
}