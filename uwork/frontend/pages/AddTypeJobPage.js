import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Slider, CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-elements/dist/helpers';

export default function AddTypeJobPage(props) {
  let [typeContract, setTypeContract] = useState("");
  let [sector, setSector] = useState("");
  let [city, setCity] = useState("");
  let [inputValue, setInputValue] = useState(0);
  let [regime, setRegime] = useState("");
  let [displayMenu, setDisplayMenu] = useState(false);
  let [userID, setUserID] = useState("");

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  useEffect(() => {  
    ( () => {
      AsyncStorage.getItem("id", function(error, data) {
        setUserID(data)
       });
    })();
  }, []);

  const onScrollMenuClick = () => {
    if(displayMenu === false){
      setDisplayMenu(true);
    } else {
      setDisplayMenu(false);
    }
  }

  const onSubmitClick = async () => {
    let sendTypeJobProfil = {
      id: userID,
      contract: typeContract,
      sector: sector,
      city: city,
      distance: inputValue,
      regime: regime,
    }

    let rawResponse = await fetch('http://192.168.0.114:3000/users/addTypeJob', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sendTypeJobProfil)
    })

    await rawResponse.json()
    props.navigation.navigate('WellDonePage')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonLater}
        onPress={() => props.navigation.navigate('WellDonePage')}
      >
        <Text style={styles.textLater}>Later</Text>
      </TouchableOpacity>
      <Text style={styles.textTitle}>What is the job of Ur dream?</Text>
      <View style={(displayMenu === false)? styles.scrollMenu: styles.scrollMenuScrolling}>
        <Ionicons name={'chevron-back-outline'} size={45} color={'transparent'} />
        <Text style={(typeContract.length === 0)? styles.textScrollMenu: styles.textScrollMenuBlack}>{(typeContract.length === 0)? "Type of contract": typeContract}</Text>
        <Ionicons
          name={'chevron-down-outline'}
          size={30} color={'#B9B9B9'}
          style={styles.dropDown}
          onPress={() => onScrollMenuClick()}
        />
      </View>
      <View style={(displayMenu === true) ? styles.dropDownList: {display: "none"}}>
        <Text style={styles.textScroolMenu} onPress={() => {setTypeContract("Full Time"), setDisplayMenu(false)}}>Full time</Text>
        <Text style={styles.textScroolMenu} onPress={() => {setTypeContract("Part Time"), setDisplayMenu(false)}}>Part time</Text>
        <Text style={styles.textScroolMenu} onPress={() => {setTypeContract("Freelance"), setDisplayMenu(false)}}>Freelance</Text>
        <Text style={styles.textScroolMenu}  onPress={() => {setTypeContract("Student"), setDisplayMenu(false)}}>Student</Text>
        <Text style={styles.textScroolMenu} onPress={() => {setTypeContract("Intership"), setDisplayMenu(false)}}>Intership</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder = "Sector"
        onChangeText={(value) => setSector(value)}
        value={sector}
      />
      <TextInput
        style={styles.input}
        placeholder = "City"
        onChangeText={(value) => setCity(value)}
        value={city}
      />
      <Text style={(inputValue === 0)? styles.distanceText: styles.distanceTextBlack}>Distance</Text>
      <Slider
        style={{width: "80%"}}
        minimumTrackTintColor="#B9B9B9"
        thumbStyle={styles.thumb}
        onValueChange={(value) => setInputValue(value)}
        value={inputValue}
        animateTransitions={true}
        minimumValue= {0}
        maximumValue= {100}
        step={5}
      />
      <Text style={(inputValue === 0)? styles.radiusDistance: styles.radiusDistanceBlack}>{inputValue} km</Text>
      <View style={styles.containerCheckBox}>
        <CheckBox
          center
          textStyle={{color: "#B9B9B9", marginLeft:0, fontFamily:'PoppinsSemiBold'}}
          containerStyle={styles.checkBox}
          checkedTitle={
            <Text style={{color: "#000", fontFamily:'PoppinsSemiBold'}}>Remote</Text>
          }
          title="Remote"
          checkedIcon={
            <Ionicons
              name={'checkmark-circle-outline'}
              size={30} color={'#000'}
            />
          }
          uncheckedIcon={
            <Ionicons
              name={'ellipse-outline'}
              size={30} color={'#B9B9B9'}
            />
          }
          onPress={() => {setCheck1(!check1), setCheck2(false), setCheck3(false), setRegime("Remote")}}
          checked={check1}
        />
        <CheckBox
          center
          textStyle={{color: "#B9B9B9", marginLeft:0, fontFamily:'PoppinsSemiBold'}}
          containerStyle={styles.checkBox}
          checkedTitle={
            <Text style={{color: "#000", fontFamily:'PoppinsSemiBold'}}>Office only</Text>
          }
          title="Office only"
          checkedIcon={
            <Ionicons
              name={'checkmark-circle-outline'}
              size={30} color={'#000'}
            />
          }
          uncheckedIcon={
            <Ionicons
              name={'ellipse-outline'}
              size={30} color={'#B9B9B9'}
            />
          }
          onPress={() => {setCheck3(!check3), setCheck1(false), setCheck2(false), setRegime("Office only")}}
          checked={check3}
        />
        <CheckBox
          center
          textStyle={{color: "#B9B9B9", marginLeft:0, fontFamily:'PoppinsSemiBold'}}
          containerStyle={styles.checkBox}
          checkedTitle={
            <Text style={{color: "#000", fontFamily:'PoppinsSemiBold'}}>Hybride</Text>
          }
          title="Hybride"
          checkedIcon={
            <Ionicons
              name={'checkmark-circle-outline'}
              size={30} color={'#000'}
            />
          }
          uncheckedIcon={
            <Ionicons
              name={'ellipse-outline'}
              size={30} color={'#B9B9B9'}
            />
          }
          onPress={() => {setCheck2(!check2), setCheck1(false), setCheck3(false), setRegime("Hybride")}}
          checked={check2}
        />
      </View>
      <TouchableOpacity style={styles.button1} onPress={() => onSubmitClick() }>
        <Text style={{color:"#fff", fontSize:20, fontFamily:'PoppinsSemiBold'}}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  buttonLater: {
    marginTop: 50,
    width: "100%",
    alignItems: "flex-end"
  },
  textLater: {
    color: "#C9C9C9",
    fontSize: 17,
    fontFamily:'PoppinsSemiBold',
    marginRight: 30,
  },
  textTitle: {
    marginTop: 100,
    marginBottom: 50,
    color: "#7791DE",
    fontSize: 25,
    fontFamily:'PoppinsSemiBold',
  },
  scrollMenu: {
    marginTop: 20,
    fontSize: 20,
    fontFamily:'PoppinsSemiBold',
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: "80%",
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 9,
  },
  scrollMenuScrolling: {
    marginTop: 20,
    fontSize: 20,
    fontFamily:'PoppinsSemiBold',
    backgroundColor: "#FFF",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: "80%",
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 9,
  },
  textScrollMenu: {
    color: "#B9B9B9",
    fontSize: 20,
    fontFamily:'PoppinsSemiBold',
  },
  textScrollMenuBlack: {
    color: "#000",
    fontSize: 20,
    fontFamily:'PoppinsSemiBold',
  },
  dropDown: {
    marginRight: 10,
  },
  dropDownList: {
    width: "80%",
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 9,
  },
  textScroolMenu: {
    fontSize: 20,
    fontFamily:'PoppinsSemiBold',
    color: "#A9A9A9",
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  input: {
    marginTop: 20,
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
  distanceText: {
    marginTop: 20,
    color: "#B9B9B9",
    fontSize: 18,
    fontFamily:'PoppinsSemiBold',
  },
  distanceTextBlack: {
    marginTop: 20,
    color: "#000",
    fontSize: 18,
    fontFamily:'PoppinsSemiBold',
  },
  thumb: {
    width: 25,
    height: 25,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#B9B9B9',
    borderWidth: 2,
  },
  radiusDistance: {
    color: "#B9B9B9",
    fontSize: 15,
    fontFamily:'PoppinsSemiBold',
  },
  radiusDistanceBlack: {
    color: "#000",
    fontSize: 15,
    fontFamily:'PoppinsSemiBold',
  },
  containerCheckBox: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 20
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderColor: "transparent",
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
    marginRight: 0,
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
    color: "#fff",
    marginTop: 120,
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: 'center',
  },
});