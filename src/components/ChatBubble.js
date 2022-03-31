import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../assets/Colors';

const ChatBubble = (props) => {
  const {name, message, align} = props;
  if (align === 'left') {
    return (
      <View style={styles.main}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.textView}>
          <Text style={styles.contentText}>{message}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.mainRight}>
      <Text style={styles.nameTextRight}>{name}</Text>
      <View style={styles.textViewRight}>
        <Text style={styles.contentTextRight}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  mainRight: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  textView: {
    paddingLeft: 30,
    paddingRight: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: 5,
  },
  textViewRight: {
    paddingLeft: 30,
    paddingRight: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: colors.green,
    borderRadius: 5,
    marginTop: 5,
  },
  contentText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3%')} : null),
  },
  contentTextRight: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
    color: colors.white,
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3%')} : null),
  },
  nameText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.2%'),
  },
  nameTextRight: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.2%'),
    textAlign: 'right',
  },
});

export default ChatBubble;
