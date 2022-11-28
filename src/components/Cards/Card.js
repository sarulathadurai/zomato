import React from 'react'
import { View , Image,Text, TouchableOpacity} from 'react-native';
import { Styles } from './Style';
import { globalStyles } from '../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
 
 const Card = ({item}) => {
    const res = item;
    return(
        <View style={Styles.card} >
            <View style={Styles.firstView}> 
            <Image source={{uri:res.photoUri}} style={Styles.img}/>
            <View style={Styles.secondView}>
                <View>
                    <Text style={globalStyles.header} >{res.resName}</Text>
                    <Text style={globalStyles.desc}>{res.desc}</Text>
                </View>
                <View>
                    <View style={Styles.badge}>
                    <Text style={Styles.badgeText}>4.0
                    <Icon name="star" size={15} color="white"/>    
                    </Text> 
                    </View>                   
                    <Text style={Styles.rate}>Rs.150 for one</Text>
                </View>
            </View>
            </View>         
        </View>
    )
}

export default Card;