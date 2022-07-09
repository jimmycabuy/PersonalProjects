import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";


export function ModifyEducationPage(props) {

  const isFocused = useIsFocused();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userID, setUserID] = useState("");
  const [school, setSchool] = useState('');
  const [fieldstudy, setFieldstudy] = useState('');
  const [degree, setDegree] = useState('');
  const [description, setDescription] = useState('');
  const [startDateToBDD, setStartDateToBDD] = useState();
  const [endDateToBDD, setEndDateToBDD] = useState();
  

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {  
    ( () => {
       AsyncStorage.getItem("id", function(error, data) {
         if(isFocused){
        const getEducation = async () => {
          let sendID = {id: data}
          let rawResponse = await fetch('http://192.168.0.114:3000/users/displayEducation', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sendID)
          })
          let response = await rawResponse.json()
          setUserID(data)
          setSchool(response[props.positionEducation].school)
          setFieldstudy(response[props.positionEducation].studyfield)
          setDegree(response[props.positionEducation].degree)
          setDescription(response[props.positionEducation].description)
          setStartDateToBDD(response[props.positionEducation].start)
          setEndDateToBDD(response[props.positionEducation].end)

            let dateFromDBStart = new Date(response[props.positionEducation].start);
            let dayFromDBStart = dateFromDBStart.getDate();
            let monthFromDBStart = dateFromDBStart.getMonth();
            let yearFromDBStart = dateFromDBStart.getFullYear();
            setStartDate(`${dayFromDBStart}/${monthFromDBStart + 1}/${yearFromDBStart}`)

            let dateFromDBEnd = new Date(response[props.positionEducation].end);
            let dayFromDBEnd = dateFromDBEnd.getDate();
            let monthFromDBEnd = dateFromDBEnd.getMonth();
            let yearFromDBEnd = dateFromDBEnd.getFullYear();
            setEndDate(`${dayFromDBEnd}/${monthFromDBEnd + 1}/${yearFromDBEnd}`)
        }
          getEducation()
      }
      });
    })();
    
  }, [isFocused]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showDatePickerEnd = () => {
    setDatePickerVisibilityEnd(true);
  };

  const onSubmitClick = async () => {
    if(school.length >= 1 && fieldstudy.length >= 1 && degree.length >= 1 && startDate.length >= 1, endDate.length >= 1){
    let sendUpdateEducation = {
      id: userID,
      educationId: props.educationId,
      school: school,
      studyfield: fieldstudy,
      degree: degree,
      start: startDateToBDD,
      end: endDateToBDD,
      description: description,
    }
    let rawResponse = await fetch('http://192.168.0.114:3000/users/modifyEducation', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sendUpdateEducation)
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
      <Text style={styles.title}>Edit Education</Text>
      <Text style={(errorMessage.length > 0)? styles.errorMessageStyle: {display: 'none'}}>{errorMessage}</Text>
      <TextInput
        style={styles.input}
        placeholder="School"
        onChangeText={(value) => setSchool(value)}
        value={school}
      />
      <TextInput
        style={styles.input}
        placeholder="Field of study"
        onChangeText={(value) => setFieldstudy(value)}
        value={fieldstudy}
      />
      <TextInput
        style={styles.input}
        placeholder="Degree obtained"
        onChangeText={(value) => setDegree(value)}
        value={degree}
      />
      <View style={{flexDirection:'row', justifyContent:'space-between', width:"80%"}}>

      <TouchableOpacity style={styles.input3} onPress={showDatePicker}>
        <Text style={(startDate.length > 0)? styles.inputDateBlack: styles.inputDateGray }>{(startDate.length > 0)? startDate: "Start"}</Text>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"

        onConfirm={(date) => {
          setDatePickerVisibility(false)
          let day = date.getDate();
          let month = date.getMonth();
          let year = date.getFullYear();
          setStartDate(`${day}/${month + 1}/${year}`);
          setStartDateToBDD(date)
        }}
        onCancel={() => {
          setDatePickerVisibility(false)
        }}
      />
      </TouchableOpacity>
      <TouchableOpacity style={styles.input3} onPress={showDatePickerEnd}>
        <Text style={(endDate.length > 0)? styles.inputDateBlack: styles.inputDateGray }>{(endDate.length > 0)? endDate: "End"}</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisibleEnd}
          mode="date"
          
          onConfirm={(date2) => {
            setDatePickerVisibilityEnd(false)
            let day = date2.getDate();
            let month = date2.getMonth();
            let year = date2.getFullYear();
            setEndDate(`${day}/${month + 1}/${year}`);
            setEndDateToBDD(date2)
          }}
          onCancel={() => {
            setDatePickerVisibilityEnd(false)
          }}
        />
      </TouchableOpacity>
      </View>
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
        positionEducation: state.positionEducation,
        educationId : state.educationId
    }
  }
    
  export default connect(mapStateToProps, null)
  (ModifyEducationPage);

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
  // marginTop:20,
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
  backgroundColor: "#FFF",
  borderRadius: 30,
  fontFamily: 'PoppinsSemiBold',
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
  fontWeight: "500",
  fontFamily: 'PoppinsSemiBold',
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
input3: {
  marginBottom: 20,
  fontSize: 20,
  fontWeight: "500",
  fontFamily: 'PoppinsSemiBold',
  backgroundColor: "#FFF",
  borderRadius: 30,
  width: "48%",
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
minicontainer: {
  flex: 1,
  justifyContent: 'center',
  width: "80%",
},
inner: {
  alignItems:'center',
  backgroundColor:'#fff',
  marginTop: 40,
},
returnButton: {
  marginLeft: 20,
  marginTop:100,
},
inputDateBlack: {
  color:"#000",
  fontSize:20, fontWeight:'500',
  textAlign:'center',
  paddingTop:12,
  fontFamily: 'PoppinsSemiBold',
},
inputDateGray: {
  color:"#B9B9B9",
  fontSize:20,
  fontWeight:'500',
  textAlign:'center',
  paddingTop:12,
  fontFamily: 'PoppinsSemiBold',
},
errorMessageStyle:{
  color: "red",
  marginBottom: 20,
  fontFamily: 'PoppinsSemiBold',
},
});