import React from 'react';
import {Dimensions, View, Text, Image} from 'react-native';

const {width, height} = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <Image
      source={require('../assets/chef-app-images/splash.jpg')}
      style={{
        width,
        height,
      }}
    />
  );
};

export default SplashScreen;
