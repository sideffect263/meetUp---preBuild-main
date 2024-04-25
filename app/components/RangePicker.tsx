import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const gradients = [
  ['rgba(55, 75, 68, 0.3)', 'rgba(142, 237, 193, 0.3)'], // Clear minded gradient (translucent)
  ['rgba(243, 156, 18, 0.3)', 'rgba(253, 179, 20, 0.3)'], // Busy gradient (translucent)
];

const RangePicker: React.FC = () => {
  const [value, setValue] = useState(50);
  const [xIndex, setxIndex] = useState(0);

  const handleSlide = (newValue: number) => {
    setValue(newValue);
    setxIndex(Math.round(newValue / 100));
  };

  const getStateOfMindText = (value: number) => {
    return value <= 50 ? 'Clear Minded' : 'Busy';
  };

  const getBackgroundColor = (value: number) => {
    const index = Math.round(value / 100);
    const startColor = gradients[index][0];
    const endColor = gradients[index][1];
    const opacity = (value / 100).toFixed(2); // Get opacity between 0 and 1

    // Linear interpolation for color values (adjust weights if needed)
    const red = Math.round(
      (parseFloat(startColor.slice(5, 7)) * (1 - opacity) +
        parseFloat(endColor.slice(5, 7)) * opacity)
    );
    const green = Math.round(
      (parseFloat(startColor.slice(10, 12)) * (1 - opacity) +
        parseFloat(endColor.slice(10, 12)) * opacity)
    );
    const blue = Math.round(
      (parseFloat(startColor.slice(14, 16)) * (1 - opacity) +
        parseFloat(endColor.slice(14, 16)) * opacity)
    );

    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, { backgroundColor: getBackgroundColor(value) }]}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          
          minimumValue={0}
          maximumValue={100}
          value={value}
          onValueChange={handleSlide}
          thumbTintColor={'white'} // White thumb
          thumbImage={require('../../assets/icons/line_icon.png')} // Custom thumb image
          
        />

        <View style={styles.leftColor}>

        </View>

        <View style={styles.rightColor}>

          </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10, // Rounded corners
  },
  labelText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff', // White text for better contrast
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    backgroundColor: 'transparent', // Track color
    borderRadius: 5,
    zIndex: -1,
    resizeMode: 'contain',
    
  },

  rightColor: {
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(253, 179, 20, 1)',
  },
  leftColor: {
    position: 'absolute',
    zIndex: 1,
    width: 10,
    top: 0,
    left: 0,
    height: "100%",
    borderRadius: 5,
    backgroundColor: 'rgba(55, 75, 68, 1)',
  },
  valueText: {
    fontSize: 16,
    color: '#fff', // White text for better contrast
  },
});

export default RangePicker;
