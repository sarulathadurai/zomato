import React,{useContext} from 'react'
import { View , Image,Text,TouchableOpacity} from 'react-native';
import { Styles } from './Style';
import { OrderContext } from '../../screens/menuList/MenuList';
import {IconEl} from '../Icons';
import { globalStyles } from '../globalStyles';
 const MenuCard = ({item = {}, menuList}) => {

    const {name,desc,price,count,key,photoUri} = item.item;
    const {handleMenuList , handleOrder} = useContext(OrderContext);   

    const handleAdd = (id,isPress=false) =>() => {
        isPress && handleOrder(true)
        console.log(menuList);
        const elIndex = menuList.findIndex(el => el.key === id );
        const newArr = [...menuList];
        let count = newArr[elIndex].count;
        newArr[elIndex] = {...newArr[elIndex],count:count+1};
        handleMenuList(newArr);
        console.log( newArr[elIndex]);
      }
    
      const handleSub = (id) =>() => {
        const elIndex = menuList.findIndex(el => el.key === id );
        const newArr = [...menuList];
        let count = newArr[elIndex].count;
        if(count>0) {
        newArr[elIndex] = {...newArr[elIndex],count:count-1}; 
        }
        handleMenuList(newArr);
      }
      
      //Counter Component
      const CounterEl = (count,key) => {
        return(
          <View style={Styles.counter}>
              <TouchableOpacity onPress={handleAdd(key)}>
                <IconEl name="plus" style={Styles.countEl}  />
              </TouchableOpacity>
              <Text style={Styles.countEl}>{count}</Text>
              <TouchableOpacity onPress={handleSub(key)}>
                <IconEl name="minus" style={Styles.countEl}  />
              </TouchableOpacity>
          </View>
        ) 
      }

    return(
        <View style={Styles.card} >
            <View style={Styles.firstView}>
            <Image source={{uri:photoUri}} style={Styles.img} />
            <View style={Styles.secondView}>
                <View>
                    <Text style={globalStyles.header} >{name}</Text>
                    <Text style={globalStyles.desc}>{desc}</Text>
                </View>
                <View>
                <Text style={Styles.header}>Rs. {price}</Text>
                    {
                        count === 0 ?
                        <TouchableOpacity style={Styles.button} > 
                        <Text onPress={handleAdd(key,true)} style={Styles.buttonText} > Add +</Text>
                        </TouchableOpacity>
                        : CounterEl(count,key) 
                    }
                </View>
            </View>
            </View>
            
        </View>
    )
}

export default MenuCard;