import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WellDonePage(props) {
  let [firstName, setFirstName] = useState("");

  useEffect(() => {  
    ( () => {
      AsyncStorage.getItem("firstName", function(error, data) {
        setFirstName(data)
       });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo}/>
      <Text style={styles.textDescription}>
        🚀🚀🚀{'\n'}
        Well done {firstName},{'\n'}
        you are ready to find{'\n'}
        the job of <Text style={{color: "#7791DE"}}>U</Text>r dream{'\n'}
        🚀🚀🚀
      </Text>
      <TouchableOpacity style={styles.button1} onPress={() => {props.navigation.navigate('HomePage')}}>
        <Text style={{color:"#fff", fontSize:20, fontWeight:'600', fontFamily:'PoppinsSemiBold'}}>Let's go!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width:143,
    height:100,
    marginTop:100
  },
  textDescription: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily:'PoppinsSemiBold'
  },
  button1: {
    borderRadius:25,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: '#7791DE',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    elevation: 9,
    shadowRadius: 3.84,
    shadowOffset : { width: 0, height: 3 },
    color:"#fff",
    marginBottom: 100,
    height:50,
    width: 200,
    justifyContent:"center",
    alignItems:'center',
  },
});