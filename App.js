import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import
import EmployeeDataScreen from './screens/EmployeeData';
import SignInScreen from './screens/Signin';
function App() {

  const Stack = createStackNavigator(); 
  

  return (    
      <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}}  name="SignIn" component={SignInScreen}/>
      <Stack.Screen options={{headerShown: false}}  name="Employee" component={EmployeeDataScreen}/>
    </Stack.Navigator>
  );
}

export default () => {

  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
