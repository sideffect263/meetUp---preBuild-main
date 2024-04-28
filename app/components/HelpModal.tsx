import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';



const HelpModal = ({props}: {props: any} ) => {

  const setIsVisible = props.setHelpModalVisible;
  const isVisible = props.helpModalIsVisible;


    const closeModal = () => {
      console.log("close");
      setIsVisible(false);
      
    }
  return (
    
      <Modal
        animationType="fade"
        onLayout={()=>console.log("layout")}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsVisible(!isVisible);
        }}>



        <View style={styles.centeredView}>{/*this is the container for the modal*/}
          <View style={styles.modalView}>{/*this is the container for the modal*/}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}>
                
             <Image 
              source={require('../../assets/icons/close_icon.png')}
              style={styles.buttonCloseImage}
              />
              


            </Pressable>

            <View style={styles.modalContent}>

              

              </View>

          </View>
        </View>
      </Modal>
      );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    height:'100%',
    width:'100%',
    
  },
  modalView: {
    width:'100%',
    backgroundColor:"rgba(0,0,0,0.5)",
    height:'100%',

  },

  modalContent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
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
    borderRadius: 100,
    width: 50,  
    height: 50,
    marginTop: 100,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default HelpModal;