import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import colors from '../assets/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

const CustomInput = (props) => {
  const {placeholder, style, imgSource, autoFocus} = props;
  return (
    <View style={[styles.main, style]}>
      <View style={styles.imageView}>
        <Image source={imgSource} style={styles.image} resizeMode="contain" />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.black}
        autoFocus={autoFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 5,
    marginLeft: 5,
    fontFamily: 'futurastd-medium',
    fontSize: hp('2%'),
  },
  imageView: {
    width: wp('6%'),
    height: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    height: '100%',
  },
});

export default CustomInput;
