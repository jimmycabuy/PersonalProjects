import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

export function ConversationPage(props) {
    let [userId, setUserId] = useState("");
    let [searchInput, setSearchInput] = useState("");
    let [indexSearchConversation, setIndexSearchConversation] = useState(null);
    let [conversationList, setConversationList] = useState([]);
    let [conversationSearchList, setConversationSearchList] = useState([]);
    let [lastMessage, setLastMessage] = useState([]);
    let [userisSet, setUserIsSet] = useState(false);
    
    let [hour, setHour] = useState([]);
    let [otherAvatar, setOtherAvatar] = useState([]);
    let [otherUserName, setOtherUserName] = useState([]);

    let [dayWeek, setDayWeek] = useState("");
    let [date, setDate] = useState();

    const isFocused = useIsFocused();

    useEffect(() => {  
        ( () => {
          AsyncStorage.getItem("id", function(error, data) {
            setUserId(data);
            setUserIsSet(true);
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

    if(userisSet){
        const dataConversation = async() => {
            let listhour = [];
            let userNameList = [];
            let otherAvatarList = [];
            let lastMessageList = [];

            let sendUser = {
                id: userId
            }
            let rawResponse = await fetch('http://192.168.0.114:3000/chat/foundConversation', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sendUser)
            })
        
            let response = await rawResponse.json()
            setConversationList(response.sort(function(a, b) {
                let newDateA = new Date(a.messages[a.messages.length -1].date);
                let newDateB = new Date(b.messages[b.messages.length -1].date);
                return newDateB - newDateA
            }))

            if(conversationList.length >=0){
                for(let i=0; i<response.length; i++){
                    let lastItem = response[i].messages[response[i].messages.length -1];
                    let newDate = new Date(lastItem.date);
                    let nowDate = new Date();
                    if(newDate.getDate() === nowDate.getDate()){
                        let hours = newDate.getHours();
                        let minutes;
                        if(newDate.getMinutes() > 9){
                            minutes = newDate.getMinutes();
                        }else {
                            minutes = "0" + newDate.getMinutes()
                        }
                        let fullHour = `${hours}:${minutes}`;
                        listhour.push(fullHour);
                    }else {
                        if(newDate.getDay() === 0) listhour.push('Sunday')
                        else if(newDate.getDay() === 1) listhour.push('Monday')
                        else if(newDate.getDay() === 2) listhour.push('Tuesday')
                        else if(newDate.getDay() === 3) listhour.push('Wednesday')
                        else if(newDate.getDay() === 4) listhour.push('Thursday')
                        else if(newDate.getDay() === 5) listhour.push('Friday')
                        else if(newDate.getDay() === 6) listhour.push('Saturday')
                    }
                }
                setHour(listhour);

                for(let i=0; i<response.length; i++){
                    let sendUser = {
                        id: (userId === response[i].employeeOwner) ?response[i].compagnyOwner : response[i].employeeOwner
                    }
                    if(userId === response[i].compagnyOwner){
                        let rawResponseUserInfo = await fetch('http://192.168.0.114:3000/users/foundUserInfo', {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(sendUser)
                        })
                        let responseUserInfo = await rawResponseUserInfo.json()
                        // console.log(response);
                        userNameList.push(responseUserInfo.userName);
                        otherAvatarList.push(responseUserInfo.userAvatar);
                    }else {

                        let rawResponseUserInfo = await fetch('http://192.168.0.114:3000/users/foundCompagnyInfo', {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(sendUser)
                        })
                        let responseUserInfo = await rawResponseUserInfo.json()
                        userNameList.push(responseUserInfo.userName);
                        otherAvatarList.push(responseUserInfo.userAvatar);
                    }
                
                }
                setOtherAvatar(otherAvatarList);
                setOtherUserName(userNameList);

                for(let i=0; i<response.length; i++){
                    let lastItem = response[i].messages[response[i].messages.length -1]
                    if(lastItem.isDelete){
                        lastMessageList.push('Message Deleted')
                    } else if(lastItem.content.length > 37){
                        let newItem = lastItem.content.slice(0, 37) + "..."
                        lastMessageList.push(newItem)
                    }else {
                        lastMessageList.push(lastItem.content)
                    }
                }
                setLastMessage(lastMessageList)
            }
            
        }
        dataConversation();
        setUserIsSet(false);
    }

    const onConversationClick = async (conversationId) => {
        props.sendConversationId(conversationId);
        props.navigation.navigate('ChatPage');
    }

    setInterval(() => {
        if(searchInput.length  === 0){
            if(conversationSearchList.length === 1){
                setConversationSearchList(conversationSearchList.shift())
            }
        }
    }, 3000);

    const onSearchClick = async() => {
        let searchConversationIndex = otherUserName.indexOf(searchInput);
        console.log(searchConversationIndex);
        if(searchConversationIndex != -1){
            let searchConversationList = [];
            searchConversationList.push(conversationList[searchConversationIndex])
            setConversationSearchList(searchConversationList);
            setIndexSearchConversation(searchConversationIndex)
        }else {
            setSearchInput("");
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => props.navigation.navigate('HomePage')}>
                    <Image
                        source={require('../../assets/button/home-gray.png')}
                        style={styles.homeIcon}
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
                    source={require('../../assets/button/send-mauve.png')}
                    style={styles.navbarButtonChat}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}><Text style={styles.uTitle}>U</Text>r chat</Text>
            <View style={styles.fieldContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    onChangeText={(value) => setSearchInput(value)}
                    value={searchInput}
                    autoCapitalize = 'none'
                />
                <Ionicons
                    name={'search'}
                    size={20} color={'#B9B9B9'}
                    style={(searchInput.length > 0)? styles.searchButton: {display: 'none'}}
                    onPress={() => onSearchClick()}
                />
            </View>
            <View style={styles.containerConversation}>
                {(conversationSearchList.length === 1)?
                    conversationSearchList.map((conversation,i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => onConversationClick(conversation._id)}
                            style={{alignItems: "center"}}
                        >
                            <View style={(i === 0)? {display: "none"}: styles.hr}/>
                            <View style={(i === 0)? styles.conversationCardTop: styles.conversationCard}>
                                <View style={styles.leftConversationCard}>
                                    <Image
                                        source={{uri: otherAvatar[indexSearchConversation]}}
                                        style={styles.avatarConversation}
                                    />
                                    <View style={styles.contentDescriptionCard}>
                                        <Text style={styles.titleConversation}>{otherUserName[indexSearchConversation]}</Text>
                                        <Text style={styles.contentConversation}>{lastMessage[indexSearchConversation]}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={{color: "#B9B9B9", fontFamily: 'Poppins'}}>{hour[indexSearchConversation]}</Text>
                                    <Ionicons
                                        name={'chevron-forward-outline'}
                                        size={15} color={'#B9B9B9'}
                                        style={styles.returnButton}
                                        onPress={() => props.navigation.navigate('HomePage')}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )) : 
                    conversationList.map((conversation,i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => onConversationClick(conversation._id)}
                            style={{alignItems: "center"}}
                        >
                            <View style={(i === 0)? {display: "none"}: styles.hr}/>
                            <View style={(i === 0)? styles.conversationCardTop: styles.conversationCard}>
                                <View style={styles.leftConversationCard}>
                                    <Image
                                        source={{uri: otherAvatar[i]}}
                                        style={styles.avatarConversation}
                                    />
                                    <View style={styles.contentDescriptionCard}>
                                        <Text style={styles.titleConversation}>{otherUserName[i]}</Text>
                                        <Text style={styles.contentConversation}>{lastMessage[i]}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={{color: "#B9B9B9", fontFamily: 'Poppins'}}>{hour[i]}</Text>
                                    <Ionicons
                                        name={'chevron-forward-outline'}
                                        size={15} color={'#B9B9B9'}
                                        style={styles.returnButton}
                                        onPress={() => props.navigation.navigate('HomePage')}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}

function mapDispatchToProps(dispatch){
    return {
      sendConversationId: function(id){
        dispatch ({type: "addconversationId", conversationId: id})
      }
    }
}

export default connect(null, mapDispatchToProps)
(ConversationPage);

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
    homeIcon: {
      height: 40,
      width: 40,
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
        color: "#B9B9B9",
        fontFamily: 'PoppinsSemiBold',
        textAlign:'center',
        marginTop: 5,
      },
      date: {
        fontSize: 20,
        fontFamily: 'PoppinsBold',
        color: "#B9B9B9",
        textAlign:'center',
        marginTop:-5,
      },
    title: {
        fontSize: 30,
        fontWeight: "600",
        fontFamily: 'PoppinsSemiBold',
        marginTop: 20
    },
    uTitle: {
        color: "#7791DE",
        fontFamily: 'PoppinsSemiBold',
    },
    fieldContainer: {
        width: 375,
        height: 40,
        marginTop: 20,
        paddingLeft: 20,
        borderRadius: 10,
        backgroundColor: "#EDEEF0",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems:'center'
    },
    searchInput: {
        fontSize: 20,
        fontWeight: "500",
        fontFamily: 'PoppinsSemiBold',
        width: 320,
    },
    searchButton: {
        paddingRight: 20,
    },
    containerConversation: {
        flex: 1,
        width: 375,
        alignItems: 'center',
    },
    hr: {
        height: 1,
        width: 350,
        marginTop: 10,
        backgroundColor: "#C5C6CA",
        borderRadius: 5,
    },
    conversationCard: {
        flexDirection: "row",
        width: 375,
        justifyContent: "space-between",
        marginTop: 10,
    },
    conversationCardTop: {
        flexDirection: "row",
        width: 375,
        justifyContent: "space-between",
        marginTop: 20,
    },
    leftConversationCard: {
        flexDirection: "row",
        margin: 0,
    },
    avatarConversation: {
        height: 50,
        width: 50,
        borderRadius: 30,
        marginRight: 10,
        backgroundColor: "#B9B9B9"
    },
    titleConversation: {
        fontSize: 17,
        fontWeight: "500",
        fontFamily: 'PoppinsSemiBold',
    },
    contentConversation: {
        fontSize: 15,
        color: "#949598",
        fontFamily: 'Poppins',
    }
});