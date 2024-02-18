import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView, SafeAreaView } from 'react-native'
import React, {useRef, useEffect, useState} from 'react';
import { Link, useNavigation, router,useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;




const data = [
    {
        name: 'Soccer',
        location: 'outdoor',
    },

    {
        name: 'Basketball',
        location: 'outdoor',
    },
     {
        name: 'Football',
        location: 'outdoor',
     },
]

data.map((item, index) => {
    console.log(item);
})


const CreateEventPage = ({route}: {route: any}) => {

    const navigation = useNavigation();

    const temp = route.params;
    console.log(temp)
    const mapNavigation = useNavigation();
    const params = useLocalSearchParams<{q?:string}>()
    console.log(params)
    const {token123} = useLocalSearchParams<{token123?:string}>()
    console.log(token123)
    
    const statusBarHeight = StatusBar.currentHeight;

    const backButtonPressed = () => {
        console.log("back button pressed");
        navigation.navigate('index', {token: '123'});
    }


    useEffect (() => {
        mapNavigation.setOptions({
            header: () => (
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={backButtonPressed} style={styles.backButton}>
                        <Text>Back</Text>
                        </TouchableOpacity>
                    </View>
            )
        });
    }, []);






  return (
    <SafeAreaView style={styles.main}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.mainTitle}>
                <Text>what activity do you want to create</Text>
            </View>



            <ScrollView 
            horizontal={true}
            style={styles.scrollViewHorizontalHobbiesCategories}
            >

            </ScrollView>


            <ScrollView 
            horizontal={true}
            style={styles.scrollViewHorizontalHobbies}
            >

            </ScrollView>



            </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    headerButtons: {
        height: 70,
        width: '100%',
        display: 'flex',
        top: statusBarHeight,
        borderWidth: 1,
        backgroundColor: 'lightblue',
    },
    backButton: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderRadius:100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
        top:statusBarHeight,
        
    },
    scrollView:{
        width: '100%',
        height: '100%',
        borderWidth: 1,
        backgroundColor: 'lightgreen',
        display: 'flex',
    },
    scrollViewHorizontalHobbiesCategories:{
        width: '100%',
        height: 100,
        borderWidth: 1,
        backgroundColor: 'lightyellow',
    },
    scrollViewHorizontalHobbies:{
        width: '100%',
        height: 100,
        borderWidth: 1,
    },
    mainTitle:{
        width: '100%',
        height: 50,
        borderWidth: 1,
        display: 'flex',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    }

})

export default CreateEventPage