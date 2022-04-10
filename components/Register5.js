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

import { useFonts } from 'expo-font'

import Header from "./Header"

import io from 'socket.io-client/dist/socket.io';
import GlobalStyles from './GlobalStyles';
import { DevSettings } from 'react-native';
window.navigator.userAgent = 'react-native';

export default function Register5({ socket }) {

    const navigator = useNavigation()
    const route = useRoute()

    const { name } = route.params
    const { surname } = route.params
    const { gender } = route.params
    const { birthdate } = route.params
    const { email } = route.params
    const { theCode } = route.params

    const [pass1, setPass1] = useState("")
    const [pass1IsTrue, setPass1Is] = useState(null)

    const [pass2, setPass2] = useState("")
    const [pass2IsTrue, setPass2Is] = useState(null)

    const [borderWidth1, setBorderWidth1] = useState(0)
    const [borderWidth2, setBorderWidth2] = useState(0)

    const [pass1Hidden, setPass1Hidden] = useState(true)
    const [pass2Hidden, setPass2Hidden] = useState(true)

    const saveData = async () => {
        try {
            await AsyncStorage.setItem("email", email)
            await AsyncStorage.setItem("password", pass2)
        } catch (err) {
            console.log(err);
        }
    }

    function passWordsAreTrue() {
        if (pass1 === pass2 && pass1IsTrue && pass2IsTrue) {
            return true
        }
        else {
            return false
        }
    }

    var reg = new RegExp('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,20})$')

    const Warning = () => {
        if (pass1 === pass2 && pass1 != "" && pass2 != "") {
            return (
                <View>
                    <Text style={{ color: "green" }}>Passwords matched.</Text>
                </View>
            )
        }

        else if (pass1 === "" && pass2 === "") {
            return (
                <View>

                </View>
            )
        }

        else {
            return (
                <View>
                    <Text>Passwords do not match.</Text>
                </View>
            )
        }
    }

    function checkPass1() {
        if (!reg.test(pass1)) {
            setPass1Is(false)
            setBorderWidth1(2)
        }
        else {
            setPass1Is(true)
            setBorderWidth1(0)
        }
    }


    function checkPass2() {
        if (!reg.test(pass2)) {
            setPass2Is(false)
            setBorderWidth2(2)
        }
        else {
            setPass2Is(true)
            setBorderWidth2(0)
        }
    }

    return (
        <PaperProvider>
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <LinearGradient colors={['#F3595B', '#EE589F']} style={styles.mainView}>

                        <Header currentPage={"Register5"} />

                        <View style={styles.content}>

                            <KeyboardAvoidingView keyboardVerticalOffset={offset} style={styles.keyboardAvoiding} behavior={Platform.OS === "ios" ? "padding" : "height"}>

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

                                    <View style={{ flex: 0.7, justifyContent: "space-evenly", alignItems: "center", width: "80%" }} >
                                        <Text style={{ fontFamily: "MilliardL", fontSize: 25 }} >Let's select a password.</Text>
                                        {/* <Image source={require("../assets/line.png")} style={{ width: "100%", height: 1 }}></Image> */}
                                        <Text style={{ width: "100%", fontFamily: "MilliardL", textAlign: "center" }}>Your password must contain at least 8 characters with at least one number.</Text>
                                    </View>


                                    <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>

                                        <View style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, alignItems: "center" }}>
                                            <View style={{ width: "80%", display: "flex", justifyContent: "center", flexDirection: "row", backgroundColor: "transparent", alignItems: "center" }}>
                                                <TextInput
                                                    autoCapitalize='none'
                                                    theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                                                    fontFamily={"MilliardL"}
                                                    textAlign='center'
                                                    keyboardType='default'
                                                    label="Password"
                                                    value={pass1}
                                                    secureTextEntry={pass1Hidden}
                                                    style={{ fontSize: 20, backgroundColor: "transparent", textAlign: "center", width: "100%", borderLeftColor: "red", borderBottomColor: "red", borderBottomWidth: borderWidth1, borderLeftWidth: borderWidth1, flex: 1 }}
                                                    onChangeText={(value) => {
                                                        setPass1(value)
                                                        checkPass1()
                                                    }}
                                                />

                                                <TouchableOpacity
                                                    style={{ width: "10%" }}
                                                    onPressIn={() => {
                                                        setPass1Hidden(false)
                                                    }}
                                                    onPressOut={() => {
                                                        setPass1Hidden(true)
                                                    }}
                                                >
                                                    <Button icon={{ source: "eye", direction: 'rtl', }} />
                                                </TouchableOpacity>
                                            </View>


                                            <View style={{ width: "80%", display: "flex", justifyContent: "center", flexDirection: "row", backgroundColor: "transparent", alignItems: "center" }}>
                                                <TextInput
                                                    autoCapitalize='none'
                                                    theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                                                    fontFamily={"MilliardL"}
                                                    textAlign='center'
                                                    keyboardType='default'
                                                    label="Repeat Password"
                                                    value={pass2}
                                                    secureTextEntry={pass2Hidden}
                                                    style={{ fontSize: 20, flex: 1, backgroundColor: "transparent", textAlign: "center", width: "100%", borderLeftColor: "red", borderBottomColor: "red", borderBottomWidth: borderWidth2, borderLeftWidth: borderWidth2 }}
                                                    onChangeText={(value) => {
                                                        setPass2(value)
                                                        checkPass2()
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

                                            <Warning />

                                        </View>

                                    </View>

                                    <TouchableOpacity

                                        style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 0.7 }}
                                        onPress={() => {
                                            if (passWordsAreTrue()) {
                                                //CORRECT ALGHORITM
                                                console.log("CORRECT");
                                                socket.emit("new user request", { name: name, surname: surname, gender: gender, birthdate: birthdate, email: email, password: pass1, verificationCode: theCode })
                                                socket.on("this email has already choosen", () => {
                                                    console.log("this email has already choosen");
                                                    // EMAIL ALREADY CHOOSEN ALGHORITM
                                                })
                                                socket.on("register approved", () => {
                                                    saveData()
                                                    console.log("register approved");
                                                    console.log("navigate to main screen...");
                                                    navigator.navigate("MainNavigator")
                                                })
                                            }
                                            else {

                                            }

                                        }}>

                                        <Button mode='contained'>Register</Button>

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

