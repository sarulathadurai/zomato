import firestore, { firebase } from '@react-native-firebase/firestore';

export const addOrder = (order) => {
    const uid = firebase.auth().currentUser.uid;
    const date = new Date().toISOString().slice(0, 10)
    return firestore()
        .collection("orders")
        .add({...order,userId:uid,date:date})
        .then((response)=>{
            return response
        })
        .catch((err)=>{throw err})
}

export const getOrders = async () => {
  const dataToReturn = []
  try {
    const ordersCollection = await firestore().collection('orders').get()

    if (ordersCollection._docs) {
      ordersCollection._docs.forEach(eachResto => {
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