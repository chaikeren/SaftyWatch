//import liraries
import React, { Component, useEffect, useState } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, PermissionsAndroid, TouchableOpacity, Alert, Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Feather, FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage       from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';




const LOCKED_CONTACTS_KEY = 'lockedContactsToShare';
const GOOGLE_PLACES_API_KEY = 'AIzaSyASlpr3b29YDWZDRODQ5aCZJsfZ6UgPPH4'; // never save your real api key in a snack!

// create a component
export default function ShareLocation({navigation, route}) {

  const [locationPremission, setLocationPremission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({latitude: 32.3003483, longitude: 34.880522});
  const [destination, setDestination] = useState();
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [shareWith, setShareWith] = useState([]);
  const [lockedEmergencyContacts, setLockedEmergencyContacts] = useState([]);

  //! NEED TO THINK HOW TO SHOW THE LOCKS WHEN I SHOW CONTACTS LIST

  const getLocationPremission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        setLocationPremission(true);
      } else {
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const getLockedEmergencyContacts = async () => {
    const contacts = await AsyncStorage.getItem(LOCKED_CONTACTS_KEY);
    if(contacts != null){
      //console.log(JSON.parse(contacts));
      setLockedEmergencyContacts(JSON.parse(contacts));
    }
  }

  const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
  };

  const addContactToShareLocation = (contact) => {
    const found = shareWith.find((emergencyContact) => emergencyContact == contact);
    if(found){
      const updatedContacts = shareWith.filter((eContact) => eContact != contact);
      setShareWith(updatedContacts);
    } else{
      setShareWith([...shareWith, contact]);
    }
  };

  const addContactToLockedContacts = (contact) => {
    const found = lockedEmergencyContacts.find((emergencyContact) => emergencyContact == contact);
    if(found){
      const updatedContacts = lockedEmergencyContacts.filter((eContact) => eContact != contact);
      setLockedEmergencyContacts(updatedContacts);
      AsyncStorage.setItem(LOCKED_CONTACTS_KEY, JSON.stringify(updatedContacts));
    } else{
      setLockedEmergencyContacts([...lockedEmergencyContacts, contact]);
      AsyncStorage.setItem(LOCKED_CONTACTS_KEY, JSON.stringify(lockedEmergencyContacts));
    }
  };

  const EmergencyContacts = () => {
    const contacts = emergencyContacts.map((contact, key) => 
    <TouchableOpacity 
      style={[styles.shareLocationContactBox,
              key==emergencyContacts.length-1
              ? styles.contactImageBorderRadius
              : null]}
      onPress={() => addContactToShareLocation(contact)}
      onLongPress={() => addContactToLockedContacts(contact)}
      key={key}>
      <Image
        style={[styles.contactImage,
                shareWith.find((item) => item === contact) != null 
                ? {borderColor: '#E63946'} 
                : {borderColor: '#1D3557'}]}
        source={require('../assets/boarding1.png')}
      />
    {lockedEmergencyContacts.find((emergencyContact) => emergencyContact == contact) != null
     && <FontAwesome style={styles.shareLocationContactLock} name="lock"/>}
    </TouchableOpacity>
    );

    return (
      <View style={styles.shareLocationContactsView}>
        {contacts}
      </View>
    )
  };

  const handleContactsDropdown = () => {
    if(emergencyContacts.length > 0){
      setShowContacts(!showContacts);
    } else {
      Alert.alert(  
        'No contacts',  
        'It seems you dont have emergency-contacts \nif you want to add some press ADD',  
        [  
          {  
            text: 'Cancel',  
            onPress: () => console.log('Cancel Pressed'),  
            style: 'cancel',  
          },  
          {text: 'Add', onPress: () => console.log('OK Pressed')},  
        ]  
      );  
    }
  };
  useEffect(() => {
    if(route.params?.contacts){
      setEmergencyContacts(route.params.contacts);
    }
  }, [route.params]);

  useEffect(() => {
    getCurrentLocation();
    getLockedEmergencyContacts();
  }, []);

  useEffect(() => {
    //console.log(lockedEmergencyContacts);
  }, [lockedEmergencyContacts])


  return (
    <View style={styles.container}>
      <View style={styles.placesAutocomplete}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="true" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // console.log(data);
            console.log(details['geometry']['location']);
            setDestination({latitude: details['geometry']['location']['lat'], 
                            longitude: details['geometry']['location']['lng']});
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_PLACES_API_KEY,
            language: 'en', // language of the results
            types: 'address', // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[homePlace, workPlace]}
          debounce={200}
        />
      </View>
      <MapView 
        mapPadding={{ top: 650, right: 0, bottom: 0, left: 0 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0035,
          longitudeDelta: 0.0035,
        }}
        provider="google"
        toolbarEnabled={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}>
        <MapViewDirections
          origin={currentLocation}
          destination={destination}
          apikey={GOOGLE_PLACES_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
        <Marker 
          coordinate={currentLocation}/>
        <Marker 
          coordinate={destination}/>
      </MapView>
      <View style={styles.shareLocationBurgerView}>
        <TouchableOpacity 
          style={[styles.shareLocationBurger, 
                  showContacts 
                  ? {borderTopEndRadius: 10} 
                  : {borderRadius: 10}]
                }
          onPress={() => handleContactsDropdown()}>
            <Feather 
              name="plus" 
              style={[styles.shareLocationBurgerIcon,
                      showContacts ? styles.burgerIconRotate : null]}/>
        </TouchableOpacity>
        {showContacts && <EmergencyContacts/>}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#2c3e50',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 30,
  },
  placesAutocomplete: {
    flex: 1,
    width: 330,
    // height: 250,
    zIndex: 1,
    margin: 15,
    position: 'absolute',
    elevation: 2,
    borderRadius: 50,
    top: 10,
  },
  shareLocationBurgerView: {
    flex: 1,
    width: 60,
    height: 400,
    backgroundColor: 'transparent',
    //backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 10,
    top: '10%',
    right: 0,
    margin: 15,
  },
  shareLocationBurger: {
    flex: 0.15,
    backgroundColor: '#fff',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  shareLocationContactBox: {
    backgroundColor: '#fff',
    width: 60, 
    height: 60, 
    flex: 0.2, 
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    flexDirection: 'row'
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
  }, 
  contactImageBorderRadius: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  shareLocationBurgerIcon: {
    fontSize: 50,
    color: '#1D3557'
  },
  burgerIconRotate: {
    transform: [
      {rotate: '45deg'}
    ],
  },
  shareLocationContactsView: {
    flex: 1,
  },
  shareLocationContactLock: {
    position: 'absolute',
    top: 40,
    left: 40,
    fontSize: 20,
    color: '#2D89F7'
  },
});

//make this component available to the app
