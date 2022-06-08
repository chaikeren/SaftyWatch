//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { SvgXml }                            from 'react-native-svg';
import { Feather, FontAwesome }             from '@expo/vector-icons'; 
import styles                               from '../css/css';
import { AntDesign } from '@expo/vector-icons'; 



const USER_TYPE_IMAGES = [
  {
    url: require('../assets/soldier.png'),
    bg: '#C3E5C2'
  },
  {
    url: require('../assets/person.png'),
    bg: '#A998F4'
  },
  {
    url: require('../assets/elderly.png'),
    bg: '#FCFFA6'
  },
]

const INFO_MESSAGES = [
  "By selecting group type we can better understand " +
  "how to handle information coming from your phone.",

  "When first connected to our app we need to collect sample data " +
  "about your heart rate, with that we can more likely to identify " +
  "when something gone wrong.",
]


// create a component
export default function Last3StepsScreen({navigation}){

  const [activeUserType, setActiveUserType] = useState();
  const [infoMessage, setInfoMessage] = useState(null);
  const [modelVisible, setModelVisible] = useState(false);


  const showMessageBox = (index) => {
    setInfoMessage(INFO_MESSAGES[index]);
    setModelVisible(!modelVisible);
  }

  const InformationBox = () => {
    return (
      <Modal
      animationType="fade"
      transparent={true}
      visible={modelVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModelVisible(!modelVisible);
      }}
    >
      <View style={styles.profileUserTypeModelCenterd}>
        <View style={styles.profileUserTypeModel}>
          <Text style={[styles.modalText, styles.infoText]}>{infoMessage}</Text>

          <TouchableOpacity
            style={[styles.profileModelBtn, styles.profileModelBtnClose]}
            onPress={() => setModelVisible(!modelVisible)}>
            <Text style={styles.profileModelBtnText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    )
  }

  const userTypeBoxes = USER_TYPE_IMAGES.map((image, key) => 
    <TouchableOpacity 
      key={key}
      style={[styles.last3StepsTopBox, styles.solider, 
        activeUserType == key ? styles.last3StepsBoxBorder : null, {backgroundColor: image.bg}]}
      onPress={() => setActiveUserType(key)}>
      <Image
      style={{width: 90, height: 90}}
      source={image.url}/>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <InformationBox/>
      <View style={styles.moreInfoLine}>
        <Text>Select group type</Text>
        <AntDesign 
          name="questioncircle" 
          style={styles.questionMarkIcon}
          onPress={() => showMessageBox(0)}/>
      </View>
      <View style={styles.last3StepsTop}>
        {userTypeBoxes}
      </View>

      <Text>Connect To SmartWatch</Text>
      <View style={styles.last3StepsMid}>
      </View>

      <View 
        style={styles.moreInfoLine}>
        <Text>Callibrate your herat rate</Text>
        <AntDesign 
          name="questioncircle" 
          style={styles.questionMarkIcon}
          onPress={() => showMessageBox(1)}/>
      </View>
      <View style={styles.last3StepsBot}>
        <View style={[styles.profileBot, styles.last3StepsBotBox]}>
          <View style={[styles.prfileBotContainer, styles.profileBotLeft]}>
            <Text style={styles.profileBotText}>Your rest hear-rate: To recalabrate press the circle</Text>
          </View>
          <TouchableOpacity style={[styles.prfileBotContainer, styles.profileBotRight]}>
            <FontAwesome name="circle" style={styles.profileHrCircle}/>
            <Text style={styles.profileHrText}>00</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.last3stepsContinueBox}>
          <Text style={styles.loginSignInTxt}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.last3StepsSkipBox}>
          <Text style={styles.last3StepsBotSkipText}>You can skip and fill the above at any time.</Text>
          <TouchableOpacity style={styles.last3StepsSkip}>
          <Text style={styles.loginSignInTxt}>Skip</Text>
        </TouchableOpacity>
        </View>

      </View>

      <View></View>
    </View>
  );
};



