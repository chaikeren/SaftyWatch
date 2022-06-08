import React, { useContext, useState }                from 'react'
import { Text, View, TouchableOpacity, Modal, Pressable  }     from 'react-native';
import { Feather, FontAwesome }             from '@expo/vector-icons'; 
import Header                               from '../components/Header';
import styles                               from '../css/css';
import { UserData }                         from '../navigation/Tabs';
import DateTimePickerModal from "react-native-modal-datetime-picker";



const PROFILE_FIELDS = [
  {
    fieldName: 'First Name',
    val: 'first_name'
  },
  {
    fieldName: 'Last Name',
    val: 'last_name'
  },
  {
    fieldName: 'Email',
    val: 'email'
  },
  {
    fieldName: 'Phone Number',
    val: 'phone_number'
  },
  {
    fieldName: 'Password',
    val: ''
  },
]

const USER_TYPES = [
  "Solider",
  "Regular",
  "Elderly"
]

const GENDERS = [
  "Male",
  "Female"
]

const MIN_DATE = new Date(1950, 0, 1);
const MAX_DATE = new Date();

export default function ProfileScreen({navigation}) {

  const user = useContext(UserData)['userData']['Item1'][0];
  const birthDate = (user['birth_date'].toString().split('T')[0]).split("-").reverse().join("/");

  const [birthDay, setBirthDay] = useState(birthDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userTypeModelVisible, setuserTypeModelVisible] = useState(false);
  const [genderModelVisible, setGenderModelVisible] = useState(false);
  const [userType, setuserType] = useState(user['user_type']);
  const [gender, setGender] = useState(user['gender']);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    formattedDate(date);
    hideDatePicker();
  };

  const formattedDate = (date) => {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    setBirthDay(`${day}/${month}/${year}`);
  }

  const handleConfirmUserType = (id) => {
    setuserTypeModelVisible(!userTypeModelVisible);
    setuserType(id);
  }

  const handleConfirmGender = (gender) => {
    setGenderModelVisible(!genderModelVisible);
    setGender(gender);
  }

  const UserTypeModel = () => {
    const userTypeBoxs = USER_TYPES.map((type, key) => 
      <TouchableOpacity
        style={[styles.profileModelBtn, styles.profileUserTypeBtn]}
        onPress={() => handleConfirmUserType(key+1)}
        key={key}>
        <Text style={[styles.profileModelBtnText, styles.profileUserBtnText]}>{type}</Text>
      </TouchableOpacity>
    )

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={userTypeModelVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setuserTypeModelVisible(!userTypeModelVisible);
        }}
      >
        <View style={styles.profileUserTypeModelCenterd}>
          <View style={styles.profileUserTypeModel}>
            <Text style={styles.modalText}>Choose type</Text>

            <View style={styles.profileUserTypeBoxes}>
              {userTypeBoxs}
            </View>

            <TouchableOpacity
              style={[styles.profileModelBtn, styles.profileModelBtnClose]}
              onPress={() => setuserTypeModelVisible(!userTypeModelVisible)}
            >
              <Text style={styles.profileModelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  const GenderModel = () => {
    const genderBoxes = GENDERS.map((gender, key) =>
      <TouchableOpacity
        style={[styles.profileModelBtn, styles.profileUserTypeBtn]}
        onPress={() => handleConfirmGender(gender[0])}
        key={key}>
        <Text style={[styles.profileModelBtnText, styles.profileUserBtnText]}>{gender}</Text>
      </TouchableOpacity>
    )

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={genderModelVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setGenderModelVisible(!genderModelVisible);
        }}
      >
        <View style={styles.profileUserTypeModelCenterd}>
          <View style={styles.profileUserTypeModel}>
            <Text style={styles.modalText}>Choose gender</Text>

            <View style={styles.profileUserTypeBoxes}>
              {genderBoxes}
            </View>

            <TouchableOpacity
              style={[styles.profileModelBtn, styles.profileModelBtnClose]}
              onPress={() => setGenderModelVisible(!genderModelVisible)}>
              <Text style={styles.profileModelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  const profileFieldBoxes = PROFILE_FIELDS.map((field, id) => 
    <TouchableOpacity 
      key={id}
      style={styles.profileFieldBox}
      onPress={() => navigation.navigate('ChangeFieldScreen', {field: field['fieldName'], content: user[field['val']]})}>
      <Text style={styles.fieldBoxTxt}>{field['fieldName']}</Text>
      <Text style={[styles.fieldBoxTxt, styles.fieldBoxContant]}>{user[field['val']]}</Text>
      <Feather name="chevron-right" style={styles.profileRightArrow} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
        <Header headerTitle='Profile'/>

        <View style={styles.profileMid}>
          <View style={styles.profileMidTop}>
            {profileFieldBoxes}
          </View>

          <View style={styles.profileMidBot}>
          <TouchableOpacity 
            style={styles.profileBtnBox} 
            title='Birth Date'
            onPress={showDatePicker}>
            <Text style={styles.profileBtnBoxTxt}>{birthDay}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            // display="spinner"
            minimumDate={MIN_DATE}
            maximumDate={MAX_DATE}
          />

          <TouchableOpacity 
            style={styles.profileBtnBox} 
            title='Group Type'
            onPress={() => setuserTypeModelVisible(!userTypeModelVisible)}>
            <Text style={styles.profileBtnBoxTxt}>Group type: {userType}</Text>
          </TouchableOpacity>
          <UserTypeModel/>


          <TouchableOpacity 
            style={styles.profileBtnBox} 
            title='Gender'
            onPress={() => setGenderModelVisible(!genderModelVisible)}>
            <Text style={styles.profileBtnBoxTxt}>Gender: {gender}</Text>
          </TouchableOpacity>
          <GenderModel/>
          </View>
      </View>

      <View style={styles.profileBot}>
        <View style={[styles.prfileBotContainer, styles.profileBotLeft]}>
          <Text style={styles.profileBotText}>Your rest hear-rate: To recalabrate press the circle</Text>
        </View>
        <TouchableOpacity style={[styles.prfileBotContainer, styles.profileBotRight]}>
          <FontAwesome name="circle" style={styles.profileHrCircle}/>
          <Text style={styles.profileHrText}>00</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
};

