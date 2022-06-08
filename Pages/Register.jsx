import React, {useState}                    from 'react'
import { 
          Text, View,
          TextInput, TouchableOpacity,
        }                                   from 'react-native';
import { Ionicons }                         from '@expo/vector-icons';
import styles                               from '../css/css';
import Header                               from '../components/Header';


export default function Register({navigation}) {

  const [showPass,    setShowPass]      =     useState(false);

  const [password,    setPassword]      =     useState('');
  const [firstName,   setFirstName]     =     useState('');
  const [lastName,    setLastName]      =     useState('');
  const [email,       setEmail]         =     useState('');
  const [phoneNumber, setPhoneNumber]   =     useState('');


  
  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <View style={styles.registerTop}>
          <Header headerTitle='Register'/>
        </View>
        <View style = {styles.registerMidTop}>
        <View style={styles.registerMid}>
          <View style={styles.container}>
            <View style={styles.registerInput}>
              <TextInput 
                style={styles.registerInputFiled}
                placeholderTextColor= 'rgba(29, 53, 87, 0.5)'
                placeholder='email'
                defaultValue={email}
                onChangeText={(email) => setEmail(email)}/>
            </View>
          
            <View style={styles.registerInput} justifyContent='space-between'>
              <TextInput 
                style={styles.registerInputFiled}
                placeholderTextColor='rgba(29, 53, 87, 0.5)'
                defaultValue={password}
                placeholder='Password'
                onChangeText={(pass) => setPassword(pass)}
                secureTextEntry={showPass ? false : true}/>
              <Ionicons
                onPress={() => setShowPass(!(showPass))}
                name={showPass ? "eye-sharp" : "eye-off-sharp"} 
                style={[styles.icon, styles.eyeIcon]}/>
            </View>

            <View style={styles.registerInput}>
              <TextInput 
                style={styles.registerInputFiled}
                placeholderTextColor= 'rgba(29, 53, 87, 0.5)'
                placeholder='firstName'
                defaultValue={firstName}
                onChangeText={(firstName) => setFirstName(firstName)}/>
            </View>

            <View style={styles.registerInput}>
              <TextInput 
                style={styles.registerInputFiled}
                placeholderTextColor= 'rgba(29, 53, 87, 0.5)'
                placeholder='lastName'
                defaultValue={lastName}
                onChangeText={(lastName) => setLastName(lastName)}/>
            </View>

      

            <View style={styles.registerInput}>
              <TextInput 
                style={styles.registerInputFiled}
                placeholderTextColor= 'rgba(29, 53, 87, 0.5)'
                placeholder='PhoneNumber'
                defaultValue={phoneNumber}
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}/>
            </View>
      

          
          </View>
        </View>
        </View>
        <View style = {styles.registerMidBot}>
          <TouchableOpacity style = {styles.registerBtnBox} title = 'Gender'>
            <Text style={styles.signUpTxt}>Gender</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.registerBtnBox} title = 'BirthDate'>
            <Text style={styles.signUpTxt}>BirthDate</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.registerBtnBox} title = 'City'>
            <Text style={styles.signUpTxt}>City</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.registerBot}>
        <TouchableOpacity 
          title='Sign in' 
          style={styles.signUpBtn}
          onPress={() => navigation.navigate('Last3StepsScreen')}>
            <Text style={styles.signUpTxt}>Sign up</Text>
        </TouchableOpacity>
          <Text style={styles.registerTerms} >
            By clicking Sign Up, you agree to our <Text style ={styles.registerPolicy}>Terms, Data Policy
          </Text>. You may receive SMS Notifications from us and can opt out any time.
          </Text>
        </View>
      </View>
    </View>
   
  )
};

