import React, { useState } from 'react';
import { Text, StyleSheet, StatusBar, View, ScrollView, Image, Alert} from "react-native";
import { Button, DataTable, Dialog,Portal,Title,Paragraph, TextInput } from 'react-native-paper';
import firebase from '../firebase';
import { useFonts} from 'expo-font';
import Header from '../Components/Header';
import moment from 'moment';
const EmployeeDataScreen = () => {
  
    const [txtemployeeNumber, setEmployeeNumber] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeDesignation, setEmployeeDesignation] = useState("");
    const [employeeDepartment, setEmployeeDepartment] = useState("");
    const [employeeLocation, setEmployeeLocation] = useState("");
    const [employeeTime, setEmployeeTime] = useState("");
    const [visible, setVisible] = React.useState(false);
  
    const db = firebase.firestore();

    const retrieveData  = async () => {
      if(txtemployeeNumber==''){
        alert('Please Enter Employee Number');
      }
      else{
        try {
          db.collection('NewEmployeeDetails').doc(''+ txtemployeeNumber).get().then(function(doc) {
        
            if((doc.data().updatedTime) != ''){            
              setEmployeeID('');
              setEmployeeName('');
              setEmployeeDesignation('');
              setEmployeeDepartment('');
              setEmployeeLocation('');            
              setEmployeeTime('');
              alert('Already Registered');
            }
            else{
              setEmployeeID(doc.id);
              setEmployeeName(doc.data().callingName);
              setEmployeeDesignation(doc.data().designation);
              setEmployeeDepartment(doc.data().department);
              setEmployeeLocation(doc.data().location);            
              setEmployeeTime( moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss a'));
            }
          }).catch(err => {
            alert('Invalid Number', err);
            setEmployeeID('');
            setEmployeeName('');
            setEmployeeDesignation('');
            setEmployeeDepartment('');
            setEmployeeLocation('');            
            setEmployeeTime('');
        });
        } catch (error) {
          alert('Invalid Number');
        }  
    }
    };    
     
    const insertData  = async () => {
     if(employeeID==''|| employeeName=='' || employeeDesignation=='' || employeeDepartment=='' || employeeLocation=='' || employeeTime==''){
      alert('Please Enter Employee Number & Press View Details');
     }
     else{
      db.collection('NewEmployeeDetails').doc(employeeID)
      .update({
        updatedTime: employeeTime,       
      })
      .then(() => {
            alert('Successfully Registered');
            setEmployeeID('');
            setEmployeeNumber('');
            setEmployeeName('');
            setEmployeeDesignation('');
            setEmployeeDepartment('');
            setEmployeeLocation('');
            setEmployeeTime('');
      });
      }
     }

    let [fontsLoaded] = useFonts({
        'Body':require('../assets/fonts/Alkalami-Regular.ttf'), 
        'Heading':require('../assets/fonts/AveriaSerifLibre-Regular.ttf'), 
      });
      if (!fontsLoaded) {
        return null;
      }

    return(
		<View style={ styles.container1 }>
        <StatusBar hidden></StatusBar>
		    <ScrollView>
        <Header backBtn={false} titleText="Employee Details"/>
        <Image source={require('../assets/background.jpg')} style={{ width: '100%', height: 200}}/>
        <TextInput
        label="Enter Employee Number Here"
        value={txtemployeeNumber}
        onChangeText={employeeNumber => setEmployeeNumber(employeeNumber)}
        mode ='outlined'
        style = {styles.textbox}
        keyboardType='number-pad'
        maxLength={6}
        />
        <Button icon="login" color='#800080' style={{marginTop: 20, marginLeft:10, marginRight:10, paddingTop: 5, paddingBottom: 5}} mode="contained" uppercase={false} onPress = { () => {retrieveData()}}>View Details</Button>
        <DataTable style={{marginTop:20, marginLeft:10, marginRight:10}}>
        <DataTable.Header style={{fontSize:16, fontFamily:'Heading', color:'#800080'}}>
        <DataTable.Title>About</DataTable.Title>
        <DataTable.Title>Details</DataTable.Title>
     
        </DataTable.Header>
        <DataTable.Row >
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'#800080'}}>Employee ID</Text></DataTable.Cell>
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'black'}}>{employeeID}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row >
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'#800080'}}>Name</Text></DataTable.Cell>
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'black'}}>{employeeName}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row >
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'#800080'}}>Designation</Text></DataTable.Cell>
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'black'}}>{employeeDesignation}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row >
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'#800080'}}>Department</Text></DataTable.Cell>
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'black'}}>{employeeDepartment}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row >
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'#800080'}}>Location</Text></DataTable.Cell>
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'black'}}>{employeeLocation}</Text></DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'#800080'}}>Updated Time</Text></DataTable.Cell>
        <DataTable.Cell><Text style={{fontSize:16, fontFamily:'Heading', color:'black'}}>{employeeTime}</Text></DataTable.Cell>
        </DataTable.Row>
        </DataTable>   
        <Button icon="login" color='#800080' style={{marginTop: 10, marginLeft:10, marginRight:10, paddingTop: 5, paddingBottom: 5, borderColor:'#800080', borderWidth:3}} mode='outlined' uppercase={false} onPress = { () => {insertData()}}>Register</Button>
        </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
	container1: {
		backgroundColor: "#fafaff",
		flex: 1,        
	},
    textbox:{
        marginLeft:10,
        marginRight:10,       
    }  
  });
  
export default EmployeeDataScreen