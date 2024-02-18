import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import index from './index'
import CreateEventPage from './CreateEventPage'
import Login from './Login'
import UserProfile from './UserProfile';
import ContactsPage from './components/ContactsPage';


const Stack = createNativeStackNavigator();


const _layout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={index} />
      <Stack.Screen name="CreateEventPage" component={CreateEventPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name='UserProfile' component={UserProfile}/>
      <Stack.Screen name='ContactsPage' component={ContactsPage}/>

    </Stack.Navigator>
    
  
  )
}

export default _layout