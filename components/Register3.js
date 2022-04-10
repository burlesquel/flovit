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

Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};

const generateCode = () => {
    var val = Math.floor(1000 + Math.random() * 9000);
    return val
}

import { useFonts } from 'expo-font'

import Header from "./Header"

import io from 'socket.io-client/dist/socket.io';
import GlobalStyles from './GlobalStyles';
window.navigator.userAgent = 'react-native';

export default function Register3({ socket }) {

    const navigator = useNavigation()
    const route = useRoute()

    const { name } = route.params
    const { surname } = route.params
    const { gender } = route.params
    const { birthdate } = route.params

    console.log("Register Page: ", socket.id);

    const [text, setText] = useState("")

    const [email, setEmail] = useState("")

    const [emailIsTrue, setEmailIs] = useState(null)

    var reg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

    const checkEmail = () => {  // check if email is in the format and correct, 3 scenarious, return false or true and giveWarning atst
        if (!reg.test(email)) {
            setEmailIs(false)
        }
        else {
            setEmailIs(true)
        }
    }

    const checkEmailAvailibility = () => {

    }

    const WarningText = () => {
        if (emailIsTrue === false) {
            return (
                <View >
                    <Text>Please input a valid email.</Text>
                </View>
            )
        }

        else if (emailIsTrue === "already in use") {
            return (
                <View >
                    <Text>Looks like this email has already been chosen.</Text>
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

                        <Header currentPage={"Register3"} />

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

                                <Text style={{ fontFamily: "MilliardL", fontSize: 25 }} >Let's not have trust issues!</Text>

                                <View style={styles.inputContainer}>

                                    <View style={styles.inputs}>

                                        <TextInput
                                            autoCapitalize='none'
                                            theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                                            fontFamily={"MilliardL"}
                                            textAlign='center'
                                            keyboardType='email-address'
                                            label="E-mail"
                                            style={{ fontSize: 20, backgroundColor: "transparent", borderTopEndRadius: 0, borderTopStartRadius: 0, flex: 1, textAlign: "center" }}
                                            onChangeText={(value) => {
                                                setEmail(value)
                                                checkEmail()
                                            }}
                                        />

                                    </View>

                                    <WarningText />

                                </View>

                                <Text style={{ width: "80%", fontFamily: "MilliardL" }}>We will send a 4-digit verification code to validate your email account when you press next.</Text>

                                <TouchableOpacity

                                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                    onPress={() => {
                                        if (emailIsTrue) {
                                            console.log(name, surname, gender, birthdate);
                                            const theCode = generateCode()
                                            socket.emit("email verification req", { email, theCode })
                                            navigator.navigate("Register4", { name: name, surname: surname, gender: gender, birthdate: birthdate, email: email, theCode: theCode })
                                        }

                                    }}>

                                    <Button mode='contained'>Send the code</Button>

                                </TouchableOpacity>

                            </View>

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
        flexDirection: "row",
        justifyContent: "center",

    },
    inputContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

});

