import {GET_EVENTS} from '../constants/eventConstant';
import { db } from '../firebase/firebase';

export const getEvants = () => async(dispatch)=> {
    let payload;
    db.collection('event').orderBy("timestamp","desc").onSnapshot(snapshot => {
        payload = snapshot.docs.map(doc => doc.data());
        dispatch({type:GET_EVENTS, payload: payload})     
    })
}