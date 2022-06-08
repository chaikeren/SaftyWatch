import React                        from 'react';
import { NavigationContainer }      from '@react-navigation/native';
import { createStackNavigator }     from '@react-navigation/stack';

//* Screens
import Login              from '../Pages/Login';
import Register           from '../Pages/Register';
import Home               from '../Pages/Home';
import Tabs               from './Tabs';
import SettingsScreen     from '../Pages/SettingsScreen';
import ProfileScreen      from '../Pages/ProfileScreen';
import ECScreen           from '../Pages/ECScreen';
import BoardingScreen     from '../Pages/OnBoardingScreen';
import ChangeFieldScreen  from '../Pages/ChangeFieldScreen';
import HRMonitorScreen    from '../Pages/HRMonitorScreen';
import Last3StepsScreen   from '../Pages/Last3StepsScreen';
import SplashScreen       from '../Pages/SplashScreen';
import ShareLocation      from '../Pages/ShareLocation';

//* Screens name
const LoginName         =   'Login';
const RegisterName      =   'Register';
const HomeName          =   'Home';
const TabsName          =   'Tabs';
const ECName            =   'ECScreen';
const ProfileName       =   'ProfileScreen';
const SettingsName      =   'SettingsScreen';
const BoardingName      =   'OnBoardingScreen';
const ChangeFieldName   =   'ChangeFieldScreen';
const HrMonitorName     =   'HRMonitorScreen';
const Last3StepsName    =   'Last3StepsScreen';
const SplashName        =   'SplashScreen';
const ShareLocationName =    'ShareLocation';


const MainContainerStack = createStackNavigator();


export default function MainContainer() {

  return (
  <NavigationContainer theme={MyTheme}>
    <MainContainerStack.Navigator screenOptions={{
        //headerShown: false,
        headerTitle: ' '
      }}>
      <MainContainerStack.Screen name={SplashName}        component={SplashScreen} options={{headerShown: false}}/>
      <MainContainerStack.Screen name={BoardingName}      component={BoardingScreen} options={{headerShown: false}}/>
      <MainContainerStack.Screen name={LoginName}         component={Login} options={{gestureEnabled: false}}/>
      <MainContainerStack.Screen name={RegisterName}      component={Register} options={{headerShown: false}}/>
      <MainContainerStack.Screen name={Last3StepsName}    component={Last3StepsScreen} options={{headerTitle: '3 steps and you in'}}/>
      <MainContainerStack.Screen name={TabsName}          component={Tabs} options={{headerShown: false, gestureEnabled: false}}/>
      <MainContainerStack.Screen name={ShareLocationName} component={ShareLocation} options={{headerShown: false}}/>
      <MainContainerStack.Screen name={HomeName}          component={Home}/>
      <MainContainerStack.Screen name={ECName}            component={ECScreen}/>
      <MainContainerStack.Screen name={ProfileName}       component={ProfileScreen}/>
      <MainContainerStack.Screen name={SettingsName}      component={SettingsScreen}/>
      <MainContainerStack.Screen name={ChangeFieldName}   component={ChangeFieldScreen} options={{headerShown: false}}/>
      <MainContainerStack.Screen name={HrMonitorName}     component={HRMonitorScreen} options={{headerShown: false}}/>
    </MainContainerStack.Navigator>
  </NavigationContainer>
  )
}

const MyTheme = {
  colors: {
    background: Platform.OS === 'ios' ? 'rgba(241, 250, 236, 0.9)' : '#F8FFF6',
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
  },
};