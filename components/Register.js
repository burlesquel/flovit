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



// import DatePicker from "./DatePicker"

// import DatePicker from "./DatePicker"

import { useFonts } from 'expo-font'

import Header from "./Header"

import io from 'socket.io-client/dist/socket.io';
import GlobalStyles from './GlobalStyles';
window.navigator.userAgent = 'react-native';

export default function Register({ socket }) {

  var reg = new RegExp("^([ \u00c0-\u01ffa-zA-Z'\-])+$")

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  const navigator = useNavigation()
  const route = useRoute()

  console.log("Register Page: ", socket.id);

  const [text, setText] = useState("")

  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)

  const [nameIsTrue, setNameIs] = useState(true)
  const [surnameIsTrue, setSurnameIs] = useState(true)

  const [showDropDown, setShowDropDown] = useState(false);

  const [gender, setGender] = useState("unselected");

  function checkIfNameIsTrue() {
    if (!reg.test(name)) {
      setNameIs(false)
    }
    else {
      setNameIs(true)
    }
  }

  function checkIfSurnameIsTrue() {
    if (!reg.test(surname)) {
      setSurnameIs(false)
    }
    else {
      setSurnameIs(true)
    }
  }

  const Warning = ({ check }) => {

    if (check === "name") {
      if (!nameIsTrue) {
        return (
          <View animation="bounceIn">
            <Text>Please input a valid name.</Text>
          </View>
        )
      }
      else {
        return (
          <View></View>
        )
      }
    }

    else if (check === "surname") {
      if (!surnameIsTrue) {
        return (
          <View animation="bounceIn">
            <Text>Please input a valid surname.</Text>
          </View>
        )
      }
      else {
        return (
          <View></View>
        )
      }
    }

  }

  const genderList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  return (
    <PaperProvider>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
          <LinearGradient colors={['#F3595B', '#EE589F']} style={styles.mainView}>

            <Header currentPage={"Register"} />


            <KeyboardAvoidingView style={styles.content} behavior={Platform.OS === "ios" ? "padding" : "height"}>

              <Animatable.View animation="bounceIn" style={styles.bigLogo}>
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

                <View style={{ flex: 4, display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>

                  <View style={styles.textInput}>

                    <TextInput
                      onSubmitEditing={() => { ref_input2.current.focus(); }}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      label="Name"
                      style={{ backgroundColor: "#E7E7E7", borderTopEndRadius: 0, borderTopStartRadius: 0 }}
                      onChangeText={
                        (newText) => {
                          setName(newText)
                          checkIfNameIsTrue()
                        }}
                      right={<TextInput.Icon name="account" />}
                      theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                    />

                    <Warning check="name" />

                  </View>

                  <View style={styles.textInput}>

                    <TextInput
                      ref={ref_input2}
                      label="Surname"
                      style={{ backgroundColor: "#E7E7E7", borderTopEndRadius: 0, borderTopStartRadius: 0 }}
                      onChangeText={
                        (newText) => {
                          setSurname(newText)
                          checkIfSurnameIsTrue()
                        }}
                      right={<TextInput.Icon name="account" />}
                      theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                    />

                    <Warning check="surname" />

                  </View>

                  <View style={styles.dropDownInput}>
                    <DropDown
                      label={"Gender"}
                      mode={"flat"}
                      visible={showDropDown}
                      showDropDown={() => {
                        Keyboard.dismiss()
                        setShowDropDown(true)}}
                      onDismiss={() => setShowDropDown(false)}
                      value={gender}
                      setValue={setGender}
                      list={genderList}
                      activeColor='purple'
                      dropDownItemTextStyle={{ fontFamily: "MilliardM" }}
                      dropDownItemSelectedStyle={{ backgroundColor: "#FFE2E6" }}
                      style={{ borderTopEndRadius: 0, borderTopStartRadius: 0, fontFamily: "MilliardL" }}

                    />
                  </View>

                </View>

                <TouchableOpacity
                  style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
                  onPress={() => { 
                    if(nameIsTrue && surnameIsTrue && gender!="unselected"){
                      navigator.navigate("Register2",{name:name, surname:surname, gender:gender})
                    }
                   }}>

                  <Button mode='contained'>Next</Button>

                </TouchableOpacity>

              </View>


              {/* <View style={styles.textInput}>
                <TextInput keyboardType='email-address' label="Email" style={{ backgroundColor: "#FFE2E5" }} right={<TextInput.Icon name="email" />} />
              </View> */}

            </KeyboardAvoidingView>

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

  content: {
    flex: 11,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:"turquoise"
  },

  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 30
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

  textInput: {
    width: "80%",
  },

  helperText: {
    position: "absolute"
  },
  dropDownInput: {
    width: "80%",
  },


});

