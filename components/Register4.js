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

const offset = (Platform.OS === 'android') ? -200 : 0

import { useFonts } from 'expo-font'

import Header from "./Header"

import io from 'socket.io-client/dist/socket.io';
import GlobalStyles from './GlobalStyles';
window.navigator.userAgent = 'react-native';

export default function Register4({ socket }) {

    const navigator = useNavigation()
    const route = useRoute()

    const { name } = route.params
    const { surname } = route.params
    const { gender } = route.params
    const { birthdate } = route.params
    const { email } = route.params
    const { theCode } = route.params

    const [text, setText] = useState("")

    const [code, setCode] = useState("0000")

    const [codeIsTrue, setCodeIs] = useState(null)


    const WarningText = () => {
        if (codeIsTrue === false) {
            return (
                <View >
                    <Text>Looks like you are trying with a wrong code.</Text>
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

                        <View style={styles.content}>

                        <KeyboardAvoidingView keyboardVerticalOffset={offset} behavior="padding" style={styles.keyboardAvoiding} behavior={Platform.OS === "ios" ? "padding" : "height"}>

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


                                    <Text style={{ width: "80%", fontFamily: "MilliardL" }}>Please give us the code you have received on your email.</Text>
                                    <Text style={{ fontFamily: "MilliardL", fontSize: 25 }} >My verification code is:</Text>
                                    <View style={styles.inputContainer}>



                                        <View style={styles.inputs}>

                                            <TextInput
                                                autoCapitalize='none'
                                                theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                                                fontFamily={"MilliardL"}
                                                textAlign='center'
                                                keyboardType='number-pad'
                                                label="Code"
                                                maxLength={4}
                                                style={{ fontSize: 20, backgroundColor: "transparent", borderTopEndRadius: 0, borderTopStartRadius: 0, flex: 1, textAlign: "center" }}
                                                onChangeText={(value) => {
                                                    if (value.length === 4) {
                                                        setCode(value)
                                                        Keyboard.dismiss()
                                                    }

                                                }}
                                            />

                                        </View>

                                        <WarningText />

                                    </View>



                                    <TouchableOpacity

                                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                        onPress={() => {
                                            if (String(code) === String(theCode)) {
                                                //CORRECT ALGHORITM
                                                console.log("CORRECT");
                                                navigator.navigate("Register5", { name: name, surname: surname, gender: gender, birthdate: birthdate, email: email, theCode: theCode })
                                                // socket.emit("new approved user", {name:name, surname:surname, gender:gender, birthdate:birthdate, email:email, verificationCode:theCode})
                                            }
                                            else {
                                                setCodeIs(false)
                                            }

                                        }}>

                                        <Button mode='contained'>Validate!</Button>

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

    content: {
        flex: 11,
        // backgroundColor:"turquoise"
    },

    keyboardAvoiding:{
        flex:1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

