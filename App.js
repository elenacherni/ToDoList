
import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Login from './components/Login'
import * as firebase from 'firebase'
import {firebaseConfig} from './config'

firebase.initializeApp(firebaseConfig); 

export default function App() {
  
  return (
  <View style={styles.container}>
    <StatusBar style="auto" />
    <Login/>
  </View>
  );
 }
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  
});
  
