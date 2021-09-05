import {db} from '../firebase/firebase';
import firebase from 'firebase';
import {GET_MESSAGES} from '../constants/eventConstant';
 
export const messageSend = (uid,photoURL,seMessage,receiverUID) => async(dispatch) => {
    await db.collection('messages').add({
        text:seMessage,
        uid,
        receiverUid:receiverUID,
        photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export const getMessages = (userId, receiverUID) => async(dispatch) => {
   
    db.collection('messages').where('uid','in',[userId,receiverUID]).orderBy('timestamp').limit(50).onSnapshot((snapshot) => {
        const payload = snapshot.docs.map(doc => doc.data());
       
        const messages = payload.filter(mes => 
            (mes.uid == userId && mes.receiverUid == receiverUID) ||
            (mes.uid == receiverUID && mes.receiverUid == userId)
        )
        dispatch({type: GET_MESSAGES, payload: messages});
    })
}