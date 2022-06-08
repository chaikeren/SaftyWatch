import AsyncStorage                         from '@react-native-async-storage/async-storage';



const URL = "http://proj2.ruppin-tech.co.il/api/";
const DAILY_VITALS = 'vitals/dailyVitals/';

export const getUserDayVitals = async () => {
  const loggedInUser = JSON.parse(await AsyncStorage.getItem('WatchMeUserCredentials'));
  const userId = loggedInUser["Item1"][0]["id"];
  try {
    let res = await fetch((URL + DAILY_VITALS + userId))
    if(res.status == 200){
      let dailyVitals = await res.json();
      return dailyVitals;
    } else {
      return null;
    }} catch (error) {
      // console.log('hello');
  }
}