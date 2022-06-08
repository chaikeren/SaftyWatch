//import liraries
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { checkLoggedUser } from '../user_functions/User';
import AsyncStorage       from '@react-native-async-storage/async-storage';


// create a component
export default function MyComponent({navigation}) {

  const [isAppFirstTimeLaunched, setIsAppFirstTimeLaunched] = useState(null);

  const checkAppState = async () => {
    let appState = await AsyncStorage.getItem('isAppFirstTimeLaunched');
    if(appState == null) {
      setIsAppFirstTimeLaunched(true);
      AsyncStorage.setItem('isAppFirstTimeLaunched', JSON.stringify('false'));
    } else {
      setIsAppFirstTimeLaunched(false);
    }
  }

  const checkIfHasUser = async () => {
    const user = await checkLoggedUser();
      if(user != null) {
        navigation.navigate('Tabs', {userData: user});
      } else if(isAppFirstTimeLaunched) {
        navigation.navigate('OnBoardingScreen');
      } else {
        navigation.navigate('Login');
      }
  }

  useEffect(() => {
    setTimeout(() => {
      checkIfHasUser();
      //AsyncStorage.clear();
    }, 2000);
  }, [isAppFirstTimeLaunched])

  useEffect(() => {
    checkAppState();
  }, []);



  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <LottieView source={require('../components/myloader.json')} autoPlay loop/>
    </View>
  );
};

