import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
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
    },
    text:{
        textDecorationLine:"underline",
        color:"#f1f1f1",
        fontSize:16,
        fontWeight:"700",
        margin:3
    },
    dropdown:{
        padding:5,
        minWidth:"70%",
        height:50,
        borderRadius:5,
        marginBottom:20,
        backgroundColor:"#dadce0e0",
    },
})