import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button, TextInput, HelperText } from 'react-native-paper';


import AsyncStorage from '@react-native-async-storage/async-storage';

const offset = (Platform.OS === 'android') ? -200 : 0

import Header from "../Header"

import GlobalStyles from '../GlobalStyles';

window.navigator.userAgent = 'react-native';



export default function Settings({ socket, email, password }) {
    const navigator = useNavigation()
    const route = useRoute()

    return (
        <PaperProvider>
            <SafeAreaView style={{ ...GlobalStyles.droidSafeArea, backgroundColor: "white" }}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.mainView}>

                        <StatusBar animated={true} showHideTransition='fade' barStyle='dark-content' backgroundColor="white" />

                        <Header currentPage={"ProfileUp"} />
                        
                        <View style={styles.content}>

                            <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS === "ios" ? "padding" : "height"}>

                                <Text>PROFILE</Text>
                                <Text>email: {email}</Text>
                                <Text>password: {password}</Text>

                                <Button
                                    onPress={() => {
                                        AsyncStorage.clear()
                                    }}
                                >Clean Storage</Button>

                            </KeyboardAvoidingView>

                        </View>

                        <Header currentPage={"ProfileDown"} />

                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView >
        </PaperProvider>

    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "#f3f3f3"
    },

    keyboardAvoiding: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    content: {
        flex: 13,
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
        flex: 11,
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

