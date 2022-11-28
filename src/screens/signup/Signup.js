import React, { useState } from 'react'
import { ImageBackground, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import ButtonEl from '../../components/ButtonEl';
import InputField from '../../components/InputField';
import { Styles } from './Style';
import ShowAlert from '../../components/ShowAlert';
import DropDownPicker from 'react-native-dropdown-picker';
import { useForm, Controller } from 'react-hook-form';
import { signupRules } from '../../rules/signupRules';
import { closeAlert, signUp } from '../../redux/action/auth';
import { connect } from 'react-redux';

const SignUp = ({ navigation,...props }) => {

    const src = require("../../../assets/bg.jpg");
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{ label: "admin", value: 1 }, { label: "user", value: 0 }]);
    const { email, password, firstName, lastName, phNo } = signupRules
    const {authMsg,show,isLoading,isSuccess} = props;
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phNo: "",
            role: "",
        }
    });

    const handleSignup = (data) => {
      props.signup(data)
    }

    return (
        <ImageBackground 
            source={src} 
            resizeMode="cover" 
            style={Styles.container}
        >
            {isLoading && <ActivityIndicator size="large" color="white" />}
            <View>
                <InputField 
                    placeholder="First Name" 
                    name="firstName" 
                    control={control} 
                    rules={firstName} 
                    errors={errors} 
                />
                <InputField 
                    placeholder="Last Name" 
                    name="lastName" 
                    control={control} 
                    rules={lastName} 
                    errors={errors} 
                />
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={(value) => onChange(value)}
                            setItems={setItems}
                            style={Styles.dropdown}
                            placeholder="Role"
                        />
                    )}
                    name="role"
                />
                <InputField 
                    placeholder="Email" 
                    name="email" 
                    control={control} 
                    rules={email} 
                    errors={errors} 
                />
                <InputField 
                    placeholder="Password" 
                    name="password" 
                    control={control} 
                    rules={password} 
                    errors={errors} 
                />
                <InputField 
                    placeholder="Phone Number" 
                    name="phNo" 
                    control={control} 
                    rules={phNo} 
                    errors={errors} 
                />
                <Text 
                    style={Styles.text} 
                    onPress={() => navigation.navigate("SignIn")} 
                >
                    Already have an account? Signin
                </Text>
                <ButtonEl 
                    title="Sign Up" 
                    pressHandler={handleSubmit(handleSignup)} 
                />
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
       signup:(payload)=>dispatch(signUp(payload)),
       closeAlert:()=>dispatch(closeAlert())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);