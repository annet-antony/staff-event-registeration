import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { Text, StyleSheet, StatusBar, View, ScrollView, Image, Alert} from "react-native";
import { Button, DataTable, Dialog,Portal,Title,Paragraph, TextInput } from 'react-native-paper';
import firebase from '../firebase';
import { useFonts} from 'expo-font';
import Header from '../Components/Header';
import moment from 'moment';

const SignInScreen = () => {
    const [txtUserName, setUserName] = useState("");
    const [txtPassword, setPassword]= useState("");
    const navigation =useNavigation();

    const login  = async () => {
        if(txtUserName == 'Fnf2022' && txtPassword == 'Fnf2022'){
            navigation.navigate('Employee');  
        }
        else{
            alert('Invalid Username or Password')
        }
    }
    return(
	<View style={ styles.container1 }>
        <StatusBar hidden></StatusBar>
		<ScrollView>
        <Header backBtn={false} titleText="Login"/>
        <Image source={require('../assets/login.jpg')} style={{ width: '100%', height: 300}}/>
        <TextInput
        label="Enter UserName"
        value={txtUserName}
        onChangeText={txtUserName => setUserName(txtUserName)}
        mode ='outlined'
        style = {{  marginLeft:10,marginRight:10,marginTop:50, marginBottom:30, borderRadius:20}}
        />
         <TextInput
        label="Enter Password"
        value={txtPassword}
        onChangeText={txtPassword => setPassword(txtPassword)}
        mode ='outlined'
        style = {styles.textbox}
        secureTextEntry={true}
        />
        <Button icon="login" color='#800080' style={{marginTop: 20, marginLeft:10, marginRight:10, paddingTop: 5, paddingBottom: 5}} mode="contained" uppercase={false} onPress = { () => {login()}}>Login</Button>
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
        container1: {
            backgroundColor: "white",
            flex: 1,        
        },
        textbox:{
            marginLeft:10,
            marginRight:10, 
            marginBottom:30,
            borderRadius:20   
        }  
      });
      
export default SignInScreen;