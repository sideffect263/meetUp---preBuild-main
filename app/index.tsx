import React, {useRef, useEffect, useState, useContext} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions, Pressable } from 'react-native';
import { useNavigation,useRootNavigationState, Redirect, router } from 'expo-router';
import UserProfile from './UserProfile';
import { Link } from 'expo-router';
import {StatusBar} from 'react-native'
import * as Location from 'expo-location';
import NewActModal from './components/NewActModal';
import ActivitiesModal from './components/ActivitiesModal';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserSignModal from './components/UserSignModal';
import UserContextComponent  from './context/UserContextComponent';
import loadingGif from '../assets/gif/town_loading_gif.gif';
import HelpModal from './components/HelpModal';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';





const statusBarHeight =StatusBar.currentHeight

var temparray:any = [];


const custom_map_style =[
  {
      "featureType": "all",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "color": "#585858"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "color": "#d10707"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#595050"
          },
          {
              "lightness": "-32"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "color": "#f9ddc5"
          },
          {
              "lightness": -7
          }
      ]
  },
  {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
          {
              "color": "#645c20"
          },
          {
              "lightness": 38
          }
      ]
  },
  {
      "featureType": "poi.government",
      "elementType": "all",
      "stylers": [
          {
              "color": "#9e5916"
          },
          {
              "lightness": 46
          }
      ]
  },
  {
      "featureType": "poi.medical",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#813033"
          },
          {
              "lightness": 38
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
          {
              "color": "#645c20"
          },
          {
              "lightness": 39
          }
      ]
  },
  {
      "featureType": "poi.school",
      "elementType": "all",
      "stylers": [
          {
              "color": "#a95521"
          },
          {
              "lightness": 35
          }
      ]
  },
  {
      "featureType": "poi.sports_complex",
      "elementType": "all",
      "stylers": [
          {
              "color": "#9e5916"
          },
          {
              "lightness": 32
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "color": "#813033"
          },
          {
              "lightness": 43
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "hue": "#4100ff"
          },
          {
              "saturation": "62"
          },
          {
              "lightness": "-37"
          },
          {
              "weight": "1.96"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#f19f53"
          },
          {
              "weight": 1.3
          },
          {
              "visibility": "on"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#f19f53"
          },
          {
              "lightness": -10
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "lightness": 38
          }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "all",
      "stylers": [
          {
              "color": "#813033"
          },
          {
              "lightness": 22
          }
      ]
  },
  {
      "featureType": "transit.station",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#1994bf"
          },
          {
              "saturation": -69
          },
          {
              "gamma": 0.99
          },
          {
              "lightness": 43
          }
      ]
  }
]

//region of israel


let initialRegion = {
    latitude: 31.0461,
    longitude: 34.8516,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    };


    const deviceWidth = Dimensions.get('window').width;

    const deviceHeight = Dimensions.get('window').height;


 




export default function Index({route}: {route: any}) {


  
  const temp = route.params;

  var newToken = route.params


  const [token, setToken] = useState<any>();
  const [miniLocations, setMiniLocations] = useState<any>();
  const [eventLocations, setEventLocations] = useState<any>();
  const rootNavigationState = useRootNavigationState()
  const [clickCount, setClickCount] = useState(0);
  const [tempClickCount, setTempClickCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState();

  

  const checkToken = async () => {
    console.log("check token")

    try{
      const value = await AsyncStorage.getItem('meetUpToken')
      if (value !== null){
        console.log("there is a token")
        setToken(value);
        axios.get('https://m33t.app/users/get_user_jwt', {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + token,
          }
        }).then((response) => {
          console.log("response")
          console.log(response.data)
          setUserName(response.data.name)
          setUserId(response.data._id)
        }).catch((error) => {
          console.log("error")
          console.log(error.response)
        }
        )
      }else{
         console.log("there is no token")
         setToken("")

      }
    }catch(error){
      console.log("there is no token")
      console.log(error)

    }

    console.log("end check token")
  
  }


  const [activitiesModalIsVisible, setActivitiesModalIsVisible] = useState(false);
  const [newActModalIsVisible, setNewActModalVisible] = useState(false);
  const [userSignModalIsVisible, setUserSignModalVisible] = useState(false);
  const [modalBackCloser, setModalBackCloser] = useState(false);
  const [helpModalIsVisible, setHelpModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pointPressed, setPointPressed] = useState(false);
  const [serverDataCounter, setServerDataCounter] = useState(0);

  const mapRef = useRef<any>();

  const mapNavigation = useNavigation();

  const [errorMsg, setErrorMsg] = useState<string>();
  const [location, setLocation] = useState<any>({
    latitude: 34.7563,
    longitude: 32.0567,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    });
    
    const [secLocation, setSecLocation] = useState<any>({
      latitude: 32.056913,
      longitude: 34.759983,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      });
    
  


  const props = {
    activitiesModalIsVisible: activitiesModalIsVisible,
    setActivitiesModal: setActivitiesModalIsVisible,
    newActModalIsVisible: newActModalIsVisible,
    setNewActModalVisible: setNewActModalVisible,
    userSignModalIsVisible:userSignModalIsVisible,
    setUserSignModalVisible:setUserSignModalVisible,
    helpModalIsVisible: helpModalIsVisible,
    setHelpModalVisible: setHelpModalVisible,
    userToken:token,
    setUserToken: setToken,
    userLocation: location,
    
  }
  


  
  const testC = () => {
    console.log("testC pressed");
    console.log(token);
    getAllEventsLocations();
    console.log(userName) 
    console.log(eventLocations)
    setHelpModalVisible(!helpModalIsVisible);  

   }



   useEffect(() => {//function block that updates every time the token changes or the route changes
    console.log("end res")
    checkToken();
    console.log(serverDataCounter)

  

    console.log("route")



    if(route.params==undefined){
      console.log("no username")
      setUserName("")
    }else{
    setUserName(route.params.username)
    console.log("username")
    console.log(userName)
    if(token){//only sends and receives data if the user is logged in
      if(serverDataCounter<2){//meant to slow down the data sending
            getAllUserLocation();
            getAllEventsLocations();
            setServerDataCounter(serverDataCounter+1);
      }else{
        setServerDataCounter(serverDataCounter+1);
        if(serverDataCounter>10){
          setServerDataCounter(0);
        }
      }
    }
      
    }

  }
  , [token, route, router, miniLocations]);


  
  

  

  useEffect(() => {//get user location
    
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({}).catch((err) => {
        console.log("err")
        console.log(err)
      });
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      });

      setLoading(false);


    
    })();
  }, [location]);


    const addNewEvent = () => {
      console.log("add new event");
      if(token){
        mapNavigation.navigate('CreateEventPage',{token: token, userName: userName, location: location, userId: userId});

      }else{
        setUserSignModalVisible(!userSignModalIsVisible)
      }
      
    }

    const findeMeClicked = () => () => {
      console.log("set location");
      clicking();

      console.log(token);
      mapRef.current.animateToRegion(location, 1000);      
   
      
    };



    const loginPressed = () => {
      console.log("login pressed");
      setUserSignModalVisible(!userSignModalIsVisible)
      //send the user location to the setUserSignModal
      setModalBackCloser(true);

    }

    const contactsPressed = () =>{
      console.log("contacts pressed")
      clicking();
      mapNavigation.navigate('components/ContactsPage',{token: token, userName: userName});

    }

    const profilePressed = () => {
      console.log("profile PRESSED")
      clicking();

      mapNavigation.navigate('UserProfile',{token: token, userName: userName});
    }

    const mapPressed = () =>{
      console.log('map pressed')
      clicking();

      mapNavigation.navigate('index',{token: token, userName: userName});

    }
    



    useEffect(() => {


      console.log("heade bar set");
   


    

    
      mapNavigation.setOptions({
        header : () => (
          <View style={styles.profileButtons}> 
          {!token &&
            <TouchableOpacity 
            onPress={() => loginPressed()}
             style={styles.profileButton}>

            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
          }
          {token &&
            <TouchableOpacity onPress={profilePressed} style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
          }
            <TouchableOpacity onPress={mapPressed} style={styles.profileButton}>
            <View style={[styles.profileButtonImg, styles.highlightedButton]}>
            <Image source={require('../assets/icons/map_icon.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
           
           <TouchableOpacity onPress={contactsPressed} style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/conversation_icon.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
          </View>
        ),
        
      });
    }
    , [token]);

  const getAllEventsLocations = () => {
    console.log("get all events locations")
    axios.get('https://m33t.app/events/get_all', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
      }).then((response) => {
      console.log("event location response")
      console.log(response.data)
      setEventLocations(response.data)

      }
    ).catch((error) => {
      console.log("error")
      console.log(error.response)
    }
    )


  }

  const getAllUserLocation = () =>{
    console.log("get all user location")

    axios.get('https://m33t.app/users/get_all_locations', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }

      }).then((response) => {
      console.log("all locations response")
      console.log(response.data)
      //transfer dictionary to array
      temparray = []
      for(let key in response.data){
        console.log(key)
        console.log(response.data[key])
        response.data[key].push(key)
        console.log(response.data[key])
        temparray.push(response.data[key])
      }
      console.log("temparray")
      
      console.log(temparray)

      setMiniLocations(temparray)
      console.log("mini locations")
      console.log(miniLocations)
      }
    ).catch((error) => {
      console.log("error")
      console.log(error.response)
    }
    )
    
}

const sendUserLocation = () =>{
    console.log("send user location")

    console.log(location)
    console.log(typeof(location.latitude))
    console.log(token)
    

    axios.post('https://m33t.app/users/update_user_location', {
      lat: (location.latitude),
      alt: (location.longitude),
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
      }).then((response) => {
      console.log("response")
      console.log(response.data)
    }
    ).catch((error) => {
      console.log("error")
      console.log(error.response)
    })
}

const sendServerData = () =>{
    console.log("send and get server data")
    getAllUserLocation()
    sendUserLocation()
    getAllEventsLocations()
}



    const modalPress = () => {
      console.log("modal pressed1");
      console.log(token)

    }

    const activitiesPressed = () => {
      console.log("activities pressed");
      setActivitiesModalIsVisible(true);
      clicking();

    }

    const modalBackCloserPressed = () => {
      console.log("modal back closer pressed");
      setUserSignModalVisible(false);
      setModalBackCloser(false);
    }

    const markerPressed = () => {
      console.log("marker pressed");
      setPointPressed(!pointPressed);
      console.log(pointPressed);
      clicking();
    }

    const moodSetPressed = () => {
      console.log("moodSetPressed pressed");
      clicking();
      mapNavigation.navigate('MoodSet',{token: token});
    }

    
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('meetUpToken')
    if(value !== null) {
      console.log("there is a token")
      console.log(value);
      setToken(value);
      return value;
    }
  } catch(error) {
    console.log('there is no token');
    console.log(error);
    temp.token = null;

  }
}


useEffect(() => {
  console.log("use effect")
  console.log(clickCount, tempClickCount)
  if(clickCount > tempClickCount+5){
    console.log("click count")
    if(token){//only sends and receives data if the user is logged in
      if(serverDataCounter<2){//meant to slow down the data sending
            sendServerData();
            setServerDataCounter(serverDataCounter+1);
      }else{
        setServerDataCounter(serverDataCounter+1);
        if(serverDataCounter>4){
          setServerDataCounter(0);
        }

      }
    }
    setTempClickCount(clickCount);
  }

}, [clickCount]);



const clicking = () => {
  console.log("clicking")
  setClickCount(clickCount+1);
}
    
//if the loading is true show the loading screen
    if(loading){
      return(
        <View style={styles.loadingScreen}>
          <Image source={loadingGif} style={styles.loadingScreen}/>
          <Text style={styles.LoadingText}>loading...</Text>
          
        </View>
      )
    }

  return (
    <View style={styles.container}>
      <NewActModal props={props} />
      <ActivitiesModal props={props} />
      <UserSignModal props={props} />
      <HelpModal props={props} />

      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={findeMeClicked()} style={styles.sideButtonsButton}>
          <View style={styles.sideButtonsButtonImg}>
            <Image source={require('../assets/icons/location_icon.png')} style={styles.sideButtonImg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={testC} style={styles.sideButtonsButton}>
          <View style={styles.sideButtonsButtonImg}>
            <Image source={require('../assets/icons/info_icon.png')} style={styles.sideButtonImg} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.lowerButtons}>
        <TouchableOpacity onPress={moodSetPressed} style={styles.lowerButton}>
          <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/mood_icon.png')} style={styles.imgContainer} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={addNewEvent} style={[styles.lowerButton, styles.lowerButtonMid]}>
          <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/plus_icon.png')} style={styles.imgContainer} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={activitiesPressed} style={styles.lowerButton}>
          <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/activity_icon.png')} style={styles.imgContainer} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.mapStabilizer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={location}
          customMapStyle={custom_map_style}
          ref={mapRef}
          
        >

          {eventLocations &&
            eventLocations.map((location: any) => (
              typeof(location.lat) == "number" && typeof(location.alt) == "number" && location.name && typeof(location.tag) == "object" &&
              <Marker
                coordinate={{ latitude: location.lat, longitude: location.alt }}
                title={location.name}
                description={"description"}
                onPress={markerPressed}
                key={location._id}
              >
                <Image source={location.tag.image} style={styles.markerImg} />
              </Marker>
            ))
          }

      


          {miniLocations &&
            miniLocations.map((location: any) => (
              <Marker
                coordinate={{ latitude: location[0][0], longitude: location[0][1] }}
                title={location[2]}
                description={"description"}
                onPress={markerPressed}
                key={location[2]}
              >
                <Image source={require('../assets/icons/man_icon.png')} style={styles.markerImg} />
              </Marker>
            ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingScreen:{
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  loadingGif:{
    resizeMode: 'contain',
    height: 200,
    width: 200,
  },

  LoadingText:{
    fontSize: 20,
  },

  mapStabilizer:{
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 0,
  },
  map: {
    width: '100%',
    height: '100%',
  },

  markerImg:{
    resizeMode: 'contain',
    height: 40,
    width: 40,
    zIndex: 4,
    
  },

  profileButton:{
    flex: 1,
    height: 50,
    maxWidth: 50,
    marginHorizontal: 10,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    
    
  },

  sideButtons:{
    position: 'absolute',
    bottom:200,
    width: 65,
    height: 150,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    zIndex: 1,
  },

  appFunctionality:{
    position: 'absolute',
    width: '100%',
    height: '50%',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1,
  },

  sideButtonsButton:{
    flex: 1,
    height: '100%',
    width: '80%',
    marginVertical: 15,
    borderRadius: 30,
  },

  sideButtonsButtonImg:{
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },

  lowerButtons:{
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    width: '95%',
    height: 80,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1,
    bottom: "5%",
    alignSelf: 'center',
  
  },
  lowerButton:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  sideButtonImg:{
    resizeMode: 'contain',
    height: 50,
    width: 50,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'white',
  },

  imgContainer:{
    resizeMode: 'contain',
    height: 50,
    width: 50,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lowerButtonImg:{ 
    borderWidth: 1,
    flex: 1,
    maxWidth:60,
    minWidth: 60,
    maxHeight: 60,
    minHeight: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C5D9E2',
    opacity: 1,
    //make some shadow
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 7,
  },

  lowerButtonMid:{
    top: -30,
  },

  profileButtons:{
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    height: 80,
    top: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',

  },

  highButtonImg:{
    resizeMode: 'contain',
    height: 50,
    width: 50,
    borderColor: "transparent",
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'white',

  },

  highlightedButton:{
    borderWidth: 4,
    borderRadius: 100,

    borderColor: "lightgreen",
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 7,

  },

  profileButtonImg:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },


  modalBackCloserCS:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 1,
  },


});

  function coponentDidUnmount(arg0: () => React.JSX.Element) {
    throw new Error('Function not implemented.');
  }

