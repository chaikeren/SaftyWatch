import { StyleSheet } from "react-native";

const palette = {
  darkBlue:         '#1D3557',
  darkBlueOpacity:  'rgba(29, 53, 87, 0.5)',
  black:            '#000',
  white:            '#fff',
  lightGreen:       Platform.OS === 'ios' ? 'rgba(242, 255, 237, 0.5)' : 'rgba(242, 255, 237, 0.4)',
  lightGrey:        '#D6D6D6',
  lightBlue:        '#457B9D',
  lightCyan:        '#A8DADC',
  powderBlue:       Platform.OS === 'ios' ? 'rgba(168, 218, 220, 0.3)' : 'rgba(168, 218, 220, 0.3)',
  tomato:           'rgba(230, 57, 70, 0.7)',
  lightRed:         '#E28383',
  red:              '#E63946',
  aqua:             '#C7EDEE',
}

const styles = StyleSheet.create({
    //* -------------------
    //* Home
    //* -------------------
    hrHexagon: {
      transform: [
        {rotate: '90deg'}
      ],
      position: 'absolute',
    },
    shadow: {
      shadowColor: palette.darkBlue,
      shadowOpacity: 0.5,
      textShadowRadius: 20,
      textShadowOffset: {
          width: 1,            
          height: 1,
      }   
    },
    hrHexagonText: {
      zIndex: 2,
      fontSize: 25,
      fontWeight: 'bold',
      color: palette.darkBlue
    },
    hrHexagonHeart: {
      zIndex: 2,
      marginLeft: '20%',
    },
    sosHexagonText: {
      fontWeight: 'bold',
      fontSize: 40,
      zIndex: 2,
      color: palette.darkBlue
    },
    phoneIcon: {
      zIndex: 2,
      position: 'absolute',
      marginTop: '-10%',
    },
    heartIcon: {
      fontSize: 15,
      color: palette.red
    },
    hrHexagonIcon: {
      fontSize: 80,
      color: palette.lightBlue
    },
    homePhoneIcon: {
      fontSize: 90,
      color: palette.darkBlue
    },
    homeHexagonIcon: {
      fontSize: 220,
      color: palette.aqua
    },
    googleIconCompAlign: {
      alignItems: 'center'
    },
    homeSwitchComp: {
      width: '70%',
      height: 20,
      right: 55,
      position: 'absolute',
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    homeSwitchHexagonComp: {
      flex: 1,
      height: 90,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeSwitchHexagon: {
      fontSize: 90,
      transform: [
        {rotate: '90deg'}
      ],
      color: palette.aqua
    },
    homeSwitchIcon: {
      fontSize: 50,
      marginTop: 0,
      color: palette.darkBlue
    },
    home: {
      flex: 1,
    },
    top: {
      flex: 1,
    },
    mid: {
      flex: 4.5,
    },
    bot: {
      flex: 0.5,
    },
    center: {
      flex: 1,
      margin: 10,
      flexDirection: 'row'
    },
    hexLeft: {
      flex: 0.5,
    },
    hexCenter: {
      flex: 1,
      zIndex: 10
    },
    hexRight: {
      flex: 0.5,
    },
    sosCompTop: {
      flex: 1,
    },
    sosCompBot: {
      flex: 1,
    },
    hrCompTop: {
      flex: 1,
    },
    hrCompBot: {
      flex: 1,
      flexDirection: 'row'
    },
    hrCompBotLeft: {
      flex: 0.5,
    },
    hrCompBotRight: {
      flex: 2.5,
      alignItems: 'flex-end',
      marginTop: -30,
      zIndex: 15,
    },
    hrIcon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 15,
      elevation: 15,
    },
    centerHex: {
      flex: 1,
    },
    centerHexView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    hexIcon: {
      fontSize: 220,
      position: 'absolute',
      transform: [
        {rotate: '90deg'}
      ],
      color: palette.lightCyan,
      borderRadius: 100,
    },
    one: {
      flex: 1,
    },
    two: {
      flex: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tree: {
      flex: 1,
    },
    //* -------------------
    //* -------------------
    //* Login
    //* -------------------
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: palette.lightGreen
    },
    loginTop: {
      flex: 1,
    },
    loginBot: {
      flex: 2.5,
      padding: 10
    },
    loginHeader: {
      fontSize: 40,
      marginTop: 40,
      paddingBottom: 70,
      fontWeight: 'bold',
      color: palette.darkBlue
    },
    icon: {
      fontSize: 20,
      color: palette.black,
      color: palette.darkBlue
    },
    inputComponent: {
      height: 50,
      marginBottom: 20,
      flexDirection: 'row',
      borderRadius: 5,
      backgroundColor: palette.powderBlue,
    },
    inputEmail: {
      fontSize: 18,
      marginLeft: 18
    },
    inputPass: {
      fontSize: 18,
      marginRight: '45%'
    },
    eyeIcon: {
      marginRight: 10,
    },
    signInBtn: {
      alignItems: "center",
      backgroundColor: palette.darkBlue,
      height: 50,
      marginTop: 40,
      padding: 10,
      borderRadius: 30
    },
    loginSignInTxt: {
      color: palette.white,
      fontWeight: 'bold',
      fontSize: 18
    },
    link: {
      color: palette.darkBlue,
      fontWeight: 'bold',
      fontSize: 18,
      paddingTop: 15,
      marginBottom: -20,
      textAlign: 'center'
    },
    continueTxt: {
      color: palette.darkBlueOpacity,
      fontWeight: 'normal',
      fontSize: 14,
      marginTop: 30
    },
    googleIcon: {
      fontSize: 40,
      marginLeft: 0,
      marginTop: 0,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: palette.lightGrey,
      backgroundColor: palette.white,
    },
    googleIconComponent: {
      width: 60,
      height: 60,
      marginTop: 20,
      marginTop: 30,
      alignItems: 'center',
    },
    loginSignUpTxt: {
      fontSize: 17,
      textAlign: 'center',
      color: palette.lightBlue
    },
    loginSignUpLink: {
      fontWeight: 'bold',
      color: palette.darkBlue
    },
    //* -------------------
    //* -------------------
    //* Register
    //* -------------------
    registerInput:{
      height: 50,
      marginBottom: 10,
      flexDirection: 'row',
      borderRadius: 5,
      backgroundColor: palette.powderBlue,
    },
    registerInputFiled:{
      padding : 5,
      width : '90%',
    },
    icon: {
      fontSize: 20,
      color: palette.black,
      marginTop: 15,
      marginLeft: 5,
      color: palette.darkBlue
    },
    signUpBtn: {
      alignItems: "center",
      backgroundColor: palette.darkBlue,
      height: 50,
      padding: 10,
      borderRadius: 30,
      marginTop : -45,
      
    },
    signUpTxt: {
      color: palette.white,
      fontWeight: 'bold',
      fontSize: 18
    },
    registerContainer:{
      flex:1,
      flexDirection:'column',
      width:'100%'
    },
    registerTop:{
      flex: 1.5,
      alignItems: 'center',
      flexDirection : 'column',
      height: '20%',
    },
    registerMid:{
      flex:5,
      alignItems: 'center',
      margin: 10,
    },
    registerBot:{
      flex:1,
       justifyContent: 'center',
       padding: 5,
    },
    registerMidTop:{
      flex : 4, 
    },
    registerMidBot: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around'
  
    },
    registerBtnBox : {
      height : 50,
      width : 100,
      alignItems: 'center',
      justifyContent : 'center',
      backgroundColor :palette.lightBlue,
      borderRadius: 5,
      marginTop: -30
    },
    registerTerms:{
      color:palette.darkBlue,
      fontSize:12,
      top :10,
      padding :5
  
      
    },
    registerPolicy:{
      color :palette.lightBlue
    },
    //* -------------------
    //* -------------------
    //* Emergency Contacts
    //* -------------------
    emergencyInput:{
      height: 60,
      marginBottom: 10,
      top : 30,
      flexDirection: 'row',
      justifyContent :'space-between',
      fontWeight:'bold',
      alignItems : 'center',
      padding: 5,
      borderRadius: 5, 
      backgroundColor: palette.powderBlue,
    },
    emergencyInputFiled:{
      padding : 5,
      width : '90%'
    },
    emergencyBtn: {
      alignItems: "center",
      flexDirection : 'row',
      backgroundColor: palette.tomato,
      justifyContent : 'space-between',
      height: 50,
      padding: 10,
      borderRadius: 20,
      width: '80%',
    },
    emergencyBtnTxt: {
      color: palette.darkBlue,
      fontWeight: 'bold',
      fontSize: 18,
      width :'55%'
    },
    emergencyMain:{
      flex : 1,
    },
    emergencyContainer:{
      flex:1,
      flexDirection:'column',
      width:'100%',
    },
    emergencyMid:{
      flex:3,
      alignItems: 'center',
      justifyContent : 'center',
      padding: 10
    },
    emergencyBot:{
      flex:0.5,
       justifyContent: 'center',
       padding: 5,
       alignItems: 'center'
  
    },
    emergencyHeaderTxtTop : {
     fontSize : 25 ,
     fontWeight : 'bold',
     color : palette.lightBlue
  
    },
    emergencyMidTop:{
      flex : 4,
      
    },
    emergencyMidBot: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around'
  
    },
    emergencyBtnNox : {
      height : 50,
      width : 100,
      alignItems: 'center',
      justifyContent : 'center',
      backgroundColor :palette.lightBlue,
      borderRadius: 5,
      marginTop: -30
    },
    emergencyDefaultTxt :{
      marginTop: -80,
      padding: 10,
      fontSize : 20,
      fontWeight : 'bold',
      color : palette.darkBlue,
    },
    emergencyFiledTxt: {
      color:palette.darkBlue,
      fontWeight : 'bold'
    },
    ambulanceIcon: {
      fontSize: 24,
      color: palette.darkBlue
    },
    //* -------------------
    //* -------------------
    //* Profile
    //* -------------------
    profileMid: {
      flex: 4,
      flexDirection: 'column',
      padding: 5

    },
    profileBot: {
      flex: 1.2,
      flexDirection: 'row',
      backgroundColor: palette.lightBlue,
      borderRadius: 10,
      margin: 5
    },
    profileBotLeft: {
      flex: 2,
    },
    profileBotRight: {
      flex: 1,
    },
    profileMidTop: {
      flex: 3,

    },
    profileMidBot: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    profileFieldBox: {
      flex: 1,
      backgroundColor: palette.lightCyan,
      margin: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
      borderRadius: 5,
    },
    fieldBoxTxt: {
      width: '30%',
      fontSize: 14,
      fontWeight: 'bold',
      color: palette.darkBlue
    },
    fieldBoxContant: {
      width: '50%',
      textAlign: 'left',
    },
    profileBtnBox: {
      width: 110,
      height: 50,
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: palette.lightCyan,
      borderRadius: 5
    },
    profileBtnBoxTxt: {
      fontSize: 16,
      fontWeight: 'bold',
      color: palette.darkBlue,
    },
    prfileBotContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    profileHrText: {
      color: palette.darkBlue,
      position: 'absolute',
      fontSize: 24,
      fontWeight: 'bold'
    },
    profileRightArrow: {
      fontSize: 24,
      color: palette.darkBlue
    },
    profileHrCircle: {
      fontSize: 90,
      color: palette.lightRed
    },
    profileBotText: {
      color: palette.darkBlue
    },
    profileUserTypeModelCenterd: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    profileUserTypeModel: {
      margin: 20,
      backgroundColor: palette.white,
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
      shadowColor: palette.black,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color: palette.darkBlue,
      fontSize: 18
    },
    profileModelBtn: {
      borderRadius: 20,
      padding: 15,
      width: 100,
      elevation: 2,
      margin: 5,
    },
    profileModelBtnClose: {
      backgroundColor: palette.darkBlue,
    },
    profileModelBtnText: {
      color: palette.white,
      fontWeight: "bold",
      textAlign: "center"
    },
    profileUserTypeBoxes: {
      flexDirection: 'row',
    },
    profileUserTypeBtn: {
      backgroundColor: palette.lightCyan,
      borderRadius: 5,
    },
    profileUserBtnText: {
      color: palette.darkBlue,
    },
    //* -------------------
    //* -------------------
    //* On boarding
    //* -------------------
    boardingText: {
      color: palette.darkBlueOpacity,
      fontSize: 22,
      margin: 5
    },
    boardingTextSubs: {
      fontSize: 15,
      textAlign: 'center',
      width: '90%'
    },
    //* -------------------
    //* -------------------
    //* Last3Steps
    //* -------------------
    last3StepsTop:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
  
    },
    last3StepsMid:{
      flex:1.5,
      borderRadius:20,
      marginRight:10,
      marginLeft:10,
      padding:10,
      borderColor:'black',
      backgroundColor:'blue'
      
    },
    last3StepsBot:{
      flex:1.5,
      alignItems: 'center',
    },
    last3StepsTopBox:{
      backgroundColor:'#C3E5C2',
      margin:5,
      width:'30%',
      height:'70%',
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 5,
    },
    last3StepsBotBox: {
      flex: 0.5
    },
    last3stepsContinueBox: {
      flex: 0.2,
      width: '95%',
      borderRadius: 30,
      backgroundColor: palette.darkBlue,
      justifyContent: 'center',
      alignItems: 'center'
    },
    last3StepsSkipBox: {
      flex: 0.3,
      width: '95%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    last3StepsSkip: {
      backgroundColor: palette.darkBlue,
      height: 45,
      width: 100,
      alignItems: 'center',
      borderRadius: 30,
      padding: 10,
    },
    last3StepsBotSkipText: {
      width: '60%',
      color: palette.darkBlue,
    },
    last3StepsBoxBorder: {
      borderWidth: 4,
      borderColor: palette.lightBlue
    },
    moreInfoLine: {
      flexDirection: 'row',
      margin: 5,
      paddingTop: 15,
      alignItems: 'center',
    },
    questionMarkIcon: {
      marginLeft: 5,
      fontSize: 15,
      color: palette.darkBlue
    },
    infoText: {
      width: 300,
      fontSize: 25,
      textAlign: 'left'
    }
  });
  
  export default styles;