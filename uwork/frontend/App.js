import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
     'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
     'PoppinsSemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
     'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf')

  });
};

import conversationId from './reducers/conversation'
import positionEducation from './reducers/education'
import educationId from './reducers/educationId'
import positionLanguage from './reducers/languagePosition'
import languageId from './reducers/languageId'

const store = createStore(combineReducers({conversationId, positionEducation, educationId, positionLanguage, languageId}))

const Stack = createStackNavigator();

import WelcomePage from "./pages/WelcomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TokenVerifyPage from "./pages/TokenVerifyPage";
import CreateProfilPage from "./pages/CreateProfilPage";
import AddCVPage from "./pages/AddCVPage";
import AddEducationPage from "./pages/AddEducationPage";
import AddLanguagePage from "./pages/AddLanguagePage";
import AddTypeJobPage from "./pages/AddTypeJobPage";
import WellDonePage from "./pages/WellDonePage";
import HomePage from "./pages/HomePage";
import AddEducationFromProfilePage from "./pages/AddEducationFromProfilePage";
import AddLanguageFromProfilePage from "./pages/AddLanguageFromProfilePage";
import ModifyEducationPage from "./pages/ModifyEducationPage";
import ModifyLanguagePage from "./pages/ModifyLanguagePage";

import ProfilPage from "./pages/NavBarPages/ProfilPage";
import CalendarPage from "./pages/NavBarPages/CalendarPage";
import ConversationPage from './pages/NavBarPages/ConversationPage';
import ChatPage from "./pages/NavBarPages/ChatPage";

export default function App() {
  const [ fontsLoaded, setFontsLoaded ] = useState(false);
  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={console.warn}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, gestureEnabled: false, /*animationEnabled: false*/}}
        >
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          <Stack.Screen name="SignInPage" component={SignInPage} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
          <Stack.Screen name="TokenVerifyPage" component={TokenVerifyPage} />
          <Stack.Screen name="CreateProfilPage" component={CreateProfilPage} />
          <Stack.Screen name="AddCVPage" component={AddCVPage} />
          <Stack.Screen name="AddEducationPage" component={AddEducationPage} />
          <Stack.Screen name="AddLanguagePage" component={AddLanguagePage} />
          <Stack.Screen name="AddTypeJobPage" component={AddTypeJobPage} />
          <Stack.Screen name="WellDonePage" component={WellDonePage} />
          <Stack.Screen name="HomePage" options={{ animationEnabled: false }} component={HomePage} />
          <Stack.Screen name="ProfilPage" component={ProfilPage} />
          <Stack.Screen name="CalendarPage" options={{ animationEnabled: false }} component={CalendarPage} />
          <Stack.Screen name="ConversationPage" options={{ animationEnabled: false }} component={ConversationPage} />
          <Stack.Screen name="ChatPage" component={ChatPage} />
          <Stack.Screen name="AddEducationFromProfilePage" component={AddEducationFromProfilePage} />
          <Stack.Screen name="AddLanguageFromProfilePage" component={AddLanguageFromProfilePage} />
          <Stack.Screen name="ModifyEducationPage" component={ModifyEducationPage} />
          <Stack.Screen name="ModifyLanguagePage" component={ModifyLanguagePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}