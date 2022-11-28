import React from 'react'
import { View,Text } from 'react-native';
import { Styles } from './Style';

const Header = ({navigation}) => {
    return(
        <View style={Styles.header}>
            <Text style={Styles.text}>
                Zomato
            </Text>
        </View>
    )
}

export default Header;