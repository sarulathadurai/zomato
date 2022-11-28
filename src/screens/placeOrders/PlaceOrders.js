import React,{useState,useEffect} from 'react';
import {FlatList, Text, View,ActivityIndicator,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Alert from '../../components/Alert';
import ButtonEl from '../../components/ButtonEl';
import {IconEl} from '../../components/Icons';
import { closeAlert,addOrder } from '../../redux/action/order';
import { Styles } from './styles';

const PlaceOrders = (props) => {

    const [total,setTotal] = useState(0);
    const {orders,show,isLoading,isSuccess} = props

    const TotalAmount =()=>{
        const itemTotal = orders.reduce((acc,item)=>{
            acc +=  item.count * item.price;
            return acc;
        },0);
        setTotal(itemTotal);
    }

    useEffect(()=>{
        TotalAmount();
    },[])

    const calculateBill = ()=>{
      setLoading(true);
      let itemName = orders.reduce((acc,item)=>{
          acc +=item.name+','
          return acc;
      },"");
      let res = orders[0];
      let order = {total:total,items:itemName,resName:res.resName};
      props.placeOrder(order);
    }

    const Card = ({item}) => {
        return (
            <View style={Styles.container} >
                <Text style={Styles.text}>{item.name}</Text>
                <Text style={Styles.text}>{item.price}</Text>
                <Text style={Styles.text}>{item.count} </Text>
            </View>
        )
        
    }

    const showAlert = () => {
        return(
            show && (isSuccess? 
                <TouchableOpacity onPress={props.closeAlert()} >
                <Alert bgColor={Styles.success} msg={"Orders Placed Successfully"}>
                    <IconEl name="times" style={Styles.alertIcon} />
                </Alert>
                </TouchableOpacity> 
                : 
                <TouchableOpacity onPress={props.closeAlert()}>
                <Alert bgColor={Styles.error} msg={"Retry !"}>
                    <IconEl name="times" style={Styles.alertIcon} />
                  </Alert>  
                </TouchableOpacity>
                )
        )
    }

    return (
        <SafeAreaView>
            {isLoading && <ActivityIndicator size="large" color="red" />}
            
            <View style={Styles.container} >
                <Text style={[Styles.text,Styles.header]}>Item</Text>
                <Text style={[Styles.text,Styles.header]}>Price</Text>
                <Text style={[Styles.text,Styles.header]}>Count</Text>
                </View>
                <View style={Styles.container} >
                <FlatList 
                    data={orders}
                    renderItem={Card}
                />
                </View>
                <Text style={[Styles.total,Styles.container]}>Total         {total}</Text>

                <ButtonEl title="Buy"  pressHandler={calculateBill}/>
                {showAlert()}
        </SafeAreaView>
    )
}

const mapStateToProps = ({order}) => {
    return{
        orders:order.orders,
        show:order.show,
        isLoading:order.isLoading,
        isSuccess:order.isSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        placeOrder:(payload)=>dispatch(addOrder(payload)),
        closeAlert:(payload)=>dispatch(closeAlert(payload))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(PlaceOrders);