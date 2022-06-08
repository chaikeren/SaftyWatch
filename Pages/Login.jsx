import React, {useState, useEffect }                    from 'react'
import { 
          Text, View,
          TextInput, TouchableOpacity,
          Platform, StyleSheet, Dimensions,
          Alert, BackHandler
        }
                                           from 'react-native';
import { 
          MaterialIcons, Ionicons,
          FontAwesome5
        }                                   from '@expo/vector-icons';
import AsyncStorage                         from '@react-native-async-storage/async-storage';
import styles                               from '../css/css';
import { SvgXml }                           from 'react-native-svg';
import { googleSVG }                        from '../components/SVG.js'
import Svg, { Path }                        from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';


export default function Login({navigation}) {

  const [showPass, setShowPass] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const signIn = async () => {

    try {
      // const jsonValue = await AsyncStorage.getItem('WatchMeUserCredentials');
      // if (jsonValue !== null) {

      //   console.log(JSON.parse(jsonValue)['Item1'][0]["token"]);
      // } 
      // else {
      //   await AsyncStorage.clear();
      

      let res = await fetch("http://proj2.ruppin-tech.co.il/api/users/login", {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          token:    null,
          username: username,
          password: password
        })
      });
        
      if(res.status == 200){

        let data = await res.json();
  
        setData(data);
    
        const user = JSON.stringify(data);
        await AsyncStorage.setItem('WatchMeUserCredentials', user);
        await AsyncStorage.setItem('username', username);
        navigation.navigate('Tabs', {userData: JSON.parse(user)});
      } else {
        Alert.alert(
          "Incorrect user",
          "Username or password is incorrect.",
          [
            { text: "OK", onPress: null }
          ]
        );
        console.log(res.status);
      }} catch (error) {
      // console.log(error);
    }
  };
  
  return (
    <View style={styles.container} backgroundColor={Platform.OS === 'ios' ? '#A8DADC' : '#DBF4F4'}>
      <View style={styles.loginTop}>
        <View style={stylesInit.top}>
        <View style={stylesInit.header}>
        <Text style={stylesInit.headerTxt}>Login to your account</Text>
          <View style={stylesInit.box}>
            <Svg 
              height={200}
              width={Dimensions.get('screen').width}
              viewBox="0 0 1440 320"
              style={stylesInit.registerTopWaves}>
              <Path fill={Platform.OS === 'ios' ? 'rgba(241, 250, 236, 0.9)' : '#F8FFF6'} d=  "M0,0L24,5.3C48,11,96,21,144,48C192,75,240,117,288,128C336,139,384,117,432,106.7C480,96,528,96,576,117.3C624,139,672,181,720,176C768,171,816,117,864,112C912,107,960,149,1008,186.7C1056,224,1104,256,1152,266.7C1200,277,1248,267,1296,234.7C1344,203,1392,149,1416,122.7L1440,96L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"/>
            </Svg>
          </View>
        </View>
          
        </View>
      </View>
      <View style={styles.loginBot}>
      <View style={styles.inputComponent}>
        <MaterialIcons name="email" style={styles.icon}/>
        <TextInput 
          style={styles.inputEmail}
          placeholderTextColor= 'rgba(29, 53, 87, 0.5)'
          placeholder='Email'
          defaultValue={username}
          onChangeText={(username) => setUsername(username)}/>
      </View>

      <View style={styles.inputComponent} justifyContent='space-between'>
        <FontAwesome5 name="lock" style={styles.icon}/>
        <TextInput 
          style={styles.inputPass}
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

      <TouchableOpacity 
        title='Sign in' 
        style={styles.signInBtn}
        onPress={() => signIn()}>
        <Text style={styles.loginSignInTxt}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.link}>Forgot password?</Text>

      
      <Text style={[styles.link, styles.continueTxt]}>or continue with</Text>

      <TouchableOpacity 
        style={styles.googleIconCompAlign}
        onPress={() => navigation.navigate('Tabs')}>
        <View style={styles.googleIconComponent}>
          <SvgXml xml={googleSVG} width="90%" height="90%" style={[styles.icon, styles.googleIcon]}/>
        </View>
      </TouchableOpacity>

      <Text style={[styles.continueTxt, styles.loginSignUpTxt]}>Dont have an account?
        <Text style={styles.loginSignUpLink} onPress={() => navigation.push('Register')}> Sign up</Text>
      </Text>
      </View>
    </View>
  )
};


const stylesInit = StyleSheet.create({
  container: {
    flex: 1.5,
  },
  profile: {
    justifyContent: 'space-between',
  },  
  top: {
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  box: {
    height: 60,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(241, 250, 236, 0.9)' : '#F8FFF6',
  },
  bot: {

  },
  header: {
     zIndex: 2,
     justifyContent: 'center',
     alignItems: 'center'
  },
  headerTxt: {
    position: 'absolute',
    color: '#457B9D',
    zIndex: 3,
    fontSize: 38,
    fontWeight: '400'
  },
});