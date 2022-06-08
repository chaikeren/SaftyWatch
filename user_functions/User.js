import AsyncStorage                         from '@react-native-async-storage/async-storage';


const KEYS = ['WatchMeUserCredentials', 'username'];
const URL = "your URL";
const CHECK_USER = 'users/checkUser';

const validateUserToken = async (username, token, user) => {
  try {
    let res = await fetch((URL + CHECK_USER), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        token:    token,
      })
    });
      
    if(res.status == 200){
      return user;
    } else {
      AsyncStorage.multiRemove(KEYS);
      return null;
    }} catch (error) {
      //console.log(error);
  }
};

export const checkLoggedUser = async () => {
  const loggedInUser = await AsyncStorage.getItem('WatchMeUserCredentials');
  const username = await AsyncStorage.getItem('username');

    if (loggedInUser !== null && username !== null) {

      let user = JSON.parse(loggedInUser);
      let token = user["Item1"][0]["token"];

      return validateUserToken(username, token, user);
    } 
}
