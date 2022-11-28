import firestore, { firebase } from '@react-native-firebase/firestore';
import restaurant from '../redux/reducer/restaurant';

export const addRestaurant = (resDetails) => {
    const uid = firebase.auth().currentUser.uid;
    return firestore()
        .collection("restaurants")
        .add({...resDetails,userId:uid})
        .then((response)=>{
            return response
        })
        .catch((err)=>{throw err})
}

export const getRestaurant = async () => {
  const dataToReturn = []
  try {
    const restosCollection = await firestore().collection('restaurants').get()

    if (restosCollection._docs) {
      restosCollection._docs.forEach(eachResto => {
        return dataToReturn.push({ key: eachResto.id, ...eachResto._data })
      })
    }
    console.log(dataToReturn);
    return dataToReturn
  } catch (error) {
    console.log(`error`, error)
    Alert.alert(error.message)
    return error
  }
}