import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>Firebase Login!</Text>
            <TextInput placeholder="digite seu email" keyboardType='email-address' style={styles.input}/>
            <TextInput placeholder="digite sua senha" secureTextEntry style={styles.input}/>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
      
    </KeyboardAvoidingView>
    <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton:{
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    width: 150,
    borderRadius: 10
    
  },
  input:{
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: '#1A73E8',
    marginTop: 10,
    borderRadius: 125,
    paddingLeft: 20
  },
  textButton:{
    fontSize:20,
    textAlign:'center',
    padding: 8
  },
  header:{
    fontSize: 25,
    marginBottom:10
  }
});
