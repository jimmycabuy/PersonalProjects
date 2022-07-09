import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import {Calendar} from 'react-native-calendars';

export default function CallendarPage(props) {
  const isFocused = useIsFocused();

  let [userId, setUserId] = useState("");
  let [dayWeek, setDayWeek] = useState("");
  let [date, setDate] = useState();
  let [eventList, setEventList] = useState([]);
  let [allDay, setAllDay] = useState([]);
  let [allStartHour, setAllStartHour] = useState([]);
  let [allEndHour, setAllEndHour] = useState([]);
  let [allCompanyName, setAllCompanyName] = useState([]);

  useEffect(() => {  
    ( () => {

      AsyncStorage.getItem("id", function(error, data) {
        if(isFocused){
        const getEvent = async () => {
          let sendID = {id: data}
          let rawResponse = await fetch('http://192.168.0.114:3000/calendarEvent', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sendID)
          })
          let response = await rawResponse.json()
          setEventList(response)

          let fullCompanyName = [];
          for(var i = 0; i < response.length; i++){
            let rawResponseCompanyInfo = await fetch('http://192.168.0.114:3000/users/foundCompagnyInfo', {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({id: response[i].companyOwner})
            })
            let responseCompany = await rawResponseCompanyInfo.json()
            fullCompanyName.push(responseCompany.userName)
          }
          setAllCompanyName(fullCompanyName);

          let arrayDay = [];
          let arrayStartHour = [];
          let arrayEndHour = [];

          for(var i = 0 ; i < response.length ; i ++){
            let newDate = new Date(response[i].date)
            let day = newDate.getDate()
            // let month = newDate.getMonth() + 1
            // let finalDateBadge = `${day}/${month}`
            
            let newStartHour = new Date(response[i].startTime)
            let startHour = newStartHour.getHours()
            let startMinute;
              if(newStartHour.getMinutes() > 9){
                startMinute = newStartHour.getMinutes();
              } else {
                startMinute = "0" + newStartHour.getMinutes()
              }
            let finalStartHour = `${startHour}:${startMinute}`

            let newEndHour = new Date(response[i].endTime)
            let endHour = newEndHour.getHours()
            let endMinute;
              if(newEndHour.getMinutes() > 9){
                endMinute = newEndHour.getMinutes();
              }else {
                endMinute = "0" + newEndHour.getMinutes()
              }
            let finalEndHour = `${endHour}:${endMinute}`

            arrayDay.push(day)
            arrayStartHour.push(finalStartHour)
            arrayEndHour.push(finalEndHour)

          }
          setAllDay(arrayDay);
          setAllStartHour(arrayStartHour);
          setAllEndHour(arrayEndHour);
        }
        getEvent()
        setUserId(data)
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
  }, [isFocused]);

  let markedDay = {};

  eventList.map((item) => {
        var dateOfToday = new Date(); 
        var datFromBDD = new Date(item.endTime)
        if(datFromBDD >= dateOfToday){
          markedDay[item.date.slice(0, -14)] = {
          selected: true,
          selectedColor: "#7791DE",
         };
        } else {
          markedDay[item.date.slice(0, -14)] = {
            selected: true,
            selectedColor: "#d3dcf4",
          };  
        }
        // var dateOfTodayString = JSON.stringify(dateOfToday)
        // markedDay[dateOfTodayString.slice(1, 11)] = { selected: true, selectedColor: "#7791DE"}
      });

  function renderEvents(eventList){
    eventList.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
      })

      const list = eventList.map((event, i) => {
        var aDate = new Date(); 
        var datFromBDD = new Date(event.endTime)
        
        if(datFromBDD > aDate){
          
          return (
            <View style={styles.containerEvent} key={i}>
              <View>
                <View style={styles.dateEventBadge}>
                  <Text style={styles.dateEvent}>{allDay[i]}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.titleEvent}>{event.type}</Text>
                <Text style={styles.subTitleEvent}>{allCompanyName[i]}</Text>
                <Text style={styles.subTitleEvent}>{allStartHour[i]} - {allEndHour[i]}</Text>
              </View>
            </View>
      )
      }
})
return list;
}


return (
  <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => props.navigation.navigate('HomePage')}>
          <Image
            source={require('../../assets/button/home-gray.png')}
            style={styles.navbarButtonHome}
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
            source={require('../../assets/button/send-gray.png')}
            style={styles.navbarButtonChat}
            />
        </TouchableOpacity>
      </View>
        <View style={styles.calendarContainer}>
        <Calendar
          firstDay={1}
          style={{
            marginTop: 20,
            height: 375,
            width: 400,
          }}
          enableSwipeMonths={true}
          markedDates={ markedDay } 
          theme={{
            arrowColor: '#7791DE',
            todayTextColor: '#7791DE',
            monthTextColor: '#000',
            textMonthFontWeight: 'bold',
            textDayFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
          }}
        />
        </View>

        <View style={styles.upcomingContainer}>
          <ScrollView>
            <Text style={{color:'#fff', fontSize:30, fontWeight:"600", textAlign:'center', marginBottom:30, fontFamily: 'PoppinsSemiBold'}}>Upcoming</Text>
            {renderEvents(eventList)}
          </ScrollView>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  upcomingContainer:{
    flex:1,
    width:'95%',
    alignItems:'center',
    backgroundColor:'#7791DE',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop:20,
    paddingBottom:20,
  },
  containerEvent:{
    flexDirection:'row',
    alignItems:'baseline',
    width:350,
    marginBottom:30,
  },
  dateEvent:{
    color: '#7791DE',
    fontSize:18,
    fontWeight:"600",
    fontFamily: 'PoppinsBold',
    paddingBottom:1,
    paddingTop:1,
  },
  dateEventBadge: {
    borderRadius:100, 
    backgroundColor:'#fff', 
    marginRight:10,
    padding:2,
    width:32,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
  },
  titleEvent:{
    color: '#fff',
    fontSize:25,
    fontWeight:"600",
    fontFamily: 'PoppinsSemiBold'
  },
  subTitleEvent:{
    color: '#fff',
    fontSize:15,
    fontFamily: 'Poppins',
    marginBottom:4,
  },
  navBar: {
    marginTop: 75,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  navbarButtonHome: {
    height: 40,
    width: 40,
    marginLeft: 30,
  },
  navbarButtonChat: {
    height: 40,
    width: 40,
    marginRight: 30,
  },
  calendarIcon: {
    height: 50,
    width: 50,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#7791DE",
    alignItems: "center",
    justifyContent: "center",
  },
  dayWeek: {
    fontSize: 12,
    fontWeight: "900",
    color: "#7791DE",
    fontFamily: 'PoppinsSemiBold',
    textAlign:'center',
    marginTop: 5,
  },
  date: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    color: "#7791DE",
    textAlign:'center',
    marginTop:-5,
  },
});