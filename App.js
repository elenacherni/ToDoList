
import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,} from 'react-native';
import * as firebase from 'firebase'
import {firebaseConfig} from './config'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login'
import ToDoMain from './screens/ToDoMain'

firebase.initializeApp(firebaseConfig); 

const Stack = createStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="To Do List" component={ToDoMain} />
    </Stack.Navigator>
  </NavigationContainer>
  );
 }

 export default App;

