//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 


// create a component
export default function ChangedFieldScreen({navigation, route}) {

  const [password,      setPassword]      = useState(null);
  const [rePassword,    setRePassword]    = useState(null);
  const [contact,       setContact]       = useState('');
  const [firstName,     setFirstName]     = useState('');
  const [lastName,      setLastName]      = useState('');
  const [phoneNumber,   setPhoneNumber]   = useState('');
  const [field,         setField]         = useState('');
  const [box,           setBox]           = useState();
  const [headerTitle,   setHeaderTitle]   = useState('');


  //* -------------------------
  //* When page is renderd
  //* -------------------------
  React.useEffect(() => {
    if (route.params != null) {
      if('contact' in route.params) {
        setFirstName(route.params.contact['first_name']);
        setLastName(route.params.contact['last_name']);
        setPhoneNumber(route.params.contact['phone_number']);
        setHeaderTitle('Change contact');
      } 
      else if(Object.values(route.params).indexOf('Password') > -1) {
        setHeaderTitle('Change password');
      } 
      else {
        // console.log(route.params.content);
        setField(route.params);
        setHeaderTitle(`Change ${route.params['field']}`);
      }
    }
  }, [route.params]);

  //* -------------------------
  //* On goBack
  //* -------------------------
  const checkGoBack = () => {
    if(headerTitle == 'Change password' && (password == null || rePassword == null)){
      Alert.alert(
        "",
        "One or more fields are empty.",
        [
          {
            text: "Ok",
            onPress: () => null,
          },
        ]
      );
    }
    else if (password != rePassword) {
      Alert.alert(
        "",
        "Password does not match.",
        [
          {
            text: "Ok",
            onPress: () => null,
          },
        ]
      );
    }
    else {
      navigation.goBack();
    }
  }

  //* -------------------------
  //* Contact person change
  //* -------------------------
  const contactBox = () => {
    setBox(
      <View style={styles.changeFieldBot}>
        <View style={styles.changeScreenBox}>
          <Text style={styles.changeScreenText}>First name:</Text>
          <TextInput
          style={[styles.changeScreenInput, styles.changeScreenText]}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}/>
        </View>
        <View style={styles.changeScreenBox}>
          <Text style={styles.changeScreenText}>Last name:</Text>
          <TextInput
          style={[styles.changeScreenInput, styles.changeScreenText]}
          onChangeText={(text) => setLastName(text)}
          value={lastName}/>
        </View>
        <View style={styles.changeScreenBox}>
          <Text style={styles.changeScreenText}>Phone number:</Text>
          <TextInput
          style={[styles.changeScreenInput, styles.changeScreenText]}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}/>
        </View>
      </View>
    )
  };

  React.useEffect(() => {
    contactBox();
  }, [firstName, lastName, phoneNumber]);

  //* -------------------------
  //* profile field change
  //* -------------------------
  const changeField = (text) => {
      setField(prevField => ({
        ...prevField,
        [content]: text
    }))
  }

  const fieldBox = () => {
    setBox(
      <View style={styles.changeFieldBot}>
        <View style={styles.changeScreenBox}>
          <Text style={styles.changeScreenText}>{field['field']}:</Text>
          <TextInput
          style={[styles.changeScreenInput, styles.changeScreenText]}
          onChangeText={(text) => changeField(text)}
          value={field['content']}/>
        </View>
      </View>
    );
  };

  React.useEffect(() => {
    fieldBox();
  }, [field]);

  //* -------------------------
  //* profile password change
  //* -------------------------

const passwordBox = () => {
  setBox(
    <View style={styles.changeFieldBot}>
      <View style={styles.changeScreenBox}>
        <Text style={styles.changeScreenText}>Password: </Text>
        <TextInput
        style={[styles.changeScreenInput, styles.changeScreenText]}
        onChangeText={(text) => setPassword(text)}
        value={password}/>
      </View>
      <View style={styles.changeScreenBox}>
        <Text style={styles.changeScreenText}>Re-Password: </Text>
        <TextInput
        style={[styles.changeScreenInput, styles.changeScreenText]}
        onChangeText={(text) => setRePassword(text)}
        value={rePassword}/>
      </View>
    </View>
  );
};

React.useEffect(() => {
  passwordBox();
}, [password, rePassword]);


  return (
    <View style={styles.container}>
      <View style={styles.changeFieldTop}>
        <View style={styles.changeFieldHeader}>
          <AntDesign 
            name="close" 
            style={styles.changeFieldHeaderClose}
            onPress={() => navigation.goBack()}/>
          <Text style={styles.changeFieldHeaderText}>{headerTitle}</Text>
          <AntDesign 
            name="check" 
            style={styles.changeFieldHeaderCheck}
            onPress={() => checkGoBack()}/>
        </View>
      </View>
      {box}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  changeFieldHeader: {
    flex: 1,
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  changeFieldTop: {
    flex: 0.5,
    //backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeFieldBot: {
    flex: 4,
    //backgroundColor: 'coral',
  },
  changeScreenBox: {
    margin: 5,
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  changeScreenInput: {
    borderWidth: 1,
    borderColor: '#D6D6D6',
    width: '60%',
    padding: 5,
  },
  changeScreenText: {
    fontSize: 15,
    color: '#1D3557'
  },
  changeFieldHeaderText: {
    fontSize: 25,
  },
  changeFieldHeaderClose: {
    color: '#A9A9A9',
    fontSize: 30
  },
  changeFieldHeaderCheck: {
    color: '#66ACEE',
    fontSize: 30
  },
});
