import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import index from './index'
import CreateEventPage from './CreateEventPage'
import Login from './Login'
import UserProfile from './UserProfile';
import ContactsPage from './components/ContactsPage';
import ChatPage from './components/ChatPage';
import Registration from './Registration';
import MoodSet from './MoodSet';
import ActivitySet from './ActivitySet';
import MoodRefine from './MoodRefine';
import Setting from './Setting';

const Stack = createNativeStackNavigator();


const _layout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={index} />
      <Stack.Screen name="CreateEventPage" component={CreateEventPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name='UserProfile' component={UserProfile}/>
      <Stack.Screen name='components/ContactsPage' component={ContactsPage}/>
      <Stack.Screen name='components/ChatPage' component={ChatPage}/>
      <Stack.Screen name='MoodSet' component={MoodSet}/>
      <Stack.Screen name='ActivitySet' component={ActivitySet}/>
      <Stack.Screen name='MoodRefine' component={MoodRefine}/>
      <Stack.Screen name='Setting' component={Setting}/>

    </Stack.Navigator>
    
  
  )
}

export default _layout