import { StatusBar } from "expo-status-bar";
import { Appbar } from "react-native-paper";
import React, { useEffect, useState } from "react";
import firebase from "../firebaseConfig";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { color } from "react-native-reanimated";

export function Welcome({ route }: any) {
  const { dataUser } = route.params ?? {};
  const navigation = useNavigation();

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logout feito com sucesso");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("erro ao fazer logout");
      });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("usuario logado com sucesso");
        console.log(user);
      } else {
        console.log("usuário não logado");
      }
    });
  }, []);
  return (
    // <Welcome />
    <>
      <Appbar.Header style={{ backgroundColor: "#1A73E8" }}>
        <Appbar.Content title={dataUser?.email} />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View>
              <Text style={styles.header}>Você está logado!</Text>
              <Text>{dataUser?.email}</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
              <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
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
