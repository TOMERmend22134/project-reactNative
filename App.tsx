import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './screens/HomePage';
import Register from './componens/Register';
import Login from './componens/Login';
import RegistrationOfHoursByClient from './componens/RegistrationOfHoursByClient';
import ViewingClientDocuments from './componens/ViewingClientDocuments';
import Profile from './screens/Profile';
import EditProfile from './componens/EditProfile';
import { Ionicons, MaterialIcons } from 'react-native-vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function NavigateUsers() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="RegistrationOfHoursByClient" 
        component={RegistrationOfHoursByClient}  
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="access-time" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="ViewingClientDocuments" 
        component={ViewingClientDocuments}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Profile_user">
      <Drawer.Screen name="Profile" component={NavigateUsers} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="User" component={DrawerNavigator} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
