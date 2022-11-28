import React, { useEffect } from 'react'
import { ImageBackground } from 'react-native';
import { Styles } from './Style';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { loadAuth, loadDashboard } from '../../redux/action/auth';

const SplashScreen = (props) => {

    const img = require("../../../assets/zomato.png")

    const onAuthStateChanged = (user) => {
        if(user){
            props.loadDashboard();
        }else{
           props.loadAuth();
        }
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    return (
        <ImageBackground style={Styles.container} source={img} />
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        loadAuth:()=>dispatch(loadAuth()),
        loadDashboard:()=>dispatch(loadDashboard())
    }
}


export default connect(null,mapDispatchToProps)(SplashScreen);