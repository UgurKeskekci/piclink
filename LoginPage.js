// LoginPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validate email and password
    if (email === 'Deneme@deneme.com' && password === '123') {
      // Navigate to the Main page
      navigation.navigate('MainPage');
    } else {
      // Handle invalid login
      // You can display an error message or handle it as per your requirement
      console.error('Invalid credentials');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 26 }}>Welcome To PicLink</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
       style={styles.mailInput} 
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.mailInput} 
      />
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', width:120, height:15, display:"flex", justifyContent:"center", textAlign:"center", fontSize:12, fontWeight:500, flexDirection:"column"}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mailInput:{
    display: "flex",
    minWidth:255,
    minHeight: 55,
    flexDirection:"column",
    justifyContent:"center",
    borderRadius:20,
    borderColor:"rgba(36, 96, 253, 0.10)",
    borderWidth:1,
    padding:14,
    backgroundColor:"rgba(36, 96, 253, 0.10)",
    marginBottom: 30

  }


});


export default LoginPage;
