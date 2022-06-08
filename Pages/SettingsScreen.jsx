import React, {useState} from 'react'
import { View, Text, Switch, StyleSheet, Dimensions }  from 'react-native';
import Header from '../components/Header';
import { cameraSVG, contactsSVG, microphoneSVG, smsSVG, locationSVG } from '../components/SVG';
import { SvgXml }                            from 'react-native-svg';



const SETTINGS = [
  { 
    settingName: 'Camera', 
    active: false,
    icon: cameraSVG 
  }, 
  {
    settingName:  "Contacts",
    active: false,
    icon: contactsSVG 
  },
  {
    settingName:  "Microphone",
    active: false,
    icon: microphoneSVG 
  },
  {
    settingName:  "SMS",
    active: false,
    icon: smsSVG
  },
  {
    settingName:  "Location",
    active: false,
    icon: locationSVG 
  }
]


export default function SettingsScreen() {

  const [settings, setSettings] = useState(SETTINGS);

  const toggleSwitch = (settingName) => {

    let updatedSettings = settings.filter((setting) => {
      if(setting.settingName === settingName) {
        setting.active = !(setting.active);
      }
      return setting;
    });
    setSettings(updatedSettings);
  }

  const settingBoxes = SETTINGS.map((setting, id) => 
  <View key={id} style={styles.settingCameraBox}>
  <View style={styles.settingCameraBoxLeft}>
    <SvgXml xml={setting.icon} width="40%" height="40%"/>
    <Text style={styles.settingsText}>{setting.settingName}</Text>
  </View>

  <View style={styles.settingCameraBoxRight}>
    <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={setting.active ? "#A8DADC" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch(setting.settingName)}
          value={setting.active}
        />
  </View>
  </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.settingsTop}>
        <Header headerTitle='Settings'/>
      </View>
       
      <View style={styles.settingsMid}>
        {settingBoxes}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 255, 237, 0.6)'
  },
  settingsTop:{
    flex : 1
  },
  settingsMid :{
    flex :3,
  },
  settingCameraBox: {
    backgroundColor: 'rgba(168, 218, 220, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'red',
    margin: 5,
    borderRadius: 10,  
  },
  settingsText:{
    fontSize: 15,
    color: '#1D3557'
  },
  settingCameraBoxRight:{
    margin: 10
  },
  settingCameraBoxLeft:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: -20,
  }

});