import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../assets/Colors';

const {width, height} = Dimensions.get('window');

const ViewDishesItem = (props) => {
  const {text, navigation} = props;
  return (
    <View style={styles.main}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => navigation.navigate('EditDish')}>
          <View style={[styles.imageContent, {marginRight: 15}]}>
            <Image
              source={require('../assets/chef-app-images/edit.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>

        <View style={[styles.imageContent, {backgroundColor: colors.black}]}>
          <Image
            source={require('../assets/chef-app-images/delete.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
    alignItems: 'center',
  },
  text: {
    fontSize: hp('2.3%'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? {lineHeight: hp('2.8%')} : null),
  },
  image: {
    width: hp('2.5%'),
    height: hp('2.5%'),
  },
  buttonView: {
    flexDirection: 'row',
  },
  imageContent: {
    backgroundColor: colors.green,
    width: hp('7%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewDishesItem;
