import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import {IconEl} from '../Icons';

const ImageAdd = ({msg,uploadImage,selectImage,image,uploading}) => {
  
      return(
        <SafeAreaView >
          <View style={styles.selectButton}>
          <TouchableOpacity  onPress={selectImage}>
            <Text style={styles.buttonText}>{msg}</Text>   
          </TouchableOpacity>
          <TouchableOpacity onPress={uploadImage}>
          {uploading === "upload" ? <IconEl name="upload" style={styles.uploadIcon} /> :
          uploading === true ?  <ActivityIndicator color="red" size="large" /> : 
          <IconEl name="check-circle" style={styles.checkIcon} />
            }
          </TouchableOpacity>
          </View>  
          <View style={styles.imageContainer}>
            {image !== null ? (
              <Image source={{ uri: image.uri }} style={styles.imageBox} />
            ) : null}
          </View>
      </SafeAreaView>
      )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#bbded6'
    },
    selectButton: {
      padding:5,
      minWidth:"63%",
      height:50,
      borderRadius:5,
      marginBottom:20,
      backgroundColor:"#dadce0e0",
      flexDirection:"row",
      justifyContent:"space-around",
      alignItems:'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'red',
      fontSize: 18,
      paddingTop:6,
      fontWeight: 'bold',
      textAlign:'center'
    },
    imageContainer: {
      alignItems: 'center'
    },
    imageBox: {
      width: 100,
      height: 100
    },
    uploadIcon:{
      color:"red",
      fontSize:25,
      fontWeight:"700",
    },
    checkIcon:{
      color:"green",
      fontSize:25,
      fontWeight:"700",
    },

  });
  

export default ImageAdd;