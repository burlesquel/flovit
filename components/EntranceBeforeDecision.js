import React, { useState, useEffect } from 'react';
import { StyleSheet,View  } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

window.navigator.userAgent = 'react-native';

export default function EntranceBeforeDecision({ socket }) {
    const navigator = useNavigation()
    const route = useRoute()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const getData = async () => {
        try{
            const email = await AsyncStorage.getItem("email")
            const password = await AsyncStorage.getItem("password")
            if(email !== null && password !== null){
                console.log(email, password);
                setEmail(email)
                setPassword(password)
                return true
            }
            else{
                return false
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    console.log("Entrance page: ", socket.id);

    if(getData()){
        console.log("data got............");
        socket.emit("login request",{email:email, password:password})
        socket.on("login approved",()=>{
            navigator.navigate("MainPage")
        })
        socket.on("login rejected",()=>{
            navigator.navigate("Entrance")
        })
    }
    else{
        navigator.navigate("Entrance")
    }

    return(
        <View></View>
    )
}

const styles = StyleSheet.create({
    
});
