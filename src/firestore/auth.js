import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const signup = (user) => {
    return auth()
        .createUserWithEmailAndPassword(
            user.email, user.password
        )
        .then((res) => {
            const uid = res.user._user.uid;
            firestore()
            .collection('users')
            .doc(uid)
            .set(user)
           return getUser(res.user._user.uid); 
        })

        .catch(error => {
           throw error;
        })
}

export const signin = (credentials) => {
    return auth()
        .signInWithEmailAndPassword(credentials.email,credentials.password)
        .then((response)=>{
            return getUser(response.user._user.uid);
        })
        .catch((err)=>{
             throw err;
        });
}

export const signout = () => {
    return auth()
      .signOut()
      .then(() => console.log('User signed out!'));
}

const getUser = (uid) => {
    return firestore().collection('users').doc(uid).get();
}