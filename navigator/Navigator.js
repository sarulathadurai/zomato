import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../src/screens/splashscreen';
import SignUp from '../src/screens/signup';
import SignIn from '../src/screens/signin';
import AddRes from '../src/screens/addRestaurant';
import AddMenu from '../src/screens/addMenu';
import MenuList from '../src/screens/menuList';
import PlaceOrders from '../src/screens/placeOrders';
import DrawerNavigator from './DrawerNavigator';
import { connect } from 'react-redux';
import Map from '../src/screens/map';


const Stack = createNativeStackNavigator();

const Navigator = (props) => {

  const {screenLoading,auth} = props;

    const authStack = ()  => {
      return(
        <>
        <Stack.Screen name="DrawNavigator" component={DrawerNavigator} /> 
        <Stack.Screen name="AddRes" component={AddRes} options={{headerShown:true}} />
        <Stack.Screen name="AddMenu" component={AddMenu} options={{headerShown:true}} /> 
        <Stack.Screen name="MenuList" component={MenuList} options={{headerShown:true}} />
        <Stack.Screen name="Map" component={Map} options={{ presentation: 'modal' }} />
        <Stack.Screen name="PlaceOrders" component={PlaceOrders} options={{headerShown:true}} />
       </> 
      )
    }

    const unAuthStack = () =>  {
      return(
        <>  
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp}  />
        </>
      )
    }

    const LoadingStack = () => {
     return <Stack.Screen name="SplashScreen" component={SplashScreen}/>
    }
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}} >
            {screenLoading ? LoadingStack() : auth ? authStack() : unAuthStack()}
          </Stack.Navigator>
        </NavigationContainer>
      );
}

const mapStateToProps = (state) => {
  return{
    auth:state.auth.auth,
    screenLoading:state.auth.screenLoading
  }
}

export default connect(mapStateToProps)(Navigator);
