import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from 'expo-router';


const UserSignModal = ({props}: {props: any} ) => {

  const navigation = useNavigation();

  const isVisible = props.userSignModalIsVisible;
  const setIsVisible = props.setUserSignModalVisible;
  const location = props.location;

  const signIn = () => {
    console.log("sign in");
    console.log(location);
    setIsVisible(false);

    navigation.navigate('Login',{data:' '})
  }

    const closeModal = () => {
      console.log("close");
      console.log(location);

      setIsVisible(false);
      
    }

    const wholeModal = () => {
      console.log("whole modal");
      setIsVisible(false);
    }
  return (
    
      <Modal
        animationType="slide"
        onLayout={()=>console.log("layout")}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => { 
          Alert.alert('Modal has been closed.');
          setIsVisible(false);
        }}>



        <Pressable onPress={wholeModal} style={styles.centeredView}>{/*this is the container for the modal*/}
          <Pressable style={styles.modalView}>{/*this is the container for the modal*/}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}>
                
             <Image 
              source={require('../../assets/icons/close_icon.png')}
              style={styles.buttonCloseImage}
              />
              


            </Pressable>

            <View style={styles.modalContent}>
              <View style={styles.modal1}>
              <Text style={styles.modalText}>You are not signed in</Text>
              <Text style={styles.modalText}>Sign in to create an event</Text>
              <Text style={styles.modalText}>or sign in to join an event</Text>
              </View>

              <Pressable
                style={[styles.signInButton]}
                onPress={signIn}>
                <Text style={styles.textStyle}>Sign In</Text>
              </Pressable>
              
              

              </View>

          </Pressable>
        </Pressable>
      </Modal>
      );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    
  },
  modalView: {
    width:'100%',
    
    height:'60%',

    margin: 0,
    backgroundColor: 'white',
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

  modalContent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 50,
    padding: '5%',
  },

  modal1:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

    signInButton:{
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: '80%',

  },


  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    top: -70,
    borderRadius: 100,
  },

  buttonCloseImage:{
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 25,
  },
  modalText: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default UserSignModal;