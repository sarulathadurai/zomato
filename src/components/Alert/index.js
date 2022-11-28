import React from 'react'
import { View,Text,StyleSheet } from 'react-native';

const Alert = ({bgColor,msg,children}) => {
    return(
        <View style={[Styles.alertBar,bgColor]}>
                <Text style={Styles.alertText}>{msg}</Text>
                {children}
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
      borderRadius:5
    },
    alertText:{
      color:"#fff",
      fontSize:15,
      fontWeight:"700",
      padding:5
    }
});

export default Alert;