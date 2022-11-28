import * as React from 'react';
import { createDrawerNavigator,DrawerItem, DrawerContentScrollView,
    DrawerItemList,} from '@react-navigation/drawer';
import AddRes from '../src/screens/addRestaurant';
import AddMenu from '../src/screens/addMenu';
import TabNavigator from './TabNavigator';
import Header from '../src/components/Header';
import { connect } from 'react-redux';
import { signOut } from '../src/redux/action/auth';
import Map from '../src/screens/map/Map';


const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation,...props}) => {
    const {userRole,signout,auth} = props;
    const Signout = (props) => {
        const handleSignout = () => {
            signout();
            auth&&navigation.navigate("SignIn")
        }
        return(
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Signout" onPress={handleSignout} />
            </DrawerContentScrollView>
        );}

  return (
        <Drawer.Navigator
        drawerContent={(props) => <Signout {...props} />}
        screenOptions={{headerTitle: (props) => <Header />}}>
            <Drawer.Screen name="Dashboard" component={TabNavigator} /> 
            {userRole === 1&&
            <>
            <Drawer.Screen name="Add Restaurant" component={AddRes} />
            <Drawer.Screen name="Add Menu" component={AddMenu} />
            </>
            }
        </Drawer.Navigator>
    
  );
}

const mapStateToProps = ({auth}) => {
   return{
       userRole:auth.user.role,
       auth:auth.user.auth
   }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signout:()=>dispatch(signOut())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DrawerNavigator);