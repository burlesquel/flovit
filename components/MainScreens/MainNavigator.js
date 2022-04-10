import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainPage from "./MainPage"
import Settings from './Settings';
import Profile from './Profile'

const Stack = createNativeStackNavigator();

import { useState } from 'react';
import { useEffect } from 'react';

window.navigator.userAgent = 'react-native';

const Tab = createBottomTabNavigator();




export default function MainNavigator({ socket }) {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const GetData = async () => {
        try {
            const email = await AsyncStorage.getItem("email")
            const password = await AsyncStorage.getItem("password")
            if (email !== null && password !== null) {
                console.log(email, password);
                setEmail(email)
                setPassword(password)
                socket.emit("login request", { email: email, password: password })
            }
            else {
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        GetData()
    }, [])


    const MainPageWithSocket = () => (<MainPage socket={socket} email={email} password={password} />)
    const SettingsWithSocket = () => (<Settings socket={socket} email={email} password={password} />)
    const ProfileWithSocket = () => (<Profile socket={socket} email={email} password={password} />)

    socket.on("connection", () => {
        console.log(socket.id);
    })

    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator screenOptions={{animation:"fade"}} >

                <Stack.Screen
                    name="MainPage"
                    component={MainPageWithSocket}
                    options={{
                        headerTransparent: true,
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Settings"
                    component={SettingsWithSocket}
                    options={{
                        headerTransparent: true,
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Profile"
                    component={ProfileWithSocket}
                    options={{
                        headerTransparent: true,
                        headerShown: false
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
