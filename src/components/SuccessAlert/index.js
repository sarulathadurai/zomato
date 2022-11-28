import React from 'react'
import { View,Text,StyleSheet } from 'react-native';
import {IconEl} from '../Icons';

const SuccessAlert = ({msg}) => {
    return(
        <View style={[Styles.alertBar,Styles.success]}>
                <Text style={Styles.alertText}>{msg}</Text>
                <IconEl name="times" style={Styles.alertIcon} />
        </View>
    )
}

const Styles = StyleSheet.create({
    alertBar:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      minWidth:10,
      margin:10,
      marginLeft:50,
      marginRight:50,
      borderRadius:5,
      position:"relative",
      top:"20%"
    },
    alertText:{
      color:"#fff",
      fontSize:15,
      fontWeight:"700",
      padding:5,
      textAlign:"center"
    },
    alertIcon:{
        color:"#fff",
        fontSize:19,
        fontWeight:"700",
        padding:5
    },
    success:{
        backgroundColor:"green"
    },
});

export default SuccessAlert;