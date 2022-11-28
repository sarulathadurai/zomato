import React from 'react'
import { Button,View } from 'react-native';
import { Styles } from './Style';

const ButtonEl = ({
    title="",
    pressHandler
}) => {
    return(
        <View style={Styles.btnView}>
            <Button title={title} style={Styles.button} color="white" onPress={pressHandler} />
        </View>
    )
}

export default ButtonEl;