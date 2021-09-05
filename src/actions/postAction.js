import {GET_ARTICLE, SET_LOADING, GET_ARTICLE_FAIL} from '../constants/postConstant';
import { auth, provider, storage, db } from '../firebase/firebase';
import firebase from 'firebase';

export const postArticleAPI = (article) => async(dispatch) => {

    dispatch({type:SET_LOADING, status:true});
    
    if(article.image !=''){
        const upload = storage
        .ref(`images/${article.image.name}`)
        .put(article.image);

        upload.on('state_change',
        snapshot => {
            const progress = (
                (snapshot.bytesTransferred/ snapshot.totalBytes)*100);

                if(snapshot.status == "RUNNING"){
                    console.log("Progress 2 = ",progress);
                }
        },
        (error) => console.log("Error =",error),
            async () => {
                
                const downloadURL = await upload.snapshot.ref.getDownloadURL();
               
                db.collection('posts').add({
                    actor:{
                        name: article.user.displayName,                    
                        description: article.user.email,                       
                        postUrl: article.user.photoURL
                    },
                    message: article.message,
                    shareImage:downloadURL,
                    shareVedio: article.media,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

                dispatch({type:SET_LOADING, status:false});
            }
        );       
    }else if(article.media){
        db.collection('posts').add({
            actor:{
                name: article.user.displayName,                    
                description: article.user.email,                       
                postUrl: article.user.photoURL
            },
            message: article.message,
            shareImage:'',
            shareVedio: article.media,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        dispatch({type:SET_LOADING, status:false});

    }else if(article.eventDate){
        db.collection('event').add({
            actor:{
                name: article.user.displayName,                    
                description: article.user.email,                       
                postUrl: article.user.photoURL
            },
            message: article.message,
            eventDate:article.eventDate,         
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        dispatch({type:SET_LOADING, status:false});
    }
}

export const getPostArticles = () => async(dispatch)=> {
    let payload;
    db.collection('posts').orderBy("timestamp","desc").onSnapshot(snapshot => {
        payload = snapshot.docs.map(doc => doc.data());       
        dispatch({type:GET_ARTICLE, payload: payload})     
    })
}
