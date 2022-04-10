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

import Header from "./Header"

import GlobalStyles from './GlobalStyles';
window.navigator.userAgent = 'react-native';

export default function Register2({ socket }) {

    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const navigator = useNavigation()
    const route = useRoute()


    const { name } = route.params
    const { surname } = route.params
    const { gender } = route.params





    console.log("Register Page: ", socket.id);

    const [text, setText] = useState("")

    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")

    const [warningTextOpen, giveWarning] = useState(false)

    const birthdateIsTrue = () => {

        var date = new Date(String(month) + "/" + String(day) + "/" + String(year))
        var currentDate = new Date()

        var yearsOld = currentDate.getYear() - date.getYear()

        console.log(date.isValid());
        if (!date.isValid()) {
            giveWarning("invalid date")
            return false
        }
        else if (yearsOld < 18) {
            giveWarning("must be over 18")
            return false
        }
        else if (yearsOld > 100) {
            giveWarning("dinasour alert")
            return false
        }
        else {
            return true
        }
    }

    const WarningText = () => {
        if (warningTextOpen === "invalid date") {
            return (
                <Animatable.View animation="bounceIn">
                    <Text>Please input a valid date.</Text>
                </Animatable.View>
            )
        }
        else if (warningTextOpen === "must be over 18") {
            return (
                <Animatable.View animation="bounceIn">
                    <Text>You must be over 18 to use this app.</Text>
                </Animatable.View>
            )
        }
        else if (warningTextOpen === "dinasour alert") {
            return (
                <Animatable.View animation="bounceIn">
                    <Text>Are you a dinasour?</Text>
                </Animatable.View>
            )
        }
        else {
            return (
                <View><Text>  </Text></View>
            )
        }

    }

    return (
        <PaperProvider>
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <LinearGradient colors={['#F3595B', '#EE589F']} style={styles.mainView}>

                        <Header currentPage={"Register2"} />


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

                                <Text style={{ fontFamily: "MilliardL", fontSize: 25 }} >Your birthday is..</Text>

                                <View style={styles.inputContainer}>

                                    <View style={styles.inputs}>

                                        <TextInput
                                            maxLength={2}
                                            theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                                            fontFamily={"MilliardL"}
                                            textAlign='center'
                                            keyboardType='number-pad'
                                            label="Day"
                                            value={day}
                                            style={{ fontSize: 20, backgroundColor: "transparent", borderTopEndRadius: 0, borderTopStartRadius: 0, flex: 1, textAlign: "center" }}
                                            onChangeText={(value) => {
                                                giveWarning(false)
                                                setDay(value)
                                                if (value.length === 2) {
                                                    ref_input2.current.focus()
                                                    setDay(value)
                                                }
                                            }}
                                            onFocus={() => {
                                                setDay("")
                                            }}
                                        />

                                        <TextInput
                                            ref={ref_input2}
                                            theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                                            maxLength={2}
                                            textAlign='center'
                                            keyboardType='number-pad'
                                            label="Month"
                                            value={month}
                                            style={{ fontSize: 20, backgroundColor: "transparent", borderTopEndRadius: 0, borderTopStartRadius: 0, borderLeftWidth: 0.5, borderLeftColor: "black", flex: 1, textAlign: "center" }}
                                            onChangeText={(value) => {
                                                giveWarning(false)
                                                setMonth(value)
                                                if (value.length === 2) {
                                                    ref_input3.current.focus()
                                                    setMonth(value)
                                                }
                                            }}
                                            onFocus={() => {
                                                setMonth("")
                                            }}
                                        />

                                        <TextInput
                                            ref={ref_input3}
                                            theme={{ fonts: { regular: { fontFamily: 'MilliardM' } } }}
                                            maxLength={4}
                                            textAlign='center'
                                            keyboardType='number-pad'
                                            label="Year"
                                            value={year}
                                            style={{ fontSize: 20, backgroundColor: "transparent", borderTopEndRadius: 0, borderTopStartRadius: 0, borderLeftWidth: 0.5, borderLeftColor: "black", flex: 1, textAlign: "center" }}
                                            onChangeText={(value) => {
                                                giveWarning(false)
                                                setYear(value)
                                                if (value.length === 4) {
                                                    Keyboard.dismiss()
                                                    ref_input3.current.blur()
                                                    setYear(value)
                                                }
                                            }}
                                            onFocus={() => {
                                                setYear("")
                                            }}
                                        />

                                    </View>

                                    <WarningText />

                                </View>

                                <TouchableOpacity

                                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                    onPress={() => {
                                        if (birthdateIsTrue()) {
                                            navigator.navigate("Register3", { name: name, surname: surname, gender: gender, birthdate: String(month) + "/" + String(day) + "/" + String(year) })
                                        }
                                        else {
                                            setDay("")
                                            setMonth("")
                                            setYear("")
                                        }
                                    }}>

                                    <Button mode='contained'>Next</Button>

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

