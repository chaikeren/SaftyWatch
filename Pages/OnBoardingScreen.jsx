import React       from 'react'
import { Text, Image, StyleSheet, BackHandler }                      from 'react-native'
import Onboarding                           from 'react-native-onboarding-swiper';
import { useFocusEffect } from '@react-navigation/native';

 


export default function OnBoardingScreen({navigation}) {

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

  return (
    <Onboarding 
    onSkip={() => navigation.navigate('Login')}
    onDone={() => navigation.navigate('Login')}
    pages={[
      {
        backgroundColor: 'rgba(168, 218, 220, 0.6)',
        image: <Image source={require('../assets/boarding1.png')} margin={5}/>,
        title: <Text style={styles.boardingText}>Smart monitoring</Text>,
        subtitle: <Text style={[styles.boardingText, styles.boardingTextSubs]}>Monitoring your heart rate, hearing you calling for help or tapping the phone we can know if somthing went wrong.</Text>,
      },
      {
        backgroundColor: 'rgba(237, 183, 245, 0.4)',
        image: <Image source={require('../assets/boarding2.png')}/>,
        title: <Text style={styles.boardingText}>One button</Text>,
        subtitle: <Text style={[styles.boardingText, styles.boardingTextSubs]}>By a push of a button with our app you will be less worried on those walks at night.</Text>,
      },
      {
        backgroundColor: 'rgba(212, 249, 195 , 0.4)',
        image: <Image source={require('../assets/boarding1.png')}/>,
        title: <Text style={styles.boardingText}>Share loction</Text>,
        subtitle: <Text style={[styles.boardingText, styles.boardingTextSubs]}>now you can live share your walkings with your closets.</Text>,
      }
    ]}
  >
  </Onboarding>
  )
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
