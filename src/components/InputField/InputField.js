import React from 'react'
import { TextInput,Text } from 'react-native'
import { Styles } from './Style';
import {Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const InputField = ({
    placeholder="",
    name="",
    control,
    rules="",
    errors="",
}) => {
    return(
        <Controller 
            control = {control}
            rules = {rules}
            render = {({field:{onChange,onBlur,value}}) =>{
                return (
                <>
                <TextInput 
                placeholder={placeholder} 
                style={Styles.input} 
                secureTextEntry={name==="password"}
                placeholderStyle={Styles.placeholder} 
                autoComplete={false}
                autoCapitalize='none'
                onBlur={onBlur}
                autoCorrect={false}
                value={value}
                onChangeText={(value)=>onChange(value)} 
                />
                <ErrorMessage errors={errors} name={name}  render={({ message }) => <Text style={Styles.errText}>{message}</Text>}/> 
                </>
                )
            }}
            name={name}
            />
    )
}

export default InputField;