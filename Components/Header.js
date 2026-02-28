import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar} from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { useFonts} from 'expo-font';


const Header = (props) => {
    const goback = () =>{
		props.navigation.dispatch(StackActions.pop());
	}
    let [fontsLoaded] = useFonts({
        'Body':require('../assets/fonts/Alkalami-Regular.ttf'), 
        'Heading':require('../assets/fonts/AveriaSerifLibre-Regular.ttf'), 
      });
      if (!fontsLoaded) {
        return null;
      }
  
    return (
      <Appbar.Header style = {styles.headerContainer}>
        {props.backBtn?<Appbar.BackAction onPress={goback} color='white' size={30} />: <Text></Text>}
        <Appbar.Content title={props.titleText} titleStyle={styles.heading} color='white'/>           
      </Appbar.Header>
    );
  };

export default Header;
const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#800080',
      marginBottom: 10,
      width: '100%',
      paddingTop: 20,
      height:60,
      fontFamily:'Heading',    
    },
    heading: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily:'Heading',
        textAlign:'center'
      },
    icon:{
        color:'white',
        
    }
}
);