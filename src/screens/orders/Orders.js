
import React,{useEffect,useState,useCallback} from 'react';
import {Text, View,ActivityIndicator, FlatList,RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from './Style';
import {getOrder} from "../../redux/action/order";
import {connect} from "react-redux";
import { Button } from 'react-native';
import { wait } from '../../utils/wait';
const Orders = (props) => {

    const {pastOrders,isLoading} = props;
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        props.getOrder();
    },[])


    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() =>{
        props.getOrder();
        setRefreshing(false);
      });
      }, []);


    const Card = ({item}) => {
        return(  
            <View style={Styles.card} >
            <View style ={Styles.container1} >
            <Text style={Styles.header}>{item.resName}</Text> 
            <Text style={Styles.header}>Rs.{item.total}</Text>
            </View>
            <View style={Styles.container2}>
                <Text style ={Styles.header}>Items</Text>
                <Text style ={Styles.subheader}>{item.items}</Text>
                <Text style ={Styles.header}>Ordered on</Text>
                <Text style ={Styles.subheader}>{item.date}</Text>
            </View>               
        </View>
        )
    }
    return (
        <SafeAreaView>
            <Button title="fetch" onPress={onRefresh} />
            {isLoading && <ActivityIndicator size="small" color="red" />}
            {
              (pastOrders && pastOrders.length > 0)&&
              <FlatList
                data={pastOrders}
                renderItem={Card}
                keyExtractor={item => item.key}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
            />
            }

        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {  
  return{
    pastOrders:state.order.pastOrders,
    isLoading:state.order.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getOrder:()=>dispatch(getOrder())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);