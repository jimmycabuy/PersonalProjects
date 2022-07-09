import React, { useEffect, useRef, useState } from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Pressable,
  Alert
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';


export function ChatPage(props) {
  let [userId, setUserId] = useState("");
  let [otherUserId, setOtherUserId] = useState("");

  let [messageInput, setMessageInput] = useState("");
  let [messageInputModal, setMessageInputModal] = useState("");
  let [otherAvatar, setOtherAvatar] = useState();
  let [otherUserName,  setOtherUserName] = useState("");
  let [seeHourSend, setSeeHourSend] = useState(false);
  let [message, setMessage] = useState([]);
  let [timeMessage, setTimeMessage] = useState([]);

  const isFocused = useIsFocused();
  const scrollViewRef = useRef();
  let [modalVisible, setModalVisible] = useState(false);
  let [urlNewPicture, setUrlNewPicture] = useState("");

  let [modalPicture, setModalPicture] = useState(false);
  let [urlPictureModal, setUrlPictureModal] = useState();
  let [sendPictureModal, setSendPictureModal] = useState(false);

  let [messageId, setMessagId] = useState("");

  let arrayConversation = [];
  let arrayDate = [];
  const loadConversation = async() => {
    let responseConversation = await fetch(`http://192.168.0.114:3000/chat/getChat/${props.conversationId}`)
    let response = await responseConversation.json()
    arrayConversation.push(response.messages);
    for(let i=0; i< response.messages.length; i++){
      let date = new Date(response.messages[i].date);
      let day = date.getDate();
      let month = date.getMonth() +1;
      let finalTimde = `send: ${day}/${month}`
      arrayDate.push(finalTimde)
    }
    if(userId === response.compagnyOwner){
      setOtherUserId(response.employeeOwner)
    }else {
      setOtherUserId(response.compagnyOwner)
    }
    setMessage(arrayConversation);
    setTimeMessage(arrayDate);
  }
  const loadInformationUser = async() => {
    let sendID = {id: otherUserId}
    let responseUserInfo = await fetch('http://192.168.0.114:3000/users/foundCompagnyInfo', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sendID)
    })
    let responseFromBack = await responseUserInfo.json();
    setOtherAvatar(responseFromBack.userAvatar);
    setOtherUserName(responseFromBack.userName);
  }

  useEffect(() => {  
    ( () => {
      AsyncStorage.getItem("id", function(error, data) {
        setUserId(data);
      });
    })();
    if(isFocused){
      loadInformationUser()
      loadConversation()
    }
  }, [isFocused]);

  const onMessageClick = () => {
    if(seeHourSend){
      setSeeHourSend(false)
    } else {
      setSeeHourSend(true)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
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
      setUrlNewPicture(response.resultCloudinary.url);
      setModalVisible(false);
      setSendPictureModal(true);
    }
  };

  const onPicturClick = (url) => {
    setModalPicture(true);
    setUrlPictureModal(url)
  }

  const onSendMessageClick = async() => {
    if(messageInput.length >0 || messageInputModal.length >0){
      if(urlNewPicture.length === 0){
        let sendInfo = {
          conversationId: props.conversationId,
          sender: userId,
          content: messageInput,
          document: urlNewPicture
        }
        let responseConversationSend = await fetch('http://192.168.0.114:3000/chat/sendMessage', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(sendInfo)
        })
        await responseConversationSend.json();
        setMessageInput("");
      }else {
        let sendInfo = {
          conversationId: props.conversationId,
          sender: userId,
          content: messageInputModal,
          document: urlNewPicture
        }
        let responseConversationSend = await fetch('http://192.168.0.114:3000/chat/sendMessage', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(sendInfo)
        })
        await responseConversationSend.json();
        setMessageInputModal("");
      }
      loadConversation();
      setSendPictureModal(false);
      setUrlNewPicture("");
    }else {
      
    }
  }

  const onMessageSuppClick = async () => {
    let sendInfo = {
      conversationId: props.conversationId,
      messageId: messageId,
    }
    let responseDeleteMessage = await fetch('http://192.168.0.114:3000/chat/deleteMessage', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(sendInfo)
    })
    await responseDeleteMessage.json();
    setMessagId("");
    loadConversation();
  }

  if(!otherAvatar){
    loadInformationUser();
  }

  if(message.length >= 0){
    return (
      <View style={styles.container}>
        <View style={styles.topPage}>
          <Pressable onPress={() => props.navigation.navigate('ConversationPage')}>
            <Ionicons
              name={'chevron-back'}
              size={40} color={'#7791DE'}
              style={{marginLeft: 10, marginBottom: 5}}
            />
          </Pressable>
          <View style={{alignItems: "center"}}>
            <Image
              source={{uri: otherAvatar}}
              style={styles.avatarConversation}
            />
            <Text style={{fontFamily: 'PoppinsSemiBold'}}>{otherUserName}</Text>
          </View>
          <View style={{width: 40, marginRight: 10}}></View>
        </View>
        <KeyboardAwareScrollView
          style={{flex: 1, width: "100%"}}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
        {/* <KeyboardAvoidingView behavior='padding'> */}
          {message[0]?.map((messages,i) => (
            <View key={i} style={(userId === messages.sender)?styles.containerMessageOwner: styles.containerMessage}>
              <TouchableOpacity onPress={() => onMessageClick()}>
                <View style={(userId === messages.sender)?styles.boxMessageOwner: styles.boxMessage}>
                  <LongPressGestureHandler
                    onHandlerStateChange={({ nativeEvent }) => {  
                      if(messages?.isDelete === false){
                        if( nativeEvent.state === State.ACTIVE ){    
                          Alert.alert(
                            "Are you sure you want to delete this message?",
                            messages.content,
                            [
                              {
                                text: 'Cancel'
                              },
                              {
                                text: "Delete",
                                style: "destructive",
                                onPress: () => onMessageSuppClick()
                              },
                            ]
                          );
                        }
                        setMessagId(messages._id)
                      }else {
                        
                      }
                    }}
                    minDurationMs={800}
                  >
                    <Text style={(userId === messages.sender)? (messages.isDelete)? styles.messageOwnerDelete: styles.messageOwner: (messages.isDelete)? styles.messageDelete:styles.message}>{(messages?.isDelete)? "Message deleted": messages.content}</Text>
                  </LongPressGestureHandler>
                  <TouchableOpacity onPress={() => onPicturClick(messages?.document)}>
                    <Image
                      source={{uri: messages?.document}}
                      style={(messages?.document)? (messages.isDelete)? {display: "none"}:styles.picturChat: {display: 'none'}}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={(seeHourSend)? (userId === messages.sender)?styles.sendingMessageOwner: styles.sendingMessage: {display: "none"}}>{timeMessage[i]}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </KeyboardAwareScrollView>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.containerField}>
            <View style={styles.leftContainerField}>
              <Ionicons
                name={'add-circle'}
                size={30} color={'#7791DE'}
                onPress={() => setModalVisible(true)}
              />
              <TextInput
                style={styles.textField}
                placeholder="Text Message"
                onChangeText={(value) => setMessageInput(value)}
                value={messageInput}
                multiline={true}
              />
            </View>
            <Ionicons
              name={'paper-plane-outline'}
              size={30} color={'#7791DE'}
              style={styles.sendIcon}
              onPress={() => onSendMessageClick()}
            />
          </View>
        </KeyboardAvoidingView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          >
          <View style={styles.modal}>
            <View style={styles.containerModal}>
              <Text style={{marginLeft: 35}}></Text>
              <TouchableOpacity
                style={{flexDirection: "row", alignItems: 'center'}}
                onPress={() => pickImage()}
                >
                <Ionicons
                  name={'attach'}
                  size={30} color={'#7791DE'}
                  onPress={() => setModalVisible(false)}
                  />
                <Text style={styles.textModal}>Join document</Text>
              </TouchableOpacity>
              <Ionicons
                name={'close'}
                size={20} color={'#000'}
                style={styles.closeIcon}
                onPress={() => setModalVisible(false)}
                />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPicture}
          >
          <Pressable style={styles.modalPicture} onPress={() => setModalPicture(false)}>
            <Image
              source={{uri: urlPictureModal}}
              style={styles.picturModal}
              />
          </Pressable>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={sendPictureModal}
          >
          <Pressable
            style={styles.modal}
            onPress={() => {setSendPictureModal(false), setMessageInputModal(""), setUrlNewPicture("")}}
            >
            <View style={styles.containerModalSendPicture}>
              <Image
                source={{uri: urlNewPicture}}
                style={styles.picturModalSend}
                />

              <View style={styles.containerFieldModal}>
                <TextInput
                  style={styles.textFieldModal}
                  placeholder="Text Message"
                  placeholderTextColor="#000"
                  onChangeText={(value) => setMessageInputModal(value)}
                  value={messageInputModal}
                  />
                <Ionicons
                  name={'paper-plane-outline'}
                  size={30} color={'#7791DE'}
                  style={styles.sendIcon}
                  onPress={() => onSendMessageClick()}
                  />
              </View>

            </View>
          </Pressable>
        </Modal>
        <View style={{marginBottom: 30}}/>
      </View>
    )
  }else {
    return (
      <View>
        <Text>nul!</Text>
      </View>
    )
  }
}

function mapStateToProps(state){
  return{
    conversationId: state.conversationId
  }
}
  
export default connect(mapStateToProps, null)
(ChatPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topPage: {
    height: 175,
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#C9C9C9",
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  avatarConversation: {
    height: 60,
    width: 60,
    borderRadius: 40,
    marginBottom: 5,
    backgroundColor: "#B9B9B9"
  },
  containerMessage: {
    alignItems: 'flex-start'
  },
  containerMessageOwner: {
    alignItems: 'flex-end',
  },
  boxMessage: {
    padding: 10,
    margin: 10,
    marginLeft: 20,
    backgroundColor: "#EDEEF0",
    borderRadius: 10,
    maxWidth: 300,
  },
  boxMessageOwner: {
    padding: 10,
    margin: 10,
    marginRight: 20,
    backgroundColor: "#7791DE",
    borderRadius: 10,
    maxWidth: 300,
  },
  message: {
    fontWeight: "400",
    fontFamily: 'Poppins',
  },
  messageDelete: {
    fontWeight: "400",
    color: "#AFB0B1",
    fontFamily: 'Poppins',
  },
  messageOwner: {
    fontWeight: "400",
    color: "#FFF",
    fontFamily: 'Poppins',
  },
  messageOwnerDelete: {
    fontWeight: "400",
    color: "#AFB0B1",
    fontFamily: 'Poppins',
  },
  picturChat: {
    marginTop: 10,
    height: 150,
    width: 250
  },
  sendingMessage: {
    marginLeft: 20,
    color: "#B9B9B9",
    textAlign: 'left',
  },
  sendingMessageOwner: {
    marginRight: 20,
    color: "#B9B9B9",
    textAlign: 'right'
  },
  containerField: {
    marginTop: 5,
    marginBottom: 10,
    width: 375,
    height: 40,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#707070",
    backgroundColor: "#FFF",
    alignItems: 'center',
    justifyContent: "space-between",
  },
  leftContainerField: {
    flexDirection: "row",
    marginLeft: 10,
  },
  textField: {
    width: 290,
    fontSize: 17,
    paddingLeft: 10,
    fontFamily: 'Poppins',
  },
  sendIcon: {
    marginRight: 10,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  containerModal: {
    height: 75,
    width: "80%",
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeIcon: {
    marginBottom: 40,
    marginRight: 10
  },
  textModal: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7791DE",
    fontFamily: 'Poppins',
  },
  modalPicture: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  picturModal: {
    height: 300,
    width: "90%",
  },
  containerModalSendPicture: {
    height: 360,
    width: 380,
    backgroundColor: "#FFF",
    alignItems: 'center',
    borderRadius: 20,
    marginBottom:140,
  },
  picturModalSend: {
    height: 250,
    width: 330,
    borderRadius: 10,
    marginTop: 20,
  },
  containerFieldModal: {
    marginTop: 30,
    marginBottom: 10,
    width: 330,
    height: 40,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#707070",
    backgroundColor: "#FFF",
    alignItems: 'center',
    justifyContent: "space-between",
  },
  textFieldModal: {
    width: 280,
    fontSize: 17,
    paddingLeft: 10,
    color: '#000',
    fontFamily: 'Poppins',
  },
});