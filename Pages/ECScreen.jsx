import React, { useContext }                from 'react'
import { Text, View, TouchableOpacity }     from 'react-native';
import { AntDesign,Fontisto }               from '@expo/vector-icons';
import styles                               from '../css/css';
import Header                               from '../components/Header';
import { UserData }                         from '../navigation/Tabs';


export default function ECScreen({navigation}) {
  
  const contacts = useContext(UserData)['userData']['Item2'];

  const ecFieldBoxes = contacts.map((contact, id) => 
  <TouchableOpacity 
    key={id} 
    style={styles.emergencyInput} 
    onPress={() => navigation.navigate('ChangeFieldScreen', {contact})}>
    <AntDesign name="user" style={styles.profileRightArrow}/>
    <Text style = {styles.emergencyFiledTxt}>{contact['first_name']} {contact['last_name']}</Text>
    <AntDesign name="right" style={styles.profileRightArrow}/>
  </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.emergencyContainer}>

        <Header headerTitle='Contacts'/>

      <View style={styles.emergencyMidTop}>
        <View style={styles.emergencyMid}>
          <View style={styles.container}>
          {ecFieldBoxes}

          </View>
        </View>
      </View>
      <View style={styles.emergencyMidBot}>
      </View>
 
      <View style={styles.emergencyBot}>
       <Text style={styles.emergencyDefaultTxt} >Default Emegrency</Text>
      <TouchableOpacity 
        title='101' 
        style={styles.emergencyBtn}>
        <Fontisto name="ambulance" style={styles.ambulanceIcon}/>
        <Text style={styles.emergencyBtnTxt}>101</Text>
      </TouchableOpacity>
      
      </View>
    </View>
    </View>
  )
};          
