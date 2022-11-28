import React,{useState,useEffect} from 'react'
import {View,StyleSheet,ActivityIndicator } from 'react-native'
import ButtonEl from '../../components/ButtonEl';
import InputField from '../../components/InputField';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore, { firebase } from '@react-native-firebase/firestore';
import ShowAlert from '../../components/ShowAlert';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageAdd from '../../components/ImageAdd';
import storage from '@react-native-firebase/storage';
import { useForm } from 'react-hook-form';
import { addMenuRules } from '../../rules/addMenuRules';
import { connect } from 'react-redux';
import { addMenu,closeAlert,setMenuImage,uploadImage,uploadImageSuccess } from '../../redux/action/menu';

const AddMenu = (props) => {
  
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [items, setItems] = useState([]);
    const {isLoading,isSuccess,show,uploading,image,msg} = props;
    const {name,price,desc,cuisine} = addMenuRules;
    const {handleSubmit, setValue, reset,control, formState: { errors,isSubmitSuccessful } } = useForm({
      defaultValues: {
        name:"",
        price:"",
        cuisine:"",
        desc:"",
        photoUri:""
      }
  });
    useEffect(() => {
        const uid = firebase.auth().currentUser.uid;
        const subscriber = firestore()
        .collection('restaurants')
        .where('userId','==',uid)
        .onSnapshot(querySnapshot => {
          const resDetails = [];
    
          querySnapshot.forEach(documentSnapshot => {
            resDetails.push({
              label:documentSnapshot.data().resName,
              value: documentSnapshot.id,
            });
          });

          setItems(resDetails);
        }) 
        return () => {
            subscriber()
        }
    }, [])

    useEffect(()=>{
      if(isSubmitSuccessful){
        reset({
          name:"",
          price:"",
          cuisine:"",
          desc:"",
          photoUri:""
        })
      }
    },[isSubmitSuccessful])

    const selectImage = () => {
        const options = {
          maxWidth: 2000,
          maxHeight: 2000,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        console.log("Menu Selected");
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
            console.log(props);
            props.setMenuImage(source);
          }
        });
      };

      const uploadImage =() =>{
        const { uri,fileName } = image;
        props.uploadImage();
        const reference = storage().ref(`menus/${fileName}`);
        reference.putFile(uri)  
        .then(async () => {
            const url = await storage().ref(`menus/${fileName}`).getDownloadURL();
            props.uploadImageSuccess();
            setValue('photoUri',url);
        }).catch(err=>console.log(err));
        
      };  

    const handleMenuAdd = (menu) => {
       const findRes = items.find(el=>el.value===id);
       props.addMenu({menu,name:findRes.label,id});
    }

    return(
        <View style={Styles.container}>
            {isLoading && 
            <ActivityIndicator size="large" color="red" />}
             <DropDownPicker
                open={open}
                value={id}
                items={items}
                setOpen={setOpen}
                setValue={setId}
                setItems={setItems}
                style={Styles.dropdown}
                placeholder="Select Restaurant"
                />
            <View>    
            <InputField 
              placeholder="Dish Name"  
              name="name" 
              control={control} 
              errors={errors} 
              rules={name} 
            />
            <InputField 
              placeholder="Price"  
              name="price" 
              control={control} 
              errors={errors} 
              rules={price} 
            />
            <InputField 
              placeholder="Cuisine"  
              name="cuisine" 
              control={control} 
              errors={errors} 
              rules={cuisine} 
            />
            <InputField 
              placeholder="Description"  
              name="desc" 
              control={control} 
              errors={errors} 
              rules={desc} 
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
              pressHandler={handleSubmit(handleMenuAdd)}
            />
             <ShowAlert 
              show={show} 
              isSuccess={isSuccess} 
              authMsg={msg} 
              closeAlert={props.closeAlert}
              />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
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

const mapStateToProps = ({menu}) => {
    return{
      show:menu.show,
      isLoading:menu.isLoading,
      isSuccess:menu.isSuccess,
      uploading:menu.uploading,
      image:menu.image,
      msg:menu.msg
    }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addMenu:(payload)=>dispatch(addMenu(payload)),
    setMenuImage:(payload)=>dispatch(setMenuImage(payload)),
    uploadImage:()=>dispatch(uploadImage()),
    uploadImageSuccess:()=>dispatch(uploadImageSuccess()),
    closeAlert:()=>dispatch(closeAlert())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddMenu);