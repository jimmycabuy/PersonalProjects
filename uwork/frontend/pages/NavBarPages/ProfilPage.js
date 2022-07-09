import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Slider, CheckBox } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

export function ProfilPage(props) {
  const isFocused = useIsFocused();

  const [userID, setUserID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [urlProfilePic, setUrlProfilePic] = useState();
  const [image, setImage] = useState(null);
  const [listEducation, setListEducation] = useState([]);
  const [listLanguage, setListLanguage] = useState([]);
  const [jobCity, setJobCity] = useState('');
  const [jobContract, setJobContract] = useState('');
  const [jobDistance, setjobDistance] = useState(0)
  const [jobRegime, setJobRegime] = useState('');
  const [jobSector, setJobSector] = useState('');

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const [displayMenu, setDisplayMenu] = useState(false);

  useEffect(() => {  
    ( () => {
       AsyncStorage.getItem("id", function(error, data) {
         if(isFocused){
        const getProfile = async () => {
          let sendID = {id: data}
          let rawResponse = await fetch('http://192.168.0.114:3000/users/displayProfile', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sendID)
          })
          let response = await rawResponse.json()
          setUrlProfilePic(response.avatar)
          setFirstName(response.firstName);
          setLastName(response.lastName);
          setEmail(response.email)
          setAge(response.age.toString());
          setCity(response.city);
          setBio(response.bio);
          setPassword(response.password);
          setListEducation(response.education);
          setListLanguage(response.language);
          setJobCity(response.jobType[0].city);
          setJobContract(response.jobType[0].contract);
          setjobDistance(response.jobType[0].distance)
          setJobRegime(response.jobType[0].regime);
          setJobSector(response.jobType[0].sector);

          if(response.jobType[0].regime === "Office only"){
            setCheck3(true);
          } else if(response.jobType[0].regime === "Remote"){
            setCheck1(true);
          } else if (response.jobType[0].regime === "Hybride"){
            setCheck2(true)
          }
        }
        getProfile()
        setUserID(data);
      }
      });
    })();
  }, [isFocused]);

  const educationEdit = async (positionEducation, educationId) => {
    props.sendPositionEducation(positionEducation);
    props.sendEducationID(educationId)
    props.navigation.navigate('ModifyEducationPage');
  }

  const languageEdit = async (positionLanguage, languageId) => {
    props.sendPositionLanguage(positionLanguage);
    props.sendLanguageId(languageId)
    props.navigation.navigate('ModifyLanguagePage');
  }


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

  const onScrollMenuClick = () => {
    if(displayMenu === false){
      setDisplayMenu(true);
    } else {
      setDisplayMenu(false);
    }
  }

  const modifyProfile = async () => {
    let sendNewProfile = {
      id: userID,
      firstName: firstName,
      lastName: lastName,
      avatar: urlProfilePic,
      age: age,
      city: city,
      bio: bio,
      email: email,
      password: password,
      jobType: {
        contract: jobContract,
        city: jobCity,
        distance: jobDistance,
        regime: jobRegime,
        sector: jobSector,
      }
    }
    let rawResponse = await fetch('http://192.168.0.114:3000/users/modifyProfile', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sendNewProfile)
    })
    // let response = await rawResponse.json()
    props.navigation.navigate('HomePage')

  }

  const logOutClick = () => {
    AsyncStorage.clear()
    props.navigation.navigate('WelcomePage')
    console.log("Je suis deconnecté");
  }

  return (
      <KeyboardAwareScrollView style={{backgroundColor:"#fff"}}>
        <View style={styles.inner}>
          <View style={{flexDirection: 'row', justifyContent:'space-between', paddingRight:35, paddingLeft:45, width:"100%", alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#7791DE', borderRadius:10, marginRight:5, height:30}} onPress={() => logOutClick()}>
              <Text style={styles.logOutText}>LOG OUT</Text>
            </TouchableOpacity>
            <Pressable onPress={() => modifyProfile()}>
              <Ionicons
                name={'chevron-forward-outline'}
                size={45} color={'#7791DE'}
              />
            </Pressable>
          </View>
          <TouchableOpacity onPress={pickImage}>
            <Image
                source={{uri: urlProfilePic}}
                style={{width: 152, height: 152, borderRadius:150, marginBottom:15}}
              />
          </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={(value) => setFirstName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(value) => setLastName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={(value) => setAge(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={(value) => setCity(value)}
        />
        <TextInput
          style={styles.input2}
          placeholder="Bio"
          value={bio}
          multiline={true}
          onChangeText={(value) => setBio(value)}
        />

  {/* Start Card Education */}
        <View style={{marginBottom:20}}>
          
          <View style={(listEducation.length == 0) ? styles.card4 : styles.card}>
            <Text style={{fontSize: 20, color:'#000', fontWeight:'600', fontFamily: 'PoppinsSemiBold'}}>
              Education
            </Text>
            <TouchableOpacity style={{marginRight:8}} onPress={() => props.navigation.navigate('AddEducationFromProfilePage')}>
              <IonIcon name="add-outline" size={30} color="#7791DE"/>
            </TouchableOpacity>
          </View>
        
          <View style={(listEducation.length == 0) ? {display:'none'} : styles.card2}>
            <ScrollView>
              {listEducation.map((education, i) => (
                <View key={i} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingRight:10}}>
                  <Text style={styles.input3}>{education.school}</Text>
                  <TouchableOpacity style={{backgroundColor:'#7791DE', borderRadius:10, marginRight:5}} onPress={() => educationEdit(i, education._id)}>
                    <Text style={styles.editText}>EDIT</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
  {/* End Card Education */}

  {/* Start Card Language */}
  <View style={{marginBottom:20}}>
        
        <View style={(listLanguage.length == 0) ? styles.card4 : styles.card}>
          <Text style={{fontSize: 20, color:'#000', fontWeight:'600', fontFamily: 'PoppinsSemiBold'}}>
            Language
          </Text>
          <TouchableOpacity style={{marginRight:8}} onPress={() => props.navigation.navigate('AddLanguageFromProfilePage')}>
            <IonIcon name="add-outline" size={30} color="#7791DE"/>
          </TouchableOpacity>
        </View>
      
        <View style={(listLanguage.length == 0) ? {display:'none'} : styles.card2}>
          <ScrollView>
            {listLanguage.map((language, i) => (
              <View key={i} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingRight:10}}>
                <Text style={styles.input3}>{language.name}</Text>
                <TouchableOpacity style={{backgroundColor:'#7791DE', borderRadius:10, marginRight:5}} onPress={() => languageEdit(i, language._id)}>
                  <Text style={styles.editText}>EDIT</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
  </View>
  {/* End Card Language */}

      <View style={{marginBottom:20}}>
          <View style={styles.card}>
            <Text style={{fontSize: 20, color:'#000', fontWeight:'600', fontFamily: 'PoppinsSemiBold'}}>
              Job Type
            </Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
          </View>
        </View>
        <View style={styles.card3}>
          <ScrollView>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={styles.subBitleJobType}>Contract: </Text>
              <View style={{width:100}}>
                <View style={(displayMenu === false)? styles.scrollMenu : styles.scrollMenuScrolling}>
                  <Text style={(jobContract.length === 0)? styles.textScrollMenu: styles.textScrollMenuBlack}>{(jobContract.length === 0)? "Type": jobContract}</Text>
                  <Ionicons
                    name={'chevron-down-outline'}
                    size={20} color={'#B9B9B9'}
                    style={styles.dropDown}
                    onPress={() => onScrollMenuClick()}
                  />
                </View>
                <View style={(displayMenu === true) ? styles.dropDownList: {display: "none"}}>
                  <Text style={styles.textScroolMenu} onPress={() => {setJobContract("Full Time"), setDisplayMenu(false)}}>Full time</Text>
                  <Text style={styles.textScroolMenu} onPress={() => {setJobContract("Part Time"), setDisplayMenu(false)}}>Part time</Text>
                  <Text style={styles.textScroolMenu} onPress={() => {setJobContract("Freelance"), setDisplayMenu(false)}}>Freelance</Text>
                  <Text style={styles.textScroolMenu}  onPress={() => {setJobContract("Student"), setDisplayMenu(false)}}>Student</Text>
                  <Text style={styles.textScroolMenu} onPress={() => {setJobContract("Intership"), setDisplayMenu(false)}}>Intership</Text>
                </View>
              </View>
            </View>

            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={styles.subBitleJobType}>Sector: </Text>
              <TextInput
              style={styles.input3}
              placeholder="Job Sector"
              value={jobSector}
              onChangeText={(value) => setJobSector(value)}
            />
            </View>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={styles.subBitleJobType}>City: </Text>
              <TextInput
              style={styles.input3}
              placeholder="Job City"
              value={jobCity}
              onChangeText={(value) => setJobCity(value)}
              />
            </View>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={styles.subBitleJobType}>Distance: </Text>
              <Text style={(jobDistance === 0)? styles.radiusDistance: styles.radiusDistanceBlack}>{jobDistance} km</Text>
            </View>
            <Slider
              style={{width: "95%", marginTop:-5, marginBottom:-5}}
              minimumTrackTintColor="#b9b9b9"
              maximumTrackTintColor="#b9b9b9"
              thumbStyle={styles.thumb}
              onValueChange={(value) => setjobDistance(value)}
              value={jobDistance}
              animateTransitions={true}
              minimumValue= {0}
              maximumValue= {100}
              step={5}
            />
      
            <Text style={styles.subBitleJobType}>Regime: </Text>
            <View style={styles.containerCheckBox}>
            <CheckBox
              center
              textStyle={{color: "#B9B9B9", marginLeft:0, fontFamily: 'PoppinsSemiBold'}}
              containerStyle={styles.checkBox}
              checkedTitle={
                <Text style={{color: "#000", fontFamily: 'PoppinsSemiBold'}}>Remote</Text>
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
              onPress={() => {setCheck1(!check1), setCheck2(false), setCheck3(false), setJobRegime("Remote")}}
              checked={check1}
            />
            <CheckBox
              center
              textStyle={{color: "#B9B9B9", marginLeft:0, fontFamily: 'PoppinsSemiBold'}}
              containerStyle={styles.checkBox}
              checkedTitle={
                <Text style={{color: "#000", fontFamily: 'PoppinsSemiBold'}}>Office only</Text>
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
              onPress={() => {setCheck3(!check3), setCheck1(false), setCheck2(false), setJobRegime("Office only")}}
              checked={check3}
            />
            <CheckBox
              center
              textStyle={{color: "#B9B9B9", marginLeft:0, fontFamily: 'PoppinsSemiBold'}}
              containerStyle={styles.checkBox}
              checkedTitle={
                <Text style={{color: "#000", fontFamily: 'PoppinsSemiBold'}}>Hybride</Text>
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
              onPress={() => {setCheck2(!check2), setCheck1(false), setCheck3(false), setJobRegime("Hybride")}}
              checked={check2}
            />
      </View>
          </ScrollView>
        </View>
        </View>

          <TouchableOpacity style={styles.button1} onPress={() => modifyProfile() }>
            <Text style={{color:"#fff", fontSize:20, fontWeight:'500', fontFamily: 'PoppinsSemiBold'}}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
  )
}

function mapDispatchToProps(dispatch){
  return {
    sendPositionEducation: function(position){
      dispatch ({type: "addPositionEducation", positionEducation: position})
    },
    sendEducationID: function(id){
      dispatch ({type: "addEducationId", educationId: id})
    },
    sendPositionLanguage: function(position){
      dispatch ({type: "addPositionLanguage", positionLanguage: position})
    },
    sendLanguageId: function(id){
      dispatch ({type: "addLanguageId", languageId: id})
    }
  }
}

export default connect(null, mapDispatchToProps)
(ProfilPage);


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
    marginBottom:60,
    height:50,
    width: 200,
    justifyContent:"center",
    alignItems:'center',
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
    fontSize: 17,
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
    fontSize: 17,
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
  input3:{
    fontSize: 17,
    fontWeight:'500',
    fontFamily: 'PoppinsSemiBold',
    paddingTop:10,
    paddingBottom:10,
  },
  inner: {
    alignItems:'center',
    backgroundColor:'#fff',
    marginTop: 78,
  },
  logOutText: {
    fontSize: 11,
    fontFamily: 'PoppinsSemiBold',
    color:'#fff', 
    padding:8,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    fontWeight: "500",
    fontFamily: 'Poppins',
    borderTopEndRadius:15,
    borderTopStartRadius:15,
    width: 340,
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
    fontWeight: "500",
    fontFamily: 'Poppins',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    height: 150,
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
    justifyContent: 'center',
    paddingLeft: 10,
    fontWeight: "500",
    fontFamily: 'Poppins',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    height: 300,
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
  card4: {
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    fontWeight: "500",
    fontFamily: 'Poppins',
    borderRadius:15,
    width: 340,
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
  containerCheckBox: {
    flexDirection: "row",
    justifyContent:'center',
    margin: 0,
    padding:0
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderColor: "transparent",
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
    marginRight: 0,
    margin:-10,
  },
  subBitleJobType:{
    fontSize: 18,
    fontWeight:'600',
    fontFamily: 'PoppinsSemiBold',
    paddingTop:10,
    paddingBottom:10,
    color:'#7791DE'
  },
  radiusDistance: {
    color: "#B9B9B9",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: 'PoppinsSemiBold',
    paddingTop:10,
    paddingBottom:10,
  },
  radiusDistanceBlack: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: 'PoppinsSemiBold',
    paddingTop:10,
    paddingBottom:10,
  },
  distanceText: {
    marginTop: 20,
    color: "#B9B9B9",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: 'PoppinsSemiBold',
  },
  distanceTextBlack: {
    marginTop: 20,
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: 'PoppinsSemiBold'
  },
  thumb: {
    width: 25,
    height: 25,
    borderRadius: 30 / 2,
    backgroundColor: '#fff',
    borderColor: '#B9B9B9',
    borderWidth: 2,
  },
  scrollMenu: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'Poppins',
    borderRadius: 30,
    width: 200,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign:'left',
    paddingRight:90,
  },
  scrollMenuScrolling: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'Poppins',
    width: 200,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign:'left',
    paddingRight:90,
  },
  textScrollMenu: {
    color: "#B9B9B9",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'Poppins',
    paddingTop:3,
  },
  textScrollMenuBlack: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'PoppinsSemiBold',
    paddingTop:3,
  },
  dropDownList: {
    backgroundColor: "#FFF",
  },
  textScroolMenu: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'PoppinsSemiBold',
    color: "#A9A9A9",
    marginTop: 5,
    marginBottom: 5,
    textAlign:'left'
  },
  editText: {
    fontSize: 10, 
    color:'#fff',
    padding:8,
    fontWeight: 'bold',
    fontFamily: 'PoppinsSemiBold'
  },
});