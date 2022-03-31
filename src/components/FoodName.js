import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Triangle from 'react-native-triangle';

import colors from '../assets/Colors';

const FoodName = (props) => {
  return (
    <View style={styles.main}>
      <Triangle
        width={hp('2%')}
        height={hp('2%')}
        color={colors.green}
        direction={'down-left'}
        style={[styles.triangle, {left: 0, bottom: 0}]}
      />
      <Triangle
        width={hp('2%')}
        height={hp('2%')}
        color={colors.green}
        direction={'up-right'}
        style={[styles.triangle, {top: 0, right: 0}]}
      />
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.black,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: colors.white,
  },
  text: {
    fontFamily: 'futurastd-medium',
    color: colors.white,
    fontSize: hp('2%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('2.5%')} : null),
  },
  triangle: {
    position: 'absolute',
  },
});

export default FoodName;
