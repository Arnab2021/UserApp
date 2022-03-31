import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import colors from '../../assets/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export default class PaymentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkPaymentMethod: 0,
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Payment',
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
    const {checkPaymentMethod} = this.state;
    return (
      <View style={styles.main}>
        <View style={styles.topTextView}>
          <Text style={styles.topText}>
            Please choose your payment option here
          </Text>
        </View>
        <View style={styles.paymenyMethodView}>
          <TouchableOpacity
            style={styles.paymentMethodPress}
            onPress={() =>
              this.setState({
                checkPaymentMethod: 0,
              })
            }>
            <View style={styles.paymentMethod}>
              <CheckBox
                containerStyle={styles.checkBox}
                checked={checkPaymentMethod === 0 ? true : false}
                checkedColor={colors.green}
              />
              <Text
                style={
                  checkPaymentMethod === 0
                    ? [styles.paymentMethodText, {color: colors.green}]
                    : [styles.paymentMethodText, {color: colors.black}]
                }>
                Debit Card
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentMethodPress}
            onPress={() =>
              this.setState({
                checkPaymentMethod: 1,
              })
            }>
            <View style={styles.paymentMethod}>
              <CheckBox
                containerStyle={styles.checkBox}
                checked={checkPaymentMethod === 1 ? true : false}
                checkedColor={colors.green}
              />
              <Text
                style={
                  checkPaymentMethod === 1
                    ? [styles.paymentMethodText, {color: colors.green}]
                    : [styles.paymentMethodText, {color: colors.black}]
                }>
                Credit Card
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentMethodPress}
            onPress={() =>
              this.setState({
                checkPaymentMethod: 2,
              })
            }>
            <View style={styles.paymentMethod}>
              <CheckBox
                containerStyle={styles.checkBox}
                checked={checkPaymentMethod === 2 ? true : false}
                checkedColor={colors.green}
              />
              <Text
                style={
                  checkPaymentMethod === 2
                    ? [styles.paymentMethodText, {color: colors.green}]
                    : [styles.paymentMethodText, {color: colors.black}]
                }>
                Paypal
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.creditCartView}>
          <View style={styles.creditCartContent}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Payment Details</Text>
            </View>
            <View style={styles.creditCartInput}>
              <View>
                <Text style={styles.cardNumberText}>Card Number</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    style={[styles.input, {flex: 1}]}
                    placeholder="Valid Card Number"
                  />
                  <View style={styles.iconView}>
                    <Icon name="creditcard" style={styles.icon} />
                  </View>
                </View>
              </View>
              <View style={styles.creditCardBottom}>
                <View style={{flex: 0.6}}>
                  <Text style={styles.cardNumberText}>Expiration Date</Text>
                  <TextInput style={styles.input} placeholder="MM/YY" />
                </View>
                <View style={{flex: 0.3}}>
                  <Text style={styles.cardNumberText}>CV Code</Text>
                  <TextInput style={styles.input} placeholder="CVC" />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContent}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  topTextView: {
    margin: 30,
  },
  topText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3%')} : null),
  },
  paymenyMethodView: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
    justifyContent: 'center',
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    flex: 0.4,
    alignItems: 'center',
  },
  paymentMethodPress: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    padding: 0,
    margin: 0,
    paddingLeft: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 0,
    marginBottom: 0,
    paddingVertical: 0,
    marginVertical: 0,
  },
  paymentMethodText: {
    fontFamily: 'futurastd-medium',
    fontSize: wp('4%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('2.7%')} : null),
  },
  creditCartView: {
    margin: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  creditCartContent: {
    // flex: 1,
    borderWidth: 1,
    margin: 10,
    borderColor: colors.softText,
    borderRadius: 5,
  },
  header: {
    backgroundColor: colors.softBackground,
    padding: 15,
  },
  headerText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3%')} : null),
    color: colors.green,
  },
  creditCartInput: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.softText,
    borderRadius: 3,
    marginTop: 7,
    //flex: 1,
    height: hp('4.5%'),
    paddingLeft: wp('3%'),
    paddingVertical: 0,
  },
  icon: {
    fontSize: hp('2.5%'),
    color: colors.softText,
  },
  iconView: {
    height: hp('4.5%'),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.softText,
    marginTop: 7,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: colors.softBackground,
  },
  cardNumberText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('2.5%')} : null),
  },
  creditCardBottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContent: {
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.black,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('3%'),
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'futurastd-medium',
    color: colors.white,
    fontSize: wp('5%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3.5%')} : null),
  },
});
