import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { material } from 'react-native-typography'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
window.navigator.userAgent = 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
// import Icon from 'react-native-ionicons'
import { Ionicons } from "@expo/vector-icons";


const icons = {
    settings: {
        outline: require("../assets/settings-outline.svg"),
        sharp: require("../assets/settings-sharp.svg")
    },
    profile: {
        outline: require("../assets/person-outline.svg"),
        sharp: require("../assets/person-sharp.svg")
    }
}

export default function Header({ currentPage }) {
    const navigator = useNavigation()
    const route = useRoute()

    var logoStyle = { width: 100, height: 50 }

    if (currentPage === "Entrance") {
        return (

            <View style={styles.main}>
                <View style={styles.content}>

                    {/* <TouchableOpacity>
                        <Animatable.View animation="bounceInLeft" duration={1500}>
                            <Image
                                source={require("../assets/arrowLeft.png")}
                                style={styles.arrows}
                            />
                        </Animatable.View>
                    </TouchableOpacity> */}

                    <Animatable.View animation="bounceIn" duration={1500}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={{ width: 100, height: 50, opacity: 0 }}
                        />
                    </Animatable.View>

                    {/* <TouchableOpacity onPress={() => {
                        navigator.navigate(nextPage)
                    }}>
                        <Animatable.View animation="bounceInRight" duration={1500}>
                            <Image
                                source={require("../assets/arrowRight.png")}
                                style={styles.arrows}
                            />
                        </Animatable.View>
                    </TouchableOpacity> */}
                </View>
            </View>

        );
    }
    else if (currentPage === "Register" || currentPage === "Register2" || currentPage === "Register3" || currentPage === "Register4" || currentPage === "Register5" || currentPage === "Login") {
        return (
            <View style={styles.main}>
                <View style={styles.content}>

                    <TouchableOpacity onPress={() => { navigator.goBack() }}>
                        <Animatable.View animation="bounceInLeft" duration={1500}>
                            <Image
                                source={require("../assets/arrowLeft.png")}
                                style={styles.arrows}
                            />
                        </Animatable.View>
                    </TouchableOpacity>

                    <Animatable.View animation="bounceIn" duration={1500}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={{ width: 100, height: 50, opacity: 0 }}
                        />
                    </Animatable.View>

                    {/* <TouchableOpacity onPress={() => {
                        navigator.navigate(nextPage)
                    }}>
                        <Animatable.View animation="bounceInRight" duration={1500}>
                            <Image
                                source={require("../assets/arrowRight.png")}
                                style={styles.arrows}
                            />
                        </Animatable.View>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }

    else if (currentPage === "MainPageUp") {
        return (
            <View style={styles.mainMainPage}>
                <View style={styles.content}>

                    <TouchableOpacity onPress={() => {
                        navigator.navigate("Profile")
                    }}>
                        <Ionicons
                            name='person-outline'
                            size={26}
                        />
                    </TouchableOpacity>
                    
                    <Image
                        source={require("../assets/logo.png")}
                        style={{ width: 120, resizeMode: "contain" }}
                    />

                    <TouchableOpacity onPress={() => {
                        navigator.navigate("Settings")
                    }}>
                        <Ionicons
                            name='settings-outline'
                            size={26}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    else if (currentPage === "MainPageDown") {
        return (
            <View style={styles.mainMainPage}>
                <View style={styles.content}>

                    <TouchableOpacity onPress={() => {
                        navigator.navigate("MainPage")
                    }}>
                        <Ionicons
                            name='heart'
                            size={26}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    else if (currentPage === "SettingsUp") {
        return (
            <View style={styles.mainMainPage}>
                <View style={styles.content}>

                    <TouchableOpacity onPress={() => {
                        navigator.navigate("Profile")
                    }}>
                        <Ionicons
                            name='person-outline'
                            size={26}
                        />
                    </TouchableOpacity>

                    <Image
                        source={require("../assets/logo.png")}
                        style={{ width: 120, resizeMode: "contain" }}
                    />

                    <TouchableOpacity onPress={() => {
                        navigator.navigate("Settings")
                    }}>
                        <Ionicons
                            name='settings'
                            size={26}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    else if (currentPage === "SettingsDown") {
        return (
            <View style={styles.mainMainPage}>
                <View style={styles.content}>

                <TouchableOpacity onPress={() => {
                        navigator.navigate("MainPage")
                    }}>
                        <Ionicons
                            name='heart-outline'
                            size={26}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    else if (currentPage === "ProfileUp") {
        return (
            <View style={styles.mainMainPage}>
                <View style={styles.content}>

                    <TouchableOpacity onPress={() => {
                        navigator.navigate("Profile")
                    }}>
                        <Ionicons
                            name='person'
                            size={26}
                        />
                    </TouchableOpacity>

                    <Image
                        source={require("../assets/logo.png")}
                        style={{ width: 120, resizeMode: "contain" }}
                    />

                    <TouchableOpacity onPress={() => {
                        navigator.navigate("Settings")
                    }}>
                        <Ionicons
                            name='settings-outline'
                            size={26}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    else if (currentPage === "ProfileDown") {
        return (
            <View style={styles.mainMainPage}>
                <View style={styles.content}>

                <TouchableOpacity onPress={() => {
                        navigator.navigate("MainPage")
                    }}>
                        <Ionicons
                            name='heart-outline'
                            size={26}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        opacity: 1,
        flex: 1,
        backgroundColor: "transparent",
    },
    mainMainPage: {
        opacity: 1,
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    arrows: {
        width: 33,
        height: 33,
        margin: 5
    }
});
