import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,useWindowDimensions,  StyleSheet, ImageBackground,ScrollView, SafeAreaView, StatusBar, Pressable } from 'react-native';
import EventPicker from './components/EventPicker';

const statusBarHeight =StatusBar.currentHeight

const moodData = [
    {
        title: 'Happy',
        pic:require('../assets/icons/affection_icon.png'),
        color:'#FCBFB7'
    },

    {
        title:'flooded',
        pic:require('../assets/icons/talkative_icon.png'),
        color:'#929499'

    },

    {
        title:'Looking for adventure',
        pic:require('../assets/icons/searching_for_icon.png'),
        color:'#A69888',
    },

]




const ActivitySet = ({route}: {route: any},{navigation}:{navigation:any}) => {
    
    console.log('MoodSet Screen');


    const mapNavigation = useNavigation();


    useEffect(() => {

        mapNavigation.setOptions({
            headerShown: false,
        });
        

    }, []);



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {height, width} = useWindowDimensions();


    const item = ({item, index}: {item: any, index: number}) => {
        return (
            <TouchableOpacity 
            style={{
                borderWidth: 2,
                marginHorizontal: 10,
                height: 270,
                borderRadius: 20,
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: item.color,
            }}>
                <View style={{borderWidth:0, height:120, width:120,marginBottom:'20%'}}>
                    <ImageBackground source={item.pic} style={styles.image}>
                    </ImageBackground>
                </View>
                <Text style={{
                       fontSize: 22,
                       color: '#000100',
                       marginBottom: '4%',
                }}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    const backPressed = () => {
        console.log('Back Pressed');
        mapNavigation.goBack();
    }
    
    const nextScreen = () => {
        console.log('Next Pressed');
        mapNavigation.navigate('index');
    }

      
    return (

        <View style={styles.main}>

              <View style={styles.header}>
                    <TouchableOpacity onPress={backPressed} style={styles.backButton}>
                        <Text style={styles.headerText}>חזור</Text>
                        </TouchableOpacity>
                </View>

                <View style={styles.body}>

                    <View style={styles.navSlider}>

                          <View style={styles.navBox2}>

                            </View>


                      
                        <View style={styles.navBox2}>

                            </View>

                        <View style={styles.navBox1}>

                            </View>                          

                    </View>

                    <View style={styles.helloConti}>

                        <Text style={styles.helloText}>באיזו פעילות חברתית אתה מעוניין?</Text>

                        </View>

                        <View style={styles.moodImgSelectorConti}>

                            <EventPicker/>
                          
    
                        </View>

                        <View style={styles.moodButtons}>

                            <TouchableOpacity onPress={()=> nextScreen()} style={styles.skipButton}>
                                <Text style={styles.whiteText}>דלג</Text>
                            </TouchableOpacity>

                            <Pressable onPress={()=> nextScreen()} style={styles.nextButton}>
                                <Text style={styles.blackText}>הבא</Text>
                                </Pressable>

                            </View>

                </View>

            </View>
  
    );
};

const styles = StyleSheet.create({
  
        main:{
            flex:1,
            backgroundColor:'#B3B5BB'
        },

        item:{
             borderWidth: 2,
             marginHorizontal: 10,
             height: 250,
        },
        header: {
            flex: 1,
            width: '100%',
            marginTop:'15%',
            display: 'flex',
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
            
            
        },

        headerText:{
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 10,
            height: 50,
            width: 100,
        },

        backButton:{
            height: 50,
            width: 100,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginLeft: '10%',
            borderRadius: 40,
            backgroundColor: 'transparent',
        },

        body:{
            flex: 13,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            alignSelf: 'center',
            borderColor:'lightyellow',
            borderRadius: 40, 
            marginBottom: '5%',
        },

        navSlider:{
            flex: 0.5,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

        navBox1:{
            flex: 1,

            borderWidth: 2,
            backgroundColor: 'white',
            borderColor: 'white',
            marginHorizontal: 10,
            borderRadius: 40,

        },

        navBox2:{
            borderRadius: 40,
            flex: 1,
            marginHorizontal: 10,
            borderWidth: 2,
            backgroundColor: 'gray',
            borderColor: 'gray',
        },

        helloConti:{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

        helloText:{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#000100',
        },

        carouselConti:{
            alignItems: 'center',
    
        },

        moodImgSelectorConti:{
            flex: 5,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

        skipButton:{
            flex: 1,
            width: '75%',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            borderRadius: 40,
            marginVertical: 15,
            backgroundColor: 'black',
            borderColor: 'white',
        },

        nextButton:{
            flex: 1,
            width: '75%',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            borderRadius: 40,
            marginVertical: 15,
            backgroundColor: 'white',
        },

        image:{
            height: 120,
            width: 120,
            overflow: 'hidden',
            backgroundColor: 'transparent',
            resizeMode: 'contain',
        },
        moodButtons:{
            flex: 2,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

        blackText:{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
        },

        whiteText:{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        },
});

export default ActivitySet;


