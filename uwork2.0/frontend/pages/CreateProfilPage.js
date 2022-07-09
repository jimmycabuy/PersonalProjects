import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image  } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CreateProfilPage(props) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [emailStorage, setEmailStorage] = useState('');
  const [tokenStorage, setTokenStorage] = useState('');
  const [passwordStorage, setPasswordStorage] = useState('');
  const [image, setImage] = useState(null);
  const [urlProfilePic, setUrlProfilePic] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {  
    ( () => {
      AsyncStorage.getItem("email", function(error, data) {
        setEmailStorage(data)
       });
       AsyncStorage.getItem("token", function(error, data) {
        setTokenStorage(data)
       });

       AsyncStorage.getItem("password", function(error, data) {
        setPasswordStorage(data)
       });
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      var data = new FormData();
               
      data.append('avatar', {
          uri: result.uri,
          type: 'image/jpeg',
          name: 'user_avatar.jpg',
       });
       var rawResponse = await fetch('http://192.168.0.114:3000/users/uploalProfilePicture', {
           method: 'POST',
           body: data
       })
       var response = await rawResponse.json()
       console.log(response.resultCloudinary.url);
       setUrlProfilePic(response.resultCloudinary.url)
    }
  };

  var imageProfile;
  if(!image){
    imageProfile = <Text style={{color:"#B9B9B9", fontSize:100, fontWeight:'100', paddingBottom:8}}>+</Text>
  } else {
    imageProfile = <Image source={{ uri: image }} style={{ width: 152, height: 152, borderRadius:150 }} />
  }

  const onSubmitClick = async () => {
    if(firstName.length >= 1 && lastName.length >= 1 && age >= 16 && city.length >= 3){

      let sendProfile = {
        firstName: firstName,
        lastName: lastName,
        avatar: urlProfilePic,
        age: age,
        city: city,
        bio: bio,
        email: emailStorage,
        password: passwordStorage,
        token: tokenStorage,
      }

      let rawResponse = await fetch('http://192.168.0.114:3000/users/createProfile', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(sendProfile)
      })

      let response = await rawResponse.json()
      AsyncStorage.setItem("id", response.id)
      AsyncStorage.setItem("firstName", response.firstName)
      AsyncStorage.setItem("avatar", response.avatar)

      AsyncStorage.removeItem('password')
      props.navigation.navigate('AddCVPage')
    } else {
      setErrorMessage("Please fill in all the fields")
    }
  }

  return (
      <KeyboardAwareScrollView style={{backgroundColor:"#fff"}}>
        <View style={styles.inner}>
          <Text style={styles.title}>Complete <Text style={{color:'#7791DE'}}>U</Text>r profile</Text>
          <TouchableOpacity style={styles.buttonAddPicture} onPress={pickImage}>
            {imageProfile}
          </TouchableOpacity>
          <Text style={(errorMessage.length > 0)? styles.errorMessageStyle: {display: 'none'}}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(value) => setFirstName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(value) => setLastName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            onChangeText={(value) => setAge(value)}

          />
          <TextInput
            style={styles.input}
            placeholder="City"
            onChangeText={(value) => setCity(value)}

          />
          <TextInput
            style={styles.input2}
            placeholder="Bio"
            onChangeText={(value) => setBio(value)}
            multiline={true}

          />
            <TouchableOpacity style={styles.button1} onPress={() => onSubmitClick() }>
              <Text style={{color:"#fff", fontSize:20, fontFamily:'PoppinsSemiBold'}}>Continue</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
  )
}

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
    color:"#000",
    fontFamily:'PoppinsSemiBold',
    marginBottom: 20    
  },
  buttonAddPicture: {
    width:150,
    height:150,
    borderRadius:500,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 2,
    borderColor: "#B9B9B9",
    borderStyle: 'dashed',
    marginBottom: 20
  },
  input: {
    marginBottom: 20,
    fontSize: 20,
    fontFamily:'PoppinsSemiBold',
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
    fontFamily:'PoppinsSemiBold',
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
    marginTop: 100,
  },
  errorMessageStyle:{
    color: "red",
    marginBottom: 20,
    fontFamily: 'PoppinsSemiBold',
  },
});