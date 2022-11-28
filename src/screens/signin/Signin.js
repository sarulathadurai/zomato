import React from 'react'
import { useForm } from 'react-hook-form';
import { ActivityIndicator, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux';
import ButtonEl from '../../components/ButtonEl';
import ShowAlert from '../../components/ShowAlert';
import InputField from '../../components/InputField';
import { closeAlert, signIn } from '../../redux/action/auth';
import { signinRules } from '../../rules/signinRules';
import { Styles } from './Style';

const SignIn = ({ navigation,...props }) => {
    const src = require("../../../assets/bg.jpg");
    const {authMsg,show,isLoading,isSuccess} = props;
    const { email, password } = signinRules;
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleSignIn = (data) => {
       props.signin(data);
    }

    return (
        <ImageBackground source={src} resizeMode="cover" style={Styles.container}>
            <View>
                {isLoading && <ActivityIndicator size="large" color="white" />}
                <InputField
                    placeholder="email"
                    name="email"
                    control={control}
                    errors={errors}
                    rules={email}
                />
                <InputField
                    placeholder="Password"
                    name="password"
                    control={control}
                    errors={errors}
                    rules={password}
                />
                <View style={Styles.txtContainer}>
                    <Text style={Styles.text}>Forget Password?</Text>
                    <Text style={Styles.text} onPress={() => navigation.navigate("SignUp")} >Signup </Text>
                </View>
                <ButtonEl title="Signin" pressHandler={handleSubmit(handleSignIn)} />
            </View>
            <ShowAlert show={show} isSuccess={isSuccess} authMsg={authMsg} closeAlert={props.closeAlert} />
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return{
        show:state.auth.show,
        isLoading:state.auth.isLoading,
        isSuccess:state.auth.isSuccess,
        authMsg:state.auth.authMsg
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signin:(payload)=>dispatch(signIn(payload)),
        closeAlert:()=>dispatch(closeAlert())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);