import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { material } from 'react-native-typography'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

import Header from "./Header"

import io from 'socket.io-client/dist/socket.io';
import GlobalStyles from './GlobalStyles';
window.navigator.userAgent = 'react-native';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
    },
};

export default function Entry({ socket }) {
    const navigator = useNavigation()
    const route = useRoute()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [userLoggedIn, setUserState] = useState(false)

    const getData = async () => {
        try{
            const email = await AsyncStorage.getItem("email")
            const password = await AsyncStorage.getItem("password")
            if(email !== null && password !== null){
                console.log(email, password);
                setEmail(email)
                setPassword(password)
                setUserState(true)
            }
            else{
                setUserState(false)
            }
        }
        catch(err){
            console.log(err);
        }
    }

    console.log("Entrance page: ", socket.id);

    getData()

    if(userLoggedIn){
        console.log("data got............");
        socket.emit("login request",{email:email, password:password})
        socket.on("login approved",()=>{
            navigator.navigate("MainPage")
        })
        socket.on("login rejected",()=>{
            console.log("Login rejected");
            setUserState(false)
        })
        return(
            <View></View>
        )
        // '#4FBDBA', '#AEFEFF'
    }
    else{
        return (
            <PaperProvider>
                <SafeAreaView style={GlobalStyles.droidSafeArea} >
    
                    <LinearGradient colors={['#D0FFFE', '#D0FFFE']} style={styles.mainView}>
    
                        <Header previousPage={"anan"} nextPage={"Register"} currentPage={"Entrance"} />
    
                        <View style={styles.content}>
    
                            <View style={styles.bigLogo}>
    
                                <Image
                                    source={require("../assets/logo.png")}
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: "contain"
                                    }}
    
                                />
    
                            </View>
    
                            <Animatable.View style={styles.text} animation="bounceIn" duration={5000}>
                                <View style={{ backgroundColor: "#dee5e8", borderRadius: 14, paddingHorizontal: 12, paddingVertical: 3 }}>
                                    <Text style={{ fontFamily: "MilliardEL", fontSize: 50, color: "gray" }}>Find your soulmate!</Text>
                                </View>
                            </Animatable.View>
    
                            <Animatable.View style={styles.text} animation="bounceIn" duration={5000}>
                                <View style={{ borderRadius: 10, padding: 5 }}>
                                    <Text style={{ fontFamily: "MilliardEL", fontSize: 22, color: "black" }}>Start your dating journey with exploring the secrets of lorem ipsum Lorem ipsum dolor sit amet. </Text>
                                </View>
                            </Animatable.View>
    
                            <View style={styles.getStarted}>
    
                                <TouchableOpacity style={{ flex: 1, justifyContent: "space-around" }} onPress={() => { navigator.navigate("Register") }}>
                                    <Button mode='contained' icon={"arrow-right-bold"} style={{ width: "60%" }}>
                                        Get Started
                                    </Button>
                                </TouchableOpacity>
    
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Text style={{ fontFamily: "MilliardEL", fontSize: 15, color: "white" }}>Already a user?</Text>
    
                                    <TouchableOpacity style={{ flex: 1, justifyContent: "space-around", width: "100%" }} onPress={() => { navigator.navigate("Login") }}>
                                        <Button mode='contained' icon={"arrow-right-bold"} style={{ width: "60%", backgroundColor: "red" }}>
                                            Login
                                        </Button>
                                    </TouchableOpacity>
                                </View>
    
                            </View>
    
                        </View>
    
                    </LinearGradient>
    
                </SafeAreaView>
            </PaperProvider>
    
        );
    }

    
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        
    },
    content: {
        flex: 11,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
    bigLogo: {
        display: "flex",
        flex: 1,
        width: "100%",
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dee5e8",
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
    text: {
        flex: 1,
        display: "flex",
        // borderBottomColor: "black",
        // borderBottomWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",

    },
    getStarted: {
        display: "flex",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",

    },

});
