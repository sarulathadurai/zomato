import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container:{
       flex:1,
       alignItems:'center',
       justifyContent:'center',
    },
    text:{
        textDecorationLine:"underline",
        color:"#f1f1f1",
        fontSize:16,
        fontWeight:"700",
        margin:3
    },
    txtContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    error:{
        backgroundColor:"#ec0b32",
    },
    success:{
        backgroundColor:"green"
    },
    alertIcon:{
        color:"#fff",
        fontSize:19,
        fontWeight:"700",
        padding:5
    }
})