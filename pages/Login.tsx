import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import firebase from "../firebaseConfig";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

export function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputChangeEmail(value: string) {
    setEmail(value);
  }

  function handleInputChangePassword(value: string) {
    setPassword(value);
  }

  function changeWelcome(dataUser: any) {

    navigation.navigate("Welcome", { email:dataUser.email,uid:dataUser.uid });
  }

  function handleSubmit() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user: any = userCredential.user;

        changeWelcome(user);
        // navigation.navigate("Welcome");
      })
      .catch((error) => {
        //error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        changeWelcome(user);
      } else {
        console.log("usuário não logado login")
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Firebase Login!</Text>
            <TextInput
              placeholder="digite seu email"
              keyboardType="email-address"
              autoCorrect={false}
              style={styles.input}
              onChangeText={handleInputChangeEmail}
            />
            <TextInput
              placeholder="digite sua senha"
              secureTextEntry
              style={styles.input}
              onChangeText={handleInputChangePassword}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#1A73E8",
    width: 150,
    height: 60,
    borderRadius: 75,
    justifyContent: "center",
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: "#1A73E8",
    marginTop: 10,
    borderRadius: 125,
    paddingLeft: 20,
  },
  textButton: {
    fontSize: 20,
    textAlign: "center",
    padding: 8,
    color: "#fff",
  },
  header: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
  },
});
