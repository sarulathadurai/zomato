import firestore from '@react-native-firebase/firestore';

export const getMenu = async (id) => {
  const dataToReturn = []
  try {
    const menuCollection = await firestore().collection('menu').where('resId','==',id).get()

    if (menuCollection._docs) {
      menuCollection._docs.forEach(eachResto => {
        return dataToReturn.push({ key: eachResto.id,count:0, ...eachResto._data })
      })
    }
    return dataToReturn
  } catch (error) {
    console.log(`error`, error)
    Alert.alert(error.message)
    return error
  }
}
export const addMenu = ({menu,id,name})=>{
    return firestore()
        .collection("menu")
        .add({...menu,resId:id,resName:name})
        .then((response)=>{
            return response
        })
        .catch((err)=>{throw err})
    }