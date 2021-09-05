import {auth, provider,storage, db } from '../firebase/firebase';
import {LOG_OUT_USER,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL,USER_REGISTER_FAIL,UPDATE_PROFILE,SET_LOADING,GET_USERS} from '../constants/userConstant';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom'
 
export const signInAPI = () => async(dispatch) => {
    auth.signInWithPopup(provider).then((payload) =>{

        const response = createNewUser(payload.user.displayName,payload.user.email,payload.user.uid);
            if(response){
                dispatch({type:LOGIN_USER_SUCCESS, user: payload.user});
                localStorage.setItem('userInfo',JSON.stringify(payload.user)); 
            } 

        }).catch((error) => {
        dispatch({type:LOGIN_USER_FAIL,user:error})
    });
}

export const getUserAuth = () => async(dispatch) => {
    auth.onAuthStateChanged(async(user) => {
      if(user){
        dispatch({type:LOGIN_USER_SUCCESS, user: user})
      }  
    })
}

export const signIn = (email,password) => async(dispatch) => {
    auth.signInWithEmailAndPassword(email,password).then((payload) => {          
        dispatch({type:LOGIN_USER_SUCCESS, user:payload.user});    
        localStorage.setItem('userInfo',JSON.stringify(payload.user));            
    }).catch(error =>{
        dispatch({type:LOGIN_USER_FAIL,user:error})
    })
}

export const register = (email, password,name) => async(dispatch)=> {
  
    auth.createUserWithEmailAndPassword(email, password).then((userAuth) =>{
        userAuth.user.updateProfile({
           displayName:name
        }).then(() =>{  
            createNewUser(name,email,userAuth.user.uid);
            dispatch(signIn(email, password))    

        })       
     }).catch((error) => {
        dispatch({type: USER_REGISTER_FAIL, user:error})
     })
}

const createNewUser = (name,email,uid) => {
    db.collection('users').add({
        userName: name,
        email:email,
        uid: uid,
        photoURL:'',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
       return true;
    })  
}

export const signOutUser = () => async(dispatch) => {
   
    auth.signOut().then(() => {
        dispatch({type:LOG_OUT_USER, user:''});
        localStorage.clear();      
        <Redirect to="/"/>
    }).catch(error =>{
        dispatch({type:LOGIN_USER_FAIL,user:error})
    })
}

export const updateUserProfile = (userData) => async(dispatch)=>{
    dispatch({type:SET_LOADING, status:true});
    if(userData.image !=''){
        const upload = storage
        .ref(`images/${userData.profileImage.name}`)
        .put(userData.profileImage);

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
                const userNow = auth.currentUser;                
                                   
                userNow.updateProfile({
                    displayName: userData.name +"|"+userData.recentArray,
                    photoURL: downloadURL,                 
                    providerData:userData.recentArray
                }).then(async() => {
                    await db.collection('users').where("uid","==",userNow.uid).get().then((userData) => {
                        const userId = userData.docs[0].id;   
                        db.collection('users').doc(userId).update({
                            photoURL:downloadURL
                        }).then(() => {
                            dispatch({type:UPDATE_PROFILE,user:userNow})
                            dispatch({type:SET_LOADING, status:false});
                            localStorage.setItem('userInfo',JSON.stringify(userNow));
                        })
                     });
                 
                   
                });
            }
        );       
    }
}

export const getChatUsers = (uid) => async(dispatch) => {
    const unsubscribe = db.collection('users').onSnapshot(snapshot => {
        const payload = snapshot.docs.map(doc => doc.data());      
        const userDataSet =  payload.filter((dt) => dt.uid != uid);
    
        dispatch({type:GET_USERS, userPayload: userDataSet})     
    })

    return unsubscribe;
}