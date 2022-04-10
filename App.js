import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from "./components/Register"
import Register2 from "./components/Register2"
import Register3 from "./components/Register3"
import Register4 from "./components/Register4"
import Register5 from "./components/Register5"
import Login from "./components/Login"
import Entrance from "./components/Entrance"
import MainNavigator from "./components/MainScreens/MainNavigator"


import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

import io from 'socket.io-client/dist/socket.io';
import { useState } from 'react';

window.navigator.userAgent = 'react-native';

const connectionConfig = {
  jsonp: false,
  reconnection: true,
  transports: ['websocket'],
};



export default function App({ navigation }) {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [userLoggedIn, setUserStatus] = useState("waiting screen")

  socket = io("https://taboo-react-server.herokuapp.com", connectionConfig);
  socket = io("http://13.1.0.93:3000", connectionConfig)
  const LoginWithSocket = () => (<Login socket={socket} />)
  const RegisterWithSocket = () => (<Register socket={socket} />)
  const Register2WithSocket = () => (<Register2 socket={socket} />)
  const Register3WithSocket = () => (<Register3 socket={socket} />)
  const Register4WithSocket = () => (<Register4 socket={socket} />)
  const Register5WithSocket = () => (<Register5 socket={socket} />)
  const EntranceWithSocket = () => (<Entrance socket={socket} />)


  socket.on("connection", () => {
    console.log(socket.id);
  })

  const GetData = async () => {
    try {
      const email = await AsyncStorage.getItem("email")
      const password = await AsyncStorage.getItem("password")
      if (email !== null && password !== null) {
        console.log(email, password);
        setEmail(email)
        setPassword(password)
        socket.emit("login request", { email: email, password: password })
        setUserStatus(true)
      }
      else {
        setUserStatus(false)
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const [loaded] = useFonts({
    Caveat: require('./assets/fonts/Caveat-Medium.ttf'),
    ProximaNova: require('./assets/fonts/Proxima-Nova.otf'),
    MilliardEL: require("./assets/fonts/MilliardExtraLight.otf"),
    MilliardL: require("./assets/fonts/MilliardLight.otf"),
    MilliardM: require("./assets/fonts/MilliardM.otf"),
  });
  if (!loaded) {
    return null;
  }

  GetData()

  // const MainNavigatorWithSocket = () => (<MainNavigator socket={socket} email={email} password={password}/>) 
  const MainNavigatorWithSocket = () => (<MainNavigator socket={socket}/>)

  if (userLoggedIn === true) {
    console.log("data got, mainpage stack will be returned..");
    return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="MainNavigator"
            component={MainNavigatorWithSocket}
            options={{
              headerTransparent: true,
              title: "Main Navigator",
              headerShown: false
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  else if (userLoggedIn === false) {
    console.log("data not got, regular stack will be returned");
    return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Entrance"
            component={EntranceWithSocket}
            options={{
              headerTransparent: true,
              title: "",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterWithSocket}
            options={{
              headerTransparent: true,
              title: "",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Register2"
            component={Register2WithSocket}
            options={{
              headerTransparent: true,
              title: "",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Register3"
            component={Register3WithSocket}
            options={{
              headerTransparent: true,
              title: "",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Register4"
            component={Register4WithSocket}
            options={{
              headerTransparent: true,
              title: "",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Register5"
            component={Register5WithSocket}
            options={{
              headerTransparent: true,
              title: "",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Login"
            component={LoginWithSocket}
            options={{
              headerTransparent: true,
              title: "",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="MainNavigator"
            component={MainNavigatorWithSocket}
            options={{
              headerTransparent: true,
              title: "Main Navigator",
              headerShown: false
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  else if (userLoggedIn === "waiting screen") {
    return (
      <View>
        <Text>Waiting screen..</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
