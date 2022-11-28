import React,{useEffect,useState,useCallback} from 'react'
import { SafeAreaView,Button, FlatList, TouchableHighlight,ActivityIndicator,RefreshControl } from 'react-native'
import Card from '../../components/Cards';
import { Styles } from './Style';
import { connect} from 'react-redux';
import { getRes } from '../../redux/action/restaurant';
import { useSelector} from 'react-redux';
import { wait } from '../../utils/wait';

const Dashboard = ({navigation,...props}) => {
    
    const restaurant = useSelector(state => state.restaurant)
    const {restaurants,dashLoading} = restaurant;
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      props.getRes();
    },[]);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() => {
      props.getRes();
      setRefreshing(false)
      });
    }, []);

    return (
        <SafeAreaView style={Styles.container} >
          <Button title="fetch" onPress={onRefresh} />
            {dashLoading && <ActivityIndicator size="small" color="red" />}
              <FlatList
                data={restaurants}
                renderItem={(item)=>{
                    return(
                        <TouchableHighlight onPress = {()=>navigation.navigate("MenuList",{id:item.item.key})}>
                            <Card item={item.item} />
                        </TouchableHighlight>
                    )
                }}
                keyExtractor={item => item.key}
                extraData={restaurants}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="red"
                    progressBackgroundColor="red"
                  />
                }
            />
        </SafeAreaView>
    )
}

const mapDispatchToProps = (dispatch) => {
  return{
    getRes:()=>dispatch(getRes())
  }
}



export default connect(null,mapDispatchToProps)(Dashboard);