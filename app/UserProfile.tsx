import { View, Text, StyleSheet, ScrollView, Image,ImageBackground ,TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity,StatusBar,FlatList, Platform, Modal, Alert, Pressable,TextInput } from 'react-native'
import React, {useRef, useEffect, useState} from 'react';
import { Link, useNavigation, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import ExpandableComponent from './components/ExpandableComponent';
import axios from 'axios';



const initialEventsData = [{
  image:'',
  name:'',
  date:'',
  location:'',
},
{
  image:'',
  name:'',
  date:'',
  location:'',
},
]


const statusBarHeight =StatusBar.currentHeight
// i want to present the user data on this page
const UserProfile = ({route}: {route: any}) => {
    const mapNavigation = useNavigation();


    const [token, setToken] = useState(route.params.token);
    const [userName, setUserName] = useState(route.params.userName);
    const logout = () => {
        console.log("logout");


    }


    const deleteToken = async () => {
        console.log("delete token");
        
        try {
            await AsyncStorage.removeItem('meetUpToken').then(() => {
            mapNavigation.navigate('index' ,{token: undefined})
            console.log('token deleted')
            });
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    }



    const contactsPressed = () =>{
        console.log("contacts pressed")
        mapNavigation.navigate('components/ContactsPage',{token: token, userName: userName});
  
      }
  
      const profilePressed = () => {
        console.log("profile PRESSED")
  
        mapNavigation.navigate('UserProfile',{token: token, userName: userName});
      }
  
      const mapPressed = () =>{
        console.log('map pressed')
        mapNavigation.navigate('index',{token: token, userName: userName});
  
      }

      const settingPressed = () => {
        console.log("setting pressed")
        mapNavigation.navigate('Setting',{token: token, userName: userName});
      }

      const [modalVisible, setModalVisible] = useState(false);

      const [userNewName, setUserNewName] = useState('');
      const [password, setPassword] = useState('');
      const [userDescription, setUserDescription] = useState('');
      const [userImage, setUserImage] = useState(require('../assets/icons/profile_image.png'));

      
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
      setUserImage({uri: result.assets[0].uri});
      
    }
  };




    useEffect(() => {
      


        mapNavigation.setOptions({
  
          header : () => (
            <View style={styles.profileButtons}> 
            <TouchableOpacity onPress={profilePressed} style={[styles.highlightedButton]}>
           <View style={styles.profileButtonImg}>
           <Image source={require('../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
           </View>
           </TouchableOpacity>
          
           <TouchableOpacity onPress={mapPressed} style={styles.profileButton}>
           <View style={[styles.profileButtonImg]}>
           <Image source={require('../assets/icons/map_icon.png')} style={styles.highButtonImg}/>
           </View>
           </TouchableOpacity>
            
             <TouchableOpacity onPress={contactsPressed} style={styles.profileButton}>
           <View style={[styles.profileButtonImg]}>
           <Image source={require('../assets/icons/conversation_icon.png')} style={styles.highButtonImg}/>
           </View>
           </TouchableOpacity>
           </View>
          ),

          
        Animation: 'slide_from_left',

        });
      }
      , []);
      

      const editProfilePressed = () => {
        console.log("edit profile pressed");
        setModalVisible(true);
      }
      const loginSession = () => {
        console.log("registraion session");
        const formData = new FormData();
        const imageData = {
          uri: image.assets[0].uri,
          name:image.assets[0].uri.split('/').pop(),
          type: image.assets[0].type,
        }
        const blobData = new Blob([imageData.uri], { type: imageData.type });
        formData.append('photo', blobData, imageData.name);
        console.log(formData);
        axios.post('https://1kmxtph7-5000.euw.devtunnels.ms/users/register', {
          name:"alolo",
          email:"username4@gamil.com",
          password:"12345",
          phone:'000000000',
          description:"Hey ! i'm here to meet new people and have fun",
          date_of_birth:'2000-01-01',
          lat:50.8503,
          alt:4.3517,
          photo:formData,

            
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            
        })
        .then(function (response) {
            console.log("response");
            console.log(response.data);
            console.log(response.data['access_token']);
    
    
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
        
    
      }
      const saveChanges = () => {
        console.log("save changes");
        loginSession()
        setModalVisible(false);
      }


      useEffect   (() => {
        console.log("user profile page")
        console.log(token)
        console.log(userName)
      }
      , []);

      
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContiConti} style={styles.scrollConti}>
      <Modal
        animationType="fade"
        
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView style={styles.centeredView}>
          <Pressable style={styles.modalBackCloser} onPress={() => setModalVisible(!modalVisible)}>
            </Pressable>
          <Pressable style={styles.modalView}>
            <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollConti} style={styles.scrollConti}>

            {/** this is the modal of edit user profile */}

          
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.innerModal}>

                  <View style={styles.profileImageChange}>
                        <ImageBackground source={userImage} style={styles.image}>

                        <Pressable onPress={pickImage} style={styles.profileImageChangeButton}>
                          <Image source={require('../assets/icons/change_photo_icon.png')} style={styles.image}></Image>
                        </Pressable>


                        </ImageBackground>
                 </View>              

              <TextInput
                style={styles.input}
                textAlign='right'
                
                placeholder="שם"
                placeholderTextColor="black"
                selectionColor={'lightgreen'}
                onChangeText={(text) => setUserNewName(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="סיסמא"
                textAlign='right'
                textAlignVertical='center'
                placeholderTextColor="black"
                onChangeText={(text) => setPassword(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="תיאור"
                textAlign='right'
                textAlignVertical='center'
                placeholderTextColor="black"
                onChangeText={(text) => setPassword(text)}/>


            <Pressable style={styles.saveChangesButton} onPress={saveChanges}>
                <Text style={styles.text}>שמור</Text>
              </Pressable>


              </View>
              </TouchableWithoutFeedback>


      


            </ScrollView>

          </Pressable>
        </SafeAreaView>
      </Modal>
      
      <View style={styles.box1}>
        <View style={styles.profileImage}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.image}>
            </Image>
        </View>

        <View style={styles.infoContainer}>
            <View style={styles.userName}>
                <Text style={styles.UserProfileText}>{userName}</Text>
                <Text style={styles.textAge}>  25</Text>
                </View>

            <View style={styles.descreption}>
                <Text style={styles.text}>descreption</Text>
                </View>
        </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.textLine}>
            <TouchableOpacity style={styles.textR}>
            <Text style={styles.textC}>כל האירועים +</Text>
            </TouchableOpacity>
            <View style={styles.textL}>
            <Text style={styles.textReg}>האירועים שלך</Text>
            </View>
          </View>
          <View style={styles.eventsConti}>

            <ExpandableComponent/>

            </View>

            <View style={styles.userButtons}>
                <TouchableOpacity style={styles.button} onPress={editProfilePressed}>
                    <Text style={styles.text}>Edit profile</Text>
                    <Image source={require('../assets/icons/plus_icon.png')} style={styles.image}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={settingPressed} style={styles.button}>
                    <Text style={styles.text}>Setting</Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={deleteToken} style={styles.button}>
                    <Text style={styles.text}>log out</Text>
                </TouchableOpacity>
           </View>


        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {

      
      flex: 1,
      marginTop: 110,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 9,
      elevation: 10,  
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    profileImage: {
        flex: 3,
        marginTop: '5%',
        flexDirection: 'column',
        top:'-20%',
        width:'40%',
        borderRadius:20,
        backgroundColor:'#FFCAB1'
    },
    profileImageChange: {
        height:130,
         width:130,
         marginBottom: '25%',
        borderRadius:20,
        backgroundColor:'lightblue',
    },
    profileImageChangeButton: {
      height: 60,
      width: 60,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: 'black',
      left: '70%',	
      top: '70%',
      backgroundColor: 'white',

    },
    innerModal:{
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: 'transparent',
    },


    editName: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
    },

    input: {
        width: '50%',
        height: 65,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        marginVertical: '5%',
        textAlign: 'center',
        fontSize: 18,
        padding: 15,
    },

    saveChangesButton:{
        width: '30%',
        height: 50,
        backgroundColor: 'lightblue',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '5%',
    },



    flatConti:{
      flex: 4,
      width: '100%',
      height: '100%',
      borderWidth: 1,
    },
    eventsConti:{
      flex:4,
      marginTop: '5%',
      width: '78%',
      flexDirection: 'row',
      borderWidth: 1,
    },

    event1:{
      flex: 1,
      borderRadius: 15,
      borderWidth: 1,
      height: '100%',
      marginRight: '4%',
    },

    event2:{
      flex: 1,
      borderRadius: 15,
      borderWidth: 1,
      height: '100%',
      marginLeft: '4%',
    },
    userButtons: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '10%',
    },
    itemEvent:{
      flex: 1,
      borderRadius: 5,
      borderWidth: 1,
      height: '100%',
    },
    userName: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '40%',
    },
    textAge: {
        color: 'white',
        fontSize: 24,
    },

    descreption: {
        width: '100%',
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center',
       },

    button:{
      flex: 1,
      borderWidth: 0.75,
      width: '80%',
      borderRadius: 20,
      marginVertical: '2%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'center',
      borderColor:'0,0,0,0.1',
      flexDirection: 'row',
      
    },

    textLine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-around',
        width: '80%',
        height: '100%',
        marginTop: '5%',
    },

    textR: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'transparent',
    },

    textL: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'transparent',
    },

    
  profileButton:{
    flex: 1,
    height: 50,
    maxWidth: 50,
    marginHorizontal: 10,
    width: '100%',
    borderWidth: 3,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor:'black',
    
    
  },

  
  profileButtonImg:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    
    maxHeight: 50,
    
    
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
        padding: 10,
        resizeMode: 'contain',
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: "transparent",
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: 'white',
    
      },
    
      highlightedButton:{
        borderWidth: 3,
        borderColor: "green",
        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.9,
        shadowRadius: 7,
        borderRadius: 100,
    
      },

      box1:{
        flex: 2,
        marginTop: '15%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        borderRadius: 20,
        backgroundColor: '#69A2B0',
        borderWidth: 0.5,
      },
    footer:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '5%',
        
    },

    image: {
        margin:'1%',
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: "contain",

    },

    infoContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: '#000',
        fontSize: 20,
        marginLeft: '5%',
    },
    textC:{
      color:'blue',
      fontSize: 18,
      textAlign: 'left',
    },
    textReg:{
      color:'black',
      fontSize: 18,
      textAlign: 'right',
    },
    UserProfileText: {
        color: '#000',
        fontSize: 24,
    },
   
  
    centeredView: {
      flex: 8,
      alignItems: 'center',
      maxHeight: '100%',
      width: '100%',
      backgroundColor: 'transparent',      

    },
    modalBackCloser:{
      flex: 1,
      width: '100%',
      backgroundColor:'transparent',
    },
    modalView: {
      flex: 11,
      borderWidth: 1,
      height:'100%',
      width: '100%',
      backgroundColor: 'rgba(250,250,250,0.9)',
      margin: 20,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    scrollContiConti: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderColor:'white',

      flex: 1,
  },

  scrollConti: {
   flex: 1,
   width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    },
  
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },

    

    
    });



export default UserProfile