import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

export const IconEl = ({name,style}) => {
    return <Icon name={name} style={style} />
}

export const IconIon = ({name,style}) => {
    return <Ionicon name={name} style={style} />
}

