import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { material } from 'react-native-typography'
import { NavigationContainer, ThemeProvider, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Button, TextInput, HelperText } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import AsyncStorage from '@react-native-async-storage/async-storage';

Date.prototype.isValid = function () {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  return this.getTime() === this.getTime();
};

const generateCode = () => {
  var val = Math.floor(1000 + Math.random() * 9000);
  return val
}



const offset = (Platform.OS === 'android') ? -200 : 0

import Header from "./Header"

import io from 'socket.io-client/dist/socket.io';
import GlobalStyles from './GlobalStyles';
import { DevSettings } from 'react-native';
window.navigator.userAgent = 'react-native';

export default function Login({ socket }) {

  const navigator = useNavigation()
  const route = useRoute()

  const [pass2, setPass2] = useState("")
  const [email, setEmail] = useState("")
  const [emailIsTrue, setEmailIs] = useState(null)
  var emailReg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
  var passReg = new RegExp('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,20})$')

  const [pass2Hidden, setPass2Hidden] = useState(true)
  const [loginWarning, setLoginWarning] = useState("none")



  const saveData = async () => {
    try {
      await AsyncStorage.setItem("email", email)
      await AsyncStorage.setItem("password", pass2)
    } catch (err) {
      console.log(err);
    }
  }

  const checkEmail = () => {  // check if email is in the format and correct, 3 scenarious, return false or true and giveWarning atst
    if (!emailReg.test(email)) {
      setEmailIs(false)
    }
    else {
      setEmailIs(true)
    }
  }

  const WarningText = () => {
    if (emailIsTrue === false) {
      return (
        <View >
          <Text>Please input a valid email.</Text>
        </View>
      )
    }
    else {
      return (
        <View><Text></Text></View>
      )
    }
  }

  return (
    <PaperProvider>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <LinearGradient colors={['#F3595B', '#EE589F']} style={styles.mainView}>

            <Header currentPage={"Register5"} />

            <View style={styles.content}>

              <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <Animatable.View animation="bounceIn" duration={3000} style={styles.bigLogo}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      resizeMode: "contain"
                    }}

                  />

                </Animatable.View>

                <View style={styles.form}>

                  <View style={{ flex: 0.8, justifyContent: "space-evenly", alignItems: "center", width: "80%" }} >
                    <Text style={{ fontFamily: "MilliardL", fontSize: 25 }} >Good to see you again.</Text>
                    <Text style={{ display: loginWarning, fontFamily: "MilliardM", fontSize: 17, color: "#790A00", textAlign: "center", }} >Your email or password is wrong, but I can't say which one :)</Text>
                    {/* <Image source={require("../assets/line.png")} style={{ width: "100%", height: 1 }}></Image>
                                       <Text style={{ width: "100%", fontFamily: "MilliardL", textAlign: "center" }}>Your password must contain at least 8 characters with at least one number.</Text> */}
                  </View>

                  <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>

                    <View style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, alignItems: "center" }}>
                      <View style={{ width: "80%", display: "flex", justifyContent: "center", flexDirection: "row", backgroundColor: "transparent", alignItems: "center" }}>
                        <TextInput
                          autoCapitalize='none'
                          theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                          fontFamily={"MilliardL"}
                          textAlign='center'
                          keyboardType='email-address'
                          label="Email"
                          style={{ fontSize: 20, backgroundColor: "transparent", textAlign: "center", width: "100%", borderLeftColor: "red", borderBottomColor: "red", flex: 1 }}
                          onChangeText={(value) => {
                            setEmail(value)
                            checkEmail()
                          }}
                          right={<TextInput.Icon name="email" style={{ marginLeft: 40 }} />}
                          theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}

                        />

                      </View>

                      <WarningText />

                      <View style={{ width: "80%", display: "flex", justifyContent: "center", flexDirection: "row", backgroundColor: "transparent", alignItems: "center" }}>
                        <TextInput
                          autoCapitalize='none'
                          theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                          fontFamily={"MilliardL"}
                          textAlign='center'
                          keyboardType='default'
                          label="Password"
                          value={pass2}
                          secureTextEntry={pass2Hidden}
                          style={{ fontSize: 20, flex: 1, backgroundColor: "transparent", textAlign: "center", width: "100%", borderLeftColor: "red", borderBottomColor: "red" }}
                          onChangeText={(value) => {
                            setPass2(value)
                          }}
                        />

                        <TouchableOpacity
                          style={{ width: "10%" }}
                          onPressIn={() => {
                            setPass2Hidden(false)
                          }
                          }
                          onPressOut={() => {
                            setPass2Hidden(true)
                          }}
                        >
                          <Button icon={{ source: "eye", direction: 'rtl', }} />
                        </TouchableOpacity>

                      </View>

                    </View>

                  </View>

                  <TouchableOpacity

                    style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 0.7 }}
                    onPress={() => {
                      if (emailIsTrue) {
                        //CORRECT ALGHORITM
                        console.log("Format is correct.");
                        socket.emit("login request", { email: email, password: pass2 })
                        socket.on("login approved", () => {
                          console.log("LOGIN APPROVED, NAVIGATE TO MAIN SCREEN");
                          saveData()
                          navigator.navigate("MainNavigator")
                        })
                        socket.on("login rejected", () => {
                          console.log("email or password is wrong");
                          setLoginWarning("flex")
                        })

                      }
                      else {
                        // PLEASE INPUT A CORRECT FORM OF EMAIL OR PASSWORD
                      }

                    }}>

                    <Button mode='contained'>Login</Button>

                  </TouchableOpacity>

                </View>

              </KeyboardAvoidingView>

            </View>

          </LinearGradient>
        </TouchableWithoutFeedback>
      </SafeAreaView >
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },

  keyboardAvoiding: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 11,
  },

  form: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    flex: 30,
  },

  bigLogo: {
    display: "flex",
    flex: 12,
    width: "100%",
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE2E5",
    width: "95%",
    borderRadius: 30,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 8
  },
  inputs: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "green",
    justifyContent: "center",

  },

});

