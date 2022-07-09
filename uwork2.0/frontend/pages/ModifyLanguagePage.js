import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";


export function ModifyLanguagePage(props) {
    
const isFocused = useIsFocused();
  
  const [userID, setUserID] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {  
    ( () => {
       AsyncStorage.getItem("id", function(error, data) {
         if(isFocused){
        const getLanguage = async () => {
          let sendID = {id: data}
          let rawResponse = await fetch('http://192.168.0.114:3000/users/displayLanguage', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sendID)
          })
          let response = await rawResponse.json()
          setLanguage(response[props.positionLanguage].name)
          setLevel(response[props.positionLanguage].level)
          setDescription(response[props.positionLanguage].description)
          setUserID(data)
        }
          getLanguage()
      }
      });
    })();
    
  }, [isFocused]);

  const onSubmitClick = async () => {
    if(language.length >= 1 && level.length >= 1){
    let sendUpdateLanguage = {
      id: userID,
      languageId: props.languageId,
      name: language,
      level: level,
      description: description
    }
    let rawResponse = await fetch('http://192.168.0.114:3000/users/modifyLanguage', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sendUpdateLanguage)
    })

    await rawResponse.json()
    props.navigation.navigate('ProfilPage')
    }
    else {
      setErrorMessage("Please fill in all the fields")
    }
  }

  return (
  <KeyboardAwareScrollView style={{backgroundColor:"#fff"}}>
    <Ionicons
      name={'chevron-back-outline'}
      size={45} color={'#7791DE'}
      style={styles.returnButton}
      onPress={() => onSubmitClick()}
    />
    <View style={styles.inner}>
      <Text style={styles.title}>Edit Language</Text>
      <Text style={(errorMessage.length > 0)? styles.errorMessageStyle: {display: 'none'}}>{errorMessage}</Text>
      <TextInput
        style={styles.input}
        placeholder="Language"
        onChangeText={(value) => setLanguage(value)}
        value={language}
      />
      <TextInput
        style={styles.input}
        placeholder="Level"
        onChangeText={(value) => setLevel(value)}
        value={level}
      />
      <TextInput
        style={styles.input2}
        placeholder="Description"
        onChangeText={(value) => setDescription(value)}
        value={description}
        multiline={true}
      />
        <TouchableOpacity style={styles.button1} onPress={() => onSubmitClick()}>
          <Text style={{color:"#fff", fontSize:20, fontWeight:'500', fontFamily:'PoppinsSemiBold'}}>Save</Text>
        </TouchableOpacity>
    </View>
  </KeyboardAwareScrollView>
)
}

function mapStateToProps(state){
    return{
        positionLanguage: state.positionLanguage,
        languageId : state.languageId
    }
  }
    
  export default connect(mapStateToProps, null)
  (ModifyLanguagePage);

const styles = StyleSheet.create({
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
  marginBottom:10,
  height:50,
  width: 200,
  justifyContent:"center",
  alignItems:'center',
},
title: {
  fontSize: 30,
  textAlign:'center',
  color:"#7791DE",
  fontWeight: '600',
  marginBottom: 20,
  fontFamily: 'PoppinsSemiBold',
},
input: {
  marginBottom: 20,
  fontSize: 20,
  fontWeight: "500",
  fontFamily: 'PoppinsSemiBold',
  backgroundColor: "#FFF",
  borderRadius: 30,
  width: "80%",
  height: 50,
  textAlign: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3.84,
  elevation: 9,
},
input2: {
  paddingLeft:15,
  paddingRight:15,
  paddingTop:15,
  marginBottom: 20,
  fontSize: 20,
  fontFamily: 'PoppinsSemiBold',
  fontWeight: "500",
  backgroundColor: "#FFF",
  borderRadius: 30,
  width: "80%",
  height: 140,
  textAlign: 'center',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3.84,
  elevation: 9,
},
inner: {
  alignItems:'center',
  backgroundColor:'#fff',
  marginTop: 82,
},
returnButton: {
  marginLeft: 20,
  marginTop:100,
},
errorMessageStyle:{
  color: "red",
  marginBottom: 20,
  fontFamily: 'PoppinsSemiBold',
},
});