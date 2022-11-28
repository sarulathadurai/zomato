import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
   container1:{
        flexDirection:"row",
        padding:10,
        margin:10,
        justifyContent:"space-between",
        borderColor:"#fff",
        borderBottomColor:"#f66666",
        borderWidth:0.5
    },
    container2:{
        padding:10,
        margin:10,
        justifyContent:"space-between"
    },

    header:{
        padding:5,
        fontWeight:"500",
        fontFamily:"RobotoMono-Regular"
    },
    subheader:{
        padding:5,
        fontFamily:"RobotoMono-Regular"
    },
    card:{
        minWidth:"90%",
        minHeight:"20%",
        backgroundColor:"white",
        borderRadius:5,
        margin:10,
        flexDirection:"column"
    },
})