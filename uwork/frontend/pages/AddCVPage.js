import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";


export default function AddCVPage(props) {

  const [firstName, setFirstName] = useState('');
  const [listEducation, setListEducation] = useState([]);
  const [listLanguage, setListLanguage] = useState([]);
  const [listExperience, setListExperience] = useState([]);
  const [listLicence, setListLicence] = useState([]);
  const [listSkills, setListSkills] = useState([]);

  
  const isFocused = useIsFocused();
  
  useEffect(() => {  
      AsyncStorage.getItem("firstName", function(error, data) {
        setFirstName(data)
       });
       AsyncStorage.getItem("id", function(error, data) {
        if(isFocused){ 
          const getLanguages = async () => {
            let sendID = {id: data}
            let rawResponse = await fetch('http://192.168.0.114:3000/users/displayLanguage', {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(sendID)
            })
            let response = await rawResponse.json()
            setListLanguage(response)
          }
          const getEducation = async () => {
            let sendID = {id: data}

            let rawResponse = await fetch('http://192.168.0.114:3000/users/displayEducation', {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(sendID)
            })
            let response = await rawResponse.json()
            setListEducation(response)
          }
          getLanguages()
          getEducation()
      }
       });
  }, [isFocused]);
  
  return (
  <View style={styles.container}>
      <Text style={styles.title}>Nice to meet <Text style={{color:'#7791DE'}}>U</Text>, {"\n"}{firstName} 👋🏼</Text>
      <Text style={{fontSize: 25, textAlign:'center', color:"#7791DE", fontFamily:'PoppinsSemiBold', marginBottom:10 }}>Let's set up Ur profile!</Text>
    <View style={styles.minicontainer}>
      <ScrollView contentContainerStyle={{height:520, justifyContent:'center', paddingLeft:10, paddingRight:10}}>

      <View style={{marginBottom:20}}>
      <View style={(listEducation.length == 0) ? styles.card3 : styles.card}>
          <Text style={{fontSize: 20, color:'#B9B9B9', fontFamily:'PoppinsSemiBold'}}>
            Education
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#7791DE', borderRadius:10, marginRight:5}}>
            {/* <Text style={styles.editText}>EDIT</Text> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.navigation.navigate('AddEducationPage')}}>
            <IonIcon name="add-outline" size={30} color="#7791DE"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={(listEducation.length == 0) ? {display:'none'} : styles.card2}>
        <ScrollView>
        {listEducation.map((education, i) => (
            <Text key={i} style={styles.undertitle}>{education.school}</Text>
          ))}
        </ScrollView>
        </View>
      </View>
      
      <View style={{marginBottom:20}}>
        <View style={(listExperience.length == 0) ? styles.card3 : styles.card}>
          <Text style={{fontSize: 20, color:'#B9B9B9', fontFamily:'PoppinsSemiBold'}}>
            Experience
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#7791DE', borderRadius:10, marginRight:5}}>
            {/* <Text style={styles.editText}>EDIT</Text> */}
            </TouchableOpacity>
            <TouchableOpacity>
            <IonIcon name="add-outline" size={30} color="#7791DE"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={(listExperience.length == 0) ? {display:'none'} : styles.card2}>
        <ScrollView>
          
        </ScrollView>
        </View>
      </View>

      <View style={{marginBottom:20}}>
      <View style={(listLanguage.length == 0) ? styles.card3 : styles.card}>
          <Text style={{fontSize: 20, color:'#B9B9B9', fontFamily:'PoppinsSemiBold'}}>
            Language
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#7791DE', borderRadius:10, marginRight:5}}>
            {/* <Text style={styles.editText}>EDIT</Text> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.navigation.navigate('AddLanguagePage')}}>
            <IonIcon name="add-outline" size={30} color="#7791DE"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={(listLanguage.length == 0) ? {display:'none'} : styles.card2}>
        <ScrollView>
          {listLanguage.map((langue, i) => (
            <Text key={i} style={styles.undertitle}>{langue.name}</Text>
          ))}
        </ScrollView>
        </View>
      </View>

      <View style={{marginBottom:20}}>
      <View style={(listLicence.length == 0) ? styles.card3 : styles.card}>
          <Text style={{fontSize: 20, color:'#B9B9B9', fontFamily:'PoppinsSemiBold'}}>
            Licence
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#7791DE', borderRadius:10, marginRight:5}}>
            {/* <Text style={styles.editText}>EDIT</Text> */}
            </TouchableOpacity>
            <TouchableOpacity>
            <IonIcon name="add-outline" size={30} color="#7791DE"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={(listLicence.length == 0) ? {display:'none'} : styles.card2}>
        <ScrollView>
          
        </ScrollView>
        </View>
      </View>

      <View style={{marginBottom:20}}>
      <View style={(listSkills.length == 0) ? styles.card3 : styles.card}>
          <Text style={{fontSize: 20, color:'#B9B9B9', fontFamily:'PoppinsSemiBold'}}>
            Skills
          </Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#7791DE', borderRadius:10, marginRight:5}}>
            {/* <Text style={styles.editText}>EDIT</Text> */}
            </TouchableOpacity>
            <TouchableOpacity>
            <IonIcon name="add-outline" size={30} color="#7791DE"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={(listSkills.length == 0) ? {display:'none'} : styles.card2}>
        <ScrollView>
          
        </ScrollView>
        </View>
      
      </View>

    </ScrollView>
    </View>
      <TouchableOpacity style={styles.button1} onPress={() => {props.navigation.navigate('AddTypeJobPage')}}>
        <Text style={{color:"#fff", fontSize:20, fontFamily:'PoppinsSemiBold'}}>Continue</Text>
      </TouchableOpacity>
      
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingTop:100,
    paddingBottom: 100,
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
    marginBottom:20,
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
  card: {
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    fontFamily:'PoppinsSemiBold',
    borderTopEndRadius:15,
    borderTopStartRadius:15,

    height: 40,
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
  card2: {
    backgroundColor: "#fff",
    justifyContent: 'center',
    paddingLeft: 10,
    fontFamily:'PoppinsSemiBold',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    height: 65,
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
  card3: {
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    fontWeight: "500",
    fontFamily:'PoppinsSemiBold',
    borderRadius:15,
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
  editText: {
    fontSize: 10, 
    color:'#fff', 
    padding:8,
    fontWeight: 'bold',
    fontFamily:'PoppinsSemiBold',
  },
  minicontainer: {
    flex: 1,
    justifyContent: 'center',
    width: "80%",
  },
  undertitle: {
    paddingTop:1, 
    paddingBottom: 1, 
    fontSize:15,
    fontFamily:'PoppinsSemiBold',
  }
});