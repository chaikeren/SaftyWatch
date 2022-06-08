import React, { createContext }     from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons                     from 'react-native-vector-icons/Ionicons'
import { Platform }                 from 'react-native';

//* Screens
import HomeScreen                   from '../Pages/Home';
import SettingsScreen               from '../Pages/SettingsScreen';
import ProfileScreen                from '../Pages/ProfileScreen';
import ECScreen                     from '../Pages/ECScreen';

//* Screens name
const HomeName      =   'Home';
const ECName        =   'Contacts';
const ProfileName   =   'Profile';
const SettingsName  =   'Settings';

export const UserData = React.createContext();

const Tab = createBottomTabNavigator();

export default function Tabs({route}) {

  return (
    <UserData.Provider value={route.params}>
      <Tab.Navigator initialRouteName={HomeName} screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === ECName) {
          iconName = focused ? 'call' : 'call-outline'
        } else if (rn === ProfileName) {
          iconName = focused ? 'person-circle' : 'person-circle-outline'
        } else if (rn === HomeName) {
          iconName = focused ? 'home' : 'home-outline'
        } else if (rn === SettingsName) {
          iconName = focused ? 'settings' : 'settings-outline'
        }

        return <IonIcons name={iconName} size={size} color={color} />
      },
      tabBarStyle: {backgroundColor: Platform.OS === 'ios' ? '#A8DADC' : '#DBF4F4'} 
    })}
      tabBarOptions={{
        activeTintColor: '#1D3557',
        inactiveTintColor: 'rgba(29, 53, 87, 0.5)',
        backgroundColor: Platform.OS === 'ios' ? 'rgba(29, 53, 87, 0.5)' : '#DBF4F4',
        labelStyle: { paddingBottom: -5, fontSize: Platform.OS === 'ios' ? 15 : 10 },
        style: {
          backgroundColor: Platform.OS === 'ios' ? '#CE4418' : '#fff',
          paddingBottom: 3,
          elevation: 0,   // for Android
          shadowOffset: {
            width: 0, height: 0 // for iOS
          }
        }
      }}>

      <Tab.Screen name={HomeName} component={HomeScreen} options={{headerShown: false}}/>
      <Tab.Screen name={ECName} component={ECScreen} options={{headerShown: false}}/>
      <Tab.Screen name={ProfileName} component={ProfileScreen} options={{headerShown: false}}/>
      <Tab.Screen name={SettingsName} component={SettingsScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    </UserData.Provider>
  );
}

