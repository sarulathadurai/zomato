import React,{useEffect} from 'react'
import {View,StyleSheet,ActivityIndicator,TouchableOpacity,Text,TextInput} from 'react-native'
import ButtonEl from '../../components/ButtonEl';
import ShowAlert from '../../components/ShowAlert';
import ImageAdd from '../../components/ImageAdd';
import InputField from '../../components/InputField';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useForm } from 'react-hook-form';
import { addResRules } from '../../rules/addResRules';
import { connect } from 'react-redux';
import { addRes, closeAlert, setImage, uploadImage, uploadImageSuccess } from '../../redux/action/restaurant';
import {IconIon} from '../../components/Icons';
import {Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const AddRes = (props) => {

    const {handleSubmit, setValue, control,reset, formState: { errors,isSubmitSuccessful} } = useForm({
      defaultValues: {
        resName:"",
        desc:"",
        address:"",
        phNo:"",
        photoUri:""
      }
  });
    const {resName,address,desc,phNo} = addResRules;
    const {isLoading,isSuccess,show,uploading,image,msg,mapAddress} = props;

    useEffect(() => {
      if (isSubmitSuccessful) {
        reset({
          resName:"",
          desc:"",
          address:"",
          phNo:"",
          photoUri:""
        });
      }
    }, [isSubmitSuccessful]);

    useEffect(()=>{
      if(mapAddress){
        setValue('address',mapAddress);
      }
    },[mapAddress])

    const selectImage = () => {
        const options = {
          maxWidth: 2000,
          maxHeight: 2000,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { 
                uri:response.assets[0].uri,
                fileName:response.assets[0].fileName
            };
            props.setImage(source);
          }
        });
      };

      const uploadImage =() =>{
        const { uri,fileName } = image;
        props.uploadImage();
        const reference = storage().ref(`restaurants/${fileName}`);
        reference.putFile(uri)  
        .then(async () => {
            const url = await storage().ref(`restaurants/${fileName}`).getDownloadURL();
            props.uploadImageSuccess();
            setValue('photoUri',url);
        }).catch(err=>console.log(err));
        
      };  

    const handleAddRes = (data) => {
        props.addRes(data);
    }
    
    return(
    
        <View style={Styles.container}>
            {isLoading && <ActivityIndicator size="large" color="red" />}
            <InputField 
              placeholder="Restaurant Name" 
              rules={resName} 
              name="resName" 
              control={control} 
              errors={errors} 
            />
            <InputField 
              placeholder="Description" 
              rules={desc} 
              name="desc" 
              control={control} 
              errors={errors} 
            />
            <View style={Styles.address}>
            <Controller 
            control = {control}
            rules = {address}
            render = {({field:{onChange,onBlur,value}}) =>{
                return (
                <>
                <TextInput 
                placeholder="Address"
                style={Styles.input} 
                multiline={true}
                numberOfLines={6}
                placeholderStyle={Styles.placeholder} 
                autoComplete={false}
                autoCapitalize='none'
                onBlur={onBlur}
                autoCorrect={false}
                value={value}
                onChangeText={(value)=>onChange(value)} 
                />
                <ErrorMessage 
                  errors={errors} 
                  name="address" 
                  render={({ message }) => 
                    <Text style={Styles.errText}>{message}</Text>
                    }/> 
                </>
                )
            }}
            name="address"
            />
            <TouchableOpacity onPress={()=>props.navigation.navigate("Map")}>
            <IconIon name="navigate-circle-sharp" style={Styles.searchIcon}/>
            </TouchableOpacity>
            </View>
            
            <InputField 
              placeholder="Phone Number" 
              rules={phNo} 
              name="phNo" 
              control={control} 
              errors={errors} 
            />  
            <ImageAdd 
              msg="Upload image" 
              selectImage={selectImage} 
              uploadImage={uploadImage} 
              image={image} 
              uploading={uploading} 
            />
            <ButtonEl 
              title="Create" 
              pressHandler={handleSubmit(handleAddRes)}
            />
             <ShowAlert show={show} isSuccess={isSuccess} authMsg={msg} closeAlert={props.closeAlert}/>
        </View>
        
    )
}


const Styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
     },
    text:{
        borderColor:"red",
        backgroundColor:"#f9afc3",
        color:"red",
        padding:10,
        borderWidth:2,
        borderRadius:5,
        fontSize:15,
    },    
    input:{
      padding:0,
      minWidth:"60%",
      height:50,
      borderRadius:5,
      marginBottom:20,
      backgroundColor:"#dadce0e0", 
    },
  address:{
    display:"flex",
    flexDirection:"row",
    backgroundColor:"#dadce0e0",
    height:50,
    marginBottom:20,
    borderRadius:5
  },
  searchIcon:{
    color:"red",
    fontSize:25,
    fontWeight:"700",
    marginTop:8,
    marginRight:10
  },
})

const mapStateToProps = ({restaurant}) => {

  return{
    show:restaurant.show,
    isLoading:restaurant.isLoading,
    isSuccess:restaurant.isSuccess,
    uploading:restaurant.uploading,
    image:restaurant.image,
    mapAddress:restaurant.mapAddress,
    msg:restaurant.msg
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addRes:(payload)=>dispatch(addRes(payload)),
    setImage:(payload)=>dispatch(setImage(payload)),
    uploadImage:()=>dispatch(uploadImage()),
    uploadImageSuccess:()=>dispatch(uploadImageSuccess()),
    closeAlert:()=>dispatch(closeAlert())
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(AddRes);

