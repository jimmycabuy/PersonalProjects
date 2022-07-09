import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";

export default function HomePage(props) {
  const isFocused = useIsFocused();

  let [avatar, setAvatar] = useState();
  let [userId, setUserId] = useState("");
  let [isLocalSet, setIsLocalSet] = useState(false);
  let [pageLoaded, setPageLoaded] = useState(false);
  let [annonceList, setAnnonceList] = useState([]);
  let [oldAnnonceId, setOldAnnonceId] = useState([]);
  let [isInformation, setisInformation] = useState(false);

  let [dayWeek, setDayWeek] = useState("");
  let [date, setDate] = useState();

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
          setAvatar(response.avatar);
        }
        getProfile()
        setUserId(data)
        setIsLocalSet(true)
      }
      });
    })();

    let newDate = new Date();
    let day = newDate.getDay();
    let newDateNumber = newDate.getDate()

    if(day == 0){
      setDayWeek("SUN")
    } else if(day === 1){
      setDayWeek("MON")
    } else if(day === 2){
      setDayWeek("TUE")
    } else if(day === 3){
      setDayWeek("WED")
    } else if(day === 4){
      setDayWeek("THU")
    } else if(day === 5){
      setDayWeek("FRI")
    } else if(day === 6){
      setDayWeek("SAT")
    }

    setDate(newDateNumber)

    const dataList = async() => {
      let sendParameter = {
        distance: 50
      }
      let rawResponse = await fetch('http://192.168.0.114:3000/annonceJob', {

        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(sendParameter)
      })
    
      let response = await rawResponse.json()
      setAnnonceList(response)
    }
    dataList()

    const oldAnnoneData = async() => {
      let sendUserId = {
        userId: userId
      }

      let rawResponse = await fetch('http://192.168.0.114:3000/users/oldAnnonceList', {

        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(sendUserId)
      })
    
      let response = await rawResponse.json()
      setOldAnnonceId(response)
    }
    if(isLocalSet) oldAnnoneData()

    setPageLoaded(true)
  }, [isFocused]);

  const onProfilClick = () => {
    props.navigation.navigate('ProfilPage')
  }

  const refuseAnnonce = async () => {
    let sendOldCardId = {
      userId: userId,
      oldCardId: annonceList[0]._id
    }
    await fetch('http://192.168.0.114:3000/users/addOldAnonnceJob', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sendOldCardId)
    })
    
    setAnnonceList((card) => card.filter((_, index) => index !== 0));
    setisInformation(false);
  }
  
  const accepteAnnonce = async() => {
    let sendOldCardId = {
      userId: userId,
      oldCardId: annonceList[0]._id
    }
    await fetch('http://192.168.0.114:3000/users/addOldAnonnceJob', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sendOldCardId)
    })
    
    setAnnonceList((card) => card.filter((_, index) => index !== 0));
    setisInformation(false);
  }
  
  const oldAnnonce = () => {
    for(let i=0; i<annonceList.length; i++){
      for(let y=0; y<oldAnnonceId.length; y++){
        if(annonceList[i]._id === oldAnnonceId[y].id){
          setAnnonceList((card) => card.filter((_, index) => index !== i))
        }
      }
    }
  }

  const onInformationClick = () => {
    if(isInformation){
      setisInformation(false)
    }else {
      setisInformation(true);
    }
  }
  
  if(pageLoaded){
    oldAnnonce()
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => onProfilClick()}>
            <Image
              source={{uri: avatar}}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('CalendarPage')}>
            <View style={styles.calendarIcon}>
              <Text style={styles.dayWeek}>{dayWeek}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('ConversationPage')}>
            <Image
              source={require('../assets/button/send-gray.png')}
              style={styles.navbarButtonChat}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Would <Text style={styles.title1}>U</Text> like to do this job?</Text>
        {annonceList.map((annonce,i) => (
          (isInformation === false)?
          <ImageBackground
            key={i}
            source={{uri: annonce.image[0].urlAddress}}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 30,
              width: "100%",
              height: "100%"
            }}
            style={(i > 0)? {display: "none"}: styles.card}
          >
            <View style={styles.descriptionCard}>
              <Text style={styles.compagnyName}>{annonce.compagnyName}</Text>
              <Text style={styles.descriptionAnnonce}>- {annonce.jobName}</Text>
              <Text style={styles.descriptionAnnonce}>- {annonce.contract}</Text>
              <Text style={styles.descriptionAnnonce}>- {annonce.city}</Text>
              <Text style={styles.descriptionAnnonce}>- {annonce.regime}</Text>
            </View>
            <Ionicons
              name={'information-circle'}
              size={35} color={'#FFF'}
              style={styles.informationIcon}
              onPress={() => onInformationClick()}
            />
          </ImageBackground> :
          <View key={i} style={(i > 0)? {display: 'none'}: styles.card}>
            <ScrollView style={styles.descriptionCard}>
              <Text style={styles.compagnyNameInfo}>{annonce.compagnyName}</Text>
              <Text style={styles.descriptionTitleInfo}>Description:</Text>
              <Text style={styles.descriptionInfo}>{annonce.description}</Text>
              <Image
                source={{uri: annonce.image[0].urlAddress}}
                style={styles.imageAnnonce}
              />
              <Image
                source={{uri: annonce.image[1]?.urlAddress}}
                style={(annonce.image.length < 2)? {display: "none"}: styles.imageAnnonce}
              />
              <Image
                source={{uri: annonce.image[2]?.urlAddress}}
                style={(annonce.image.length < 3)? {display: "none"}: styles.imageAnnonce}
              />
            </ScrollView>
            <Ionicons
              name={'information-circle'}
              size={35} color={'#FFF'}
              style={styles.informationIcon}
              onPress={() => onInformationClick()}
            />
          </View>
        ))}
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => refuseAnnonce()}>
            <Image
              source={require("../assets/button/cross.png")}
              style={styles.choiceIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => accepteAnnonce()}>
            <Image
              source={require("../assets/button/validate.png")}
              style={styles.choiceIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Image
            source={{uri: avatar}}
            style={styles.avatar}
            onPress={() => props.navigation.navigate('HomePage')}
          />
          <Ionicons
            name={'calendar'}
            size={35} color={'#B9B9B9'}
            style={styles.returnButton}
            onPress={() => props.navigation.navigate('HomePage')}
          />
          <Ionicons
            name={'paper-plane'}
            size={35} color={'#B9B9B9'}
            style={styles.chatIcon}
            onPress={() => props.navigation.navigate('HomePage')}
          />
        </View>
        <Text style={styles.title}>Would U like to do this job?</Text>
        <View style={styles.cardLoading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
        <View style={styles.containerButton}>
          <Image
              source={require("../assets/button/cross.png")}
              style={styles.choiceIcon}
              onPress={() => refuseAnnonce()}
            />
            <Image
              source={require("../assets/button/validate.png")}
              style={styles.choiceIcon}
              onPress={() => accepteAnnonce()}
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBar: {
    marginTop: 75,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginLeft: 30,
  },
  navbarButton: {
    height: 40,
    width: 40,
  },
  navbarButtonChat: {
    height: 40,
    width: 40,
    marginRight: 30,
  },
  calendarIcon: {
    marginRight:10,
    height: 50,
    width: 50,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#B9B9B9",
    alignItems: "center",
    justifyContent: "center",
  },
  dayWeek: {
    fontSize: 12,
    fontWeight: "900",
    fontFamily: 'PoppinsSemiBold',
    color: "#B9B9B9",
    textAlign:'center',
    marginTop: 5,
  },
  date: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: 'PoppinsBold',
    color: "#B9B9B9",
    textAlign:'center',
    marginTop:-5,
  },
  chatIcon: {
    marginRight: 30,
  },
  title: {
    fontSize: 27,
    fontFamily: 'PoppinsSemiBold',
    color: "#000"
  },
  title1: {
    fontSize: 27,
    fontFamily: 'PoppinsSemiBold',
    color: "#7791DE"
  },
  cardLoading: {
    height: "60%",
    width: "95%",
    marginTop: 5,
    backgroundColor: "#707070",
    borderRadius: 30,
    justifyContent: 'center',
  },
  loadingText: {
    color: "#FFF",
    fontSize: 50,
    fontWeight: "700",
    fontFamily: 'PoppinsSemiBold',
    textAlign: 'center',
  },
  card: {
    height: "60%",
    width: "95%",
    marginTop: 5,
    backgroundColor: "#E0DFDF",
    borderRadius: 30,
    justifyContent: 'space-between',
  },
  descriptionCard: {
    marginHorizontal: 30,
    marginTop: 40,
  },
  compagnyName: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "600",
    fontFamily: 'PoppinsSemiBold',
  },
  compagnyNameInfo: {
    marginBottom: 50,
    color: "#575757",
    fontSize: 30,
    fontWeight: "600",
    fontFamily: 'PoppinsSemiBold',
    textAlign: 'center',
  },
  descriptionTitleInfo: {
    color: '#575757',
    fontSize: 19,
    fontWeight: "700",
    fontFamily: 'PoppinsSemiBold'
  },
  descriptionAnnonce: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: 'Poppins',
  },
  descriptionInfo: {
    color: "#575757",
    marginTop: 10,
    fontWeight: "500",
    fontFamily: 'Poppins',
    marginBottom: 30,
  },
  imageAnnonce: {
    marginVertical: 10,
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  informationIcon: {
    textAlign: "right",
    marginRight: 15,
    marginBottom: 15
  },
  containerButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: 'center',
    marginBottom: 10
  },
  choiceIcon: {
    marginBottom: 20,
    height: 85,
    width: 85,
    marginLeft: 30,
    marginRight: 30
  }
});