import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CheckBox} from 'react-native-elements';

import colors from '../../assets/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FoodName from '../../components/FoodName';

export default class PlaceOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemChecked: false,
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Place Order',
      headerTitleStyle: {
        fontFamily: 'futurastd-medium',
        color: colors.white,
        alignSelf: 'center',
      },
      headerStyle: {
        backgroundColor: colors.green,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.openDrawer()}
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingRight: 10,
          }}>
          <Image
            source={require('../../assets/chef-app-images/menu.png')}
            resizeMode="contain"
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../assets/chef-app-images/arrow.png')}
            resizeMode="contain"
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
      ),
    });
  }
  render() {
    const {itemChecked} = this.state;
    return (
      <View style={styles.main}>
        <View style={[styles.itemContent, {flex: 0}]}>
          <Text style={styles.itemText}>5 items</Text>
          <View style={styles.imageGalleryContent}>
            <CheckBox
              containerStyle={styles.checkBox}
              checked={itemChecked}
              checkedColor={colors.green}
              onPress={() =>
                this.setState({
                  itemChecked: !this.state.itemChecked,
                })
              }
            />
            <View style={styles.imageGalleryView}>
              <Image
                style={styles.image}
                source={require('../../assets/chef-app-images/pancakes.jpg')}
              />
              <Image
                style={styles.image}
                source={require('../../assets/chef-app-images/pasta.jpeg')}
              />
              <Image
                style={styles.image}
                source={require('../../assets/chef-app-images/veggie-pizza.jpg')}
              />
              <Image
                style={styles.image}
                source={require('../../assets/chef-app-images/fish.jpg')}
              />
              <Image
                style={styles.image}
                source={require('../../assets/chef-app-images/steak.jpg')}
              />
            </View>
          </View>
        </View>
        <View style={[styles.itemContent, {flex: 0.5}]}>
          <View style={styles.paymentDetailView}>
            <View style={styles.paymentDetailTextView}>
              <Text style={styles.paymentDetailText}>Subtotal</Text>
              <Text style={styles.paymentDetailText}>$40.15</Text>
            </View>
            <View style={styles.paymentDetailTextView}>
              <Text style={styles.paymentDetailText}>Delivery</Text>
              <Text style={styles.paymentDetailText}>Free</Text>
            </View>
            <View style={styles.paymentDetailTextView}>
              <Text style={[styles.paymentDetailText, {color: colors.black}]}>
                Total
              </Text>
              <Text style={[styles.paymentDetailText, {color: colors.black}]}>
                $43.16
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContent}>
          <View style={styles.receiveTypeView}>
            <TouchableOpacity style={styles.deliveryButton}>
              <Text style={styles.buttonText}>Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickUpButton}>
              <Text style={styles.buttonText}>Pick Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chefTipView}>
            <View style={styles.chefTipTop}>
              <View style={styles.chefTipLeft}>
                <Text style={styles.chefTipText}>Home Chef Tip</Text>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeText}>CHANGE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.chefTipRight}>
                <Text
                  style={[
                    styles.chefTipRightText,
                    {color: colors.softText, marginRight: 10},
                  ]}>
                  (5.0%)
                </Text>
                <Text style={styles.chefTipRightText}>$2.01</Text>
              </View>
            </View>
            <View style={styles.chefTipMainTextView}>
              <Text style={styles.chefTipMainText}>
                Want to recognize your delivery person's efforts?
              </Text>
              <Text style={styles.chefTipMainText}>
                Consider a larger tip as a thank you-100% of the tip goes to
                them.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Payment')}>
            <Text style={styles.placeOrderbuttonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 5,
    marginTop: 30,
  },
  buttonContent: {
    justifyContent: 'center',
    padding: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.borderGrey,
  },
  button: {
    backgroundColor: colors.black,
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('2.5'),
    borderRadius: 5,
  },
  placeOrderbuttonText: {
    fontFamily: 'futurastd-medium',
    color: colors.white,
    fontSize: wp('5%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3%')} : null),
  },
  chefTipMainText: {
    fontSize: hp('2%'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? {lineHeight: hp('2.5%')} : null),
    color: colors.softText,
  },
  chefTipMainTextView: {
    marginTop: 10,
  },
  chefTipRightText: {
    fontSize: hp('2.5%'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3%')} : null),
  },
  chefTipRight: {
    flexDirection: 'row',
  },
  changeText: {
    fontSize: hp('1.5'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? {lineHeight: hp('2%')} : null),
    color: colors.green,
  },
  changeButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: colors.green,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  chefTipText: {
    fontSize: hp('2.5%'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3%')} : null),
  },
  chefTipLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chefTipTop: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  deliveryButton: {
    width: wp('30%'),
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  pickUpButton: {
    width: wp('30%'),
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('2%'),
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'futurastd-medium',
    fontSize: wp('4%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3%')} : null),
  },
  receiveTypeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //flex: 1,
    borderWidth: 2,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    padding: 10,
  },
  chefTipView: {
    flex: 1,
    justifyContent: 'center',
  },
  paymentDetailView: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 15,
  },
  paymentDetailTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  paymentDetailText: {
    fontFamily: 'futurastd-medium',
    color: colors.softText,
    fontSize: wp('4%'),
    minWidth: wp('15%'),
  },
  itemContent: {
    padding: 10,
    borderBottomWidth: 2,
    borderColor: colors.borderGrey,
    flex: 1,
  },
  itemText: {
    fontFamily: 'futurastd-medium',
  },
  imageGalleryContent: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageGalleryView: {
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  image: {
    width: wp('15%'),
    height: wp('15%'),
    borderWidth: 3,
    borderColor: colors.white,
  },
  checkBox: {
    padding: 0,
    margin: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingBottom: 0,
    marginBottom: 0,
    paddingVertical: 0,
    marginVertical: 0,
  },
});
