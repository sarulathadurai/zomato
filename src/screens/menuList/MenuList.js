import React, { useEffect,useState } from 'react'
import { SafeAreaView, FlatList, StyleSheet,ActivityIndicator,Button, TouchableOpacity } from 'react-native'
import MenuCard from '../../components/MenuCard'
import {IconEl} from '../../components/Icons';
import Alert from '../../components/Alert';
import { connect, useSelector } from 'react-redux';
import { getMenu,getCount } from '../../redux/action/menu';
import { createOrder } from '../../redux/action/order';
import { wait } from '../../utils/wait';

export const OrderContext = React.createContext();

const MenuList = ({navigation,route,...props}) => {
    const {id} = route.params;
    const [isOrder,setOrder] = useState(false);
    const menu = useSelector(state => state.menu)
    const {menuList,isLoading} = menu;
    const [refreshing, setRefreshing] = useState(false);

    const handleOrder = (bool) => {
      setOrder(bool);
    }

    // send order details to placeorders
    const handleOrderList = () => {
      const orders = menuList.filter((el)=>el.count>0);
      props.createOrder(orders);
      navigation.navigate("PlaceOrders");
    }
    
    const handleMenuList = (menu) => {
      props.getCount(menu);
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() =>{
        props.getMenu(id);
        setRefreshing(false);
      });
    }, []);
  
    
    useEffect(() => {
       props.getMenu(id);
    }, [])
 
    return(
        <SafeAreaView style={Styles.container} >
            {isLoading && <ActivityIndicator size="small" color="red" />}
            <Button title="fetch" onPress={forceUpdate} />
            {isOrder&&
            <TouchableOpacity onPress={handleOrderList}> 
              <Alert bgColor={Styles.bgColor} msg="See your orders">
                <IconEl name="chevron-right" style={Styles.alertText} />
              </Alert>
            </TouchableOpacity>  
            }
            {
              (menuList&&menuList.length > 0) ?
              ( <FlatList
                data={menuList}
                renderItem={(item)=>{
                  return(
                    <OrderContext.Provider value={{handleOrder,handleMenuList}} >
                      <MenuCard item={item} menuList={menuList}/>
                    </OrderContext.Provider >    
                  )
                }}
                keyExtractor={item => item.key}
                extraData={menuList}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }        
            />):
              (
                <ActivityIndicator size="small" color="red" />
              )
            }
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
  container:{
    flex:1
  },
  bgColor:{
    backgroundColor:"#e8424f",
  },
  alertText:{
    color:"#fff",
    fontSize:15,
    fontWeight:"700",
    padding:5
  }
})

const mapStateToProps = ({menu}) => {
  const menuList = menu.menuList.length > 0 ? menu.menuList : [];
  return{
    menuList:menuList,
    isLoading:menu.menuLoad
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getMenu:(payload)=>dispatch(getMenu(payload)),
    createOrder:(payload)=>dispatch(createOrder(payload)),
    getCount:(payload)=>dispatch(getCount(payload))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MenuList);