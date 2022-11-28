import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../src/screens/dashboard';
import Orders from '../src/screens/orders';
import Icon from 'react-native-vector-icons/Ionicons';
import Map from '../src/screens/map/Map';
Icon.loadFont();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'reorder-four' : 'reorder-four-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }else if(route.name === 'Explore'){
            iconName = focused ? 'compass' : 'compass-outline'
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })
    }

      >
        <Tab.Screen name="Home" component={Dashboard} options={{headerShown: false}} />
        <Tab.Screen name="Explore" component={Map} options={{headerShown: false}} />
        <Tab.Screen name="Orders" component={Orders} options={{headerShown: false}} />
      </Tab.Navigator>
  );
}

export default TabNavigator;