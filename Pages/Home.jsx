import React, { useState, useContext }                   from 'react'
import { View, Text, TouchableOpacity, BackHandler, NavigatorIOS }     from 'react-native';
import { 
          MaterialCommunityIcons, 
          FontAwesome, MaterialIcons,
          AntDesign  
        }                                   from '@expo/vector-icons'; 
import styles                               from '../css/css';
import Header                               from '../components/Header';
import DoubleClick                          from 'react-native-double-tap';
import SOSHexagon                           from '../components/SOSHexaagon';
import { useFocusEffect } from '@react-navigation/native';
import { UserData } from '../navigation/Tabs';
import AsyncStorage       from '@react-native-async-storage/async-storage';


import { hrHexagonSVG, mainHexagonSVG } from '../components/SVG';
import { SvgXml }                            from 'react-native-svg';


const LIGHT_GREEN = Platform.OS === 'ios' ? 'rgba(242, 255, 237, 0.5)' : 'rgba(242, 255, 237, 0.4)';
const SWITCH_ICONS = [
  {
    title: 'phone-in-talk',
    icon:  <MaterialIcons name="phone-in-talk" style={[styles.phoneIcon, styles.homeSwitchIcon]}/>
  },
  {
    title: 'location-on',
    icon:  <MaterialIcons name="location-on" style={[styles.phoneIcon, styles.homeSwitchIcon]}/>
  },
  {
    title: 'star',
    icon:  <AntDesign name="star" style={[styles.phoneIcon, styles.homeSwitchIcon]}/>
  }
]

export default function Home({navigation}) {

  const [emergency, setEmergency] = useState(false);
  const [currentMidIcon, setCurrentMidIcon] = useState(SWITCH_ICONS[0]);
  const [showSwitches, setShowSwitches] = useState(false);
  
  const user = useContext(UserData)['userData']['Item1'][0];
  const emergencyContacts = useContext(UserData)['userData']['Item2'];

  
  const onEmergency = () => {
    setEmergency(!(emergency));
  }

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

  const handleSwitchPress = (icon) => {
    setCurrentMidIcon(icon);
    setShowSwitches(!showSwitches);
    console.log(icon.title);
  }

  const SwitchComp = () => {
    const switchIcons = SWITCH_ICONS.map((icon, key) => 
        icon.title != currentMidIcon.title 
        ?
          <TouchableOpacity 
            key={key}
            style={styles.homeSwitchHexagonComp}
            onPress={() => handleSwitchPress(icon)}>
            <MaterialCommunityIcons name="hexagon" style={[styles.shadow, styles.homeSwitchHexagon]}/>
            {icon.icon}
          </TouchableOpacity>
        : null
    )

    return (
      <View style={styles.homeSwitchComp}>
       {switchIcons}
      </View>
    )
  }

  const handleCenterHexPress = () => {
    if(currentMidIcon.title === 'location-on'){
      navigation.navigate('ShareLocation', {contacts: emergencyContacts});
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.home} backgroundColor={emergency ? 'rgba(230, 57, 70, 0.6)' : LIGHT_GREEN}>
        <Header headerTitle={`Hello ${user['first_name']}`}/>
        <View style={styles.top}></View>

        <View style={styles.mid}>
          {showSwitches && <SwitchComp/>}
          <View style={styles.center}>
            <View style={styles.hexLeft}>
              <View style={styles.hrCompTop}></View>
              
              <View style={styles.hrCompBot}>
                <View style={styles.hrCompBotLeft}></View>
                <View style={styles.hrCompBotRight}>
                  <TouchableOpacity 
                    style={styles.hrIcon}
                    onPress={() => navigation.navigate('HRMonitorScreen')}>
                    <FontAwesome name="heart" style={[styles.hrHexagonHeart, styles.heartIcon]}/>
                    <Text style={styles.hrHexagonText}>00</Text>
                    <MaterialCommunityIcons name="hexagon" style={[styles.hrHexagon, styles.shadow, styles.hrHexagonIcon]}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.hexCenter}>
              <View style={styles.one}></View>
              <View style={styles.two}>
                <TouchableOpacity 
                onPress={() => setShowSwitches(!showSwitches)}
                onLongPress={() => handleCenterHexPress()}
                style={styles.centerHex}>
                  <View style={styles.centerHexView}>
                    <MaterialIcons name={currentMidIcon.title} style={[styles.phoneIcon, styles.homePhoneIcon]}/>
                    <MaterialCommunityIcons name="hexagon" style={[styles.hexIcon, styles.shadow]}/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.tree}></View>
            </View>

            <View style={styles.hexRight}>
              <View style={styles.sosCompTop}>
                <SOSHexagon name="Chai" onEmergency={() => onEmergency()}/>
              </View>
              <View style={styles.sosCompBot}></View>
            </View>

          </View>
        </View>

        <View style={styles.bot}></View>
      </View>
    </View>
  );
}


