import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  Platform,
  Alert,
  Linking,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import colors from '../../assets/Colors';
import CustomInput from '../../components/CustomInput';
import { callApi } from '../ApiHelper/callApi';
import { showErrorAlert } from '../../Services/Alert';

const { width, height } = Dimensions.get('window');

//Image Resolutions
const TOP_BACKGROUND_WIDTH = 375;
const TOP_BACKGROUND_HEIGHT = 193;
const TOP_BACKGROUND_RATIO = width / TOP_BACKGROUND_WIDTH;

export default class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered_for_GST: false,
      read_aggremenet_chekbox: false,
      stateFirstName: 'user',
      stateLastName: '1',
      statePostcode: '123',
      stateAddress: 'london',
      stateMobilenumber: '12956',
      stateEmail: 'user@mail.com',
      statePassword: '123',
    };
  }
  async componentDidMount() {
    //await this._retrieveData();
    
    this.willFocusSubscription = await this.props.navigation.addListener(
      'willFocus',
      async () => {
        //await this._retrieveData();				
      });
  }

  gstAlert = () => {
    Alert.alert(
      '',
      'If you are registered for GST, please insert the GST inclusive sale price of each Dish',
      [
        {
          text: '',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  };

  Register = async () => {
    if (this.state.stateFirstName.trim() == '') {
      showErrorAlert('First Name is required!')
      return;
    }
    if (this.state.stateLastName.trim() == '') {
      showErrorAlert('Last Name is required!')
      return;
    }
    if (this.state.stateEmail.trim() == '') {
      showErrorAlert('Email ID is required!')
      return;
    }
    else {
      let email = this.state.stateEmail.trim();
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        showErrorAlert('Invalid Email ID!')
        return;
      }
    }
    if (this.state.statePassword.trim() == '') {
      showErrorAlert('Password is required!')
      return;
    }
    if (!this.state.read_aggremenet_chekbox) {
      showErrorAlert('Agreement check is required!')
      return;
    }

    const param = {
      firstname: this.state.stateFirstName,
      lastname: this.state.stateLastName,
      postcode: this.state.statePostcode,
      address: this.state.stateAddress,
      mobile: this.state.stateMobilenumber,
      email: this.state.stateEmail,
      password: this.state.statePassword,
      //registered_for_gst: (this.state.registered_for_GST) ? 1 : 0,
      user_type: 'user'
    }

    const response = await callApi('userRegistration', 'POST', param)

    if (response.status != false) {
      if (response.status == 'success') {

        showErrorAlert(response.message)

      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: '+ response.message)
    }

  }



  render() {
    const { radioButtonChecked, checked, registered_for_GST, read_aggremenet_chekbox } = this.state;
    return (
      <KeyboardAwareScrollView>
        <ImageBackground
          style={styles.mainBackground}
          source={require('../../assets/chef-app-images/registration-bg.jpeg')}>
          <View style={styles.main}>
            <ImageBackground
              source={require('../../assets/chef-app-images/top-bg.png')}
              style={styles.topBackground}>
              <View style={styles.navigator}>
                <View style={styles.navigatorContent}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      source={require('../../assets/chef-app-images/arrow.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.navigatorContent,
                    { justifyContent: 'center', alignItems: 'center' },
                  ]}>
                  <Text
                    style={styles.navigatorTopText}
                    adjustsFontSizeToFit
                    numberOfLines={1}>
                    Registration
                  </Text>
                </View>
                <View style={styles.navigatorContent} />
              </View>
              <View style={styles.imageView}>
                <Image
                  source={require('../../assets/chef-app-images/login-logo.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </ImageBackground>
            <View style={styles.content}>
              <View style={styles.inputContent}>
                <View style={styles.inputItem}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Image
                      source={require('../../assets/chef-app-images/5065892-my-profile-icon-png-327283-free-icons-library-profile-icon-png-500_500_preview.png')}
                      style={styles.inputImage}
                      resizeMode="contain"
                    />
                    <Image
                      source={require('../../assets/chef-app-images/required.png')}
                      style={{ height: hp('1%'), width: hp('1%') }}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor={colors.black}
                    value={this.state.stateFirstName}
                    onChangeText={(text) => this.setState({ stateFirstName: text })}
                  />
                </View>
                <View style={styles.inputItem}>
                  {/*<Image
                  source={require('../../assets/chef-app-images/parent-person.png')}
                  style={styles.inputImage}
                  resizeMode="contain"
				  />*/}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Image
                      source={require('../../assets/chef-app-images/parent-person.png')}
                      style={styles.inputImage}
                      resizeMode="contain"
                    />
                    <Image
                      source={require('../../assets/chef-app-images/required.png')}
                      style={{ height: hp('1%'), width: hp('1%') }}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor={colors.black}
                    value={this.state.stateLastName}
                    onChangeText={(text) => this.setState({ stateLastName: text })}
                  />
                </View>
                <View style={styles.inputItem}>
                  <Image
                    source={require('../../assets/chef-app-images/postcode.png')}
                    style={styles.inputImage}
                    resizeMode="contain"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Postcode"
                    placeholderTextColor={colors.black}
                    value={this.state.statePostcode}
                    onChangeText={(text) => this.setState({ statePostcode: text })}
                  />
                </View>
                <View style={styles.inputItem}>
                  <Image
                    source={require('../../assets/chef-app-images/location.png')}
                    style={styles.inputImage}
                    resizeMode="contain"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor={colors.black}
                    value={this.state.stateAddress}
                    onChangeText={(text) => this.setState({ stateAddress: text })}
                  />
                </View>
                <View style={styles.inputItem}>
                  <Image
                    source={require('../../assets/chef-app-images/mobile.png')}
                    style={styles.inputImage}
                    resizeMode="contain"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Mobile number"
                    placeholderTextColor={colors.black}
                    value={this.state.stateMobilenumber}
                    onChangeText={(text) => this.setState({ stateMobilenumber: text })}
                  />
                </View>
                <View style={styles.inputItem}>
                  {/*<Image
                  source={require('../../assets/chef-app-images/email.png')}
                  style={styles.inputImage}
                  resizeMode="contain"
				  />*/}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Image
                      source={require('../../assets/chef-app-images/email.png')}
                      style={styles.inputImage}
                      resizeMode="contain"
                    />
                    <Image
                      source={require('../../assets/chef-app-images/required.png')}
                      style={{ height: hp('1%'), width: hp('1%') }}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.black}
                    value={this.state.stateEmail}
                    onChangeText={(text) => this.setState({ stateEmail: text })}
                  />
                </View>
                <View style={styles.inputItem}>
                  {/*<Image
                  source={require('../../assets/chef-app-images/password.png')}
                  style={styles.inputImage}
                  resizeMode="contain"
				  />*/}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Image
                      source={require('../../assets/chef-app-images/password.png')}
                      style={styles.inputImage}
                      resizeMode="contain"
                    />
                    <Image
                      source={require('../../assets/chef-app-images/required.png')}
                      style={{ height: hp('1%'), width: hp('1%') }}
                      resizeMode="contain"
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={colors.black}
                    value={this.state.statePassword}
                    onChangeText={(text) => this.setState({ statePassword: text })}
                    secureTextEntry={true}
                  />
                </View>
                {/*<View style={styles.inputItem}>
                  <View style={styles.inputImage} />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginLeft: 10,
                      alignItems: 'center',
                    }}>
                    <Text style={styles.registeredText}>
                      Are you registered for GST?
                    </Text>
                    <View style={styles.radioButtonView}>
                      <TouchableOpacity
                        style={styles.radioButtonRow}
                        onPress={() => {
                          this.setState({
                            registered_for_GST: true,
                          });
                          this.gstAlert();
                        }}>
                        {registered_for_GST ? (
                          <View style={styles.radioButton}>
                            <View style={styles.radioButtonFilled} />
                          </View>
                        ) : (
                          <View style={styles.radioButton} />
                        )}
                        <Text style={styles.radioButtonText}>Yes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.radioButtonRow, { marginLeft: 5 }]}
                        onPress={() =>
                          this.setState({
                            registered_for_GST: false,
                          })
                        }>
                        {!registered_for_GST ? (
                          <View style={styles.radioButton}>
                            <View style={styles.radioButtonFilled} />
                          </View>
                        ) : (
                          <View style={styles.radioButton} />
                        )}
                        <Text style={styles.radioButtonText}>No</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>*/}
                <View style={[styles.inputItem, { borderBottomWidth: 0 }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <TouchableOpacity
                      onPress={() => this.setState({ read_aggremenet_chekbox: !this.state.read_aggremenet_chekbox })}>
                      <CheckBox
                        containerStyle={styles.checkBox}
                        style={styles.checboxWrapper}
                        checked={read_aggremenet_chekbox}
                        checkedColor={colors.green}
                      />
                    </TouchableOpacity>
                    <Image
                      source={require('../../assets/chef-app-images/required.png')}
                      style={{ height: hp('1%'), width: hp('1%') }}
                      resizeMode="contain"
                    />
                  </View>
                  {/*<TouchableOpacity
                  onPress={() => this.setState({checked: !this.state.checked})}>
                  <CheckBox
                    containerStyle={styles.checkBox}
                    style={styles.checboxWrapper}
                    checked={checked}
                    checkedColor={colors.green}
				/>
				</TouchableOpacity>*/}
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ checked: !this.state.checked })
                      }>
                      {Platform.OS === 'ios' ? (
                        <Text
                          style={styles.termOfCondition}
                          adjustsFontSizeToFit
                          numberOfLines={5}>
                          I have read and agree with the terms and conditions
                          available at the following{' '}
                          <TouchableOpacity onPress={() => Linking.openURL('https://app-privacy-policy-generator.firebaseapp.com/').catch((err) => console.error('An error occurred', err))}>
                            <Text style={{ color: colors.green }}>
                              link
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.termOfCondition,
                            {
                              fontSize: hp('2%'),
                            },
                          ]}>
                          I have read and agree with the terms and conditions
                          available at the following{' '}
                          <TouchableOpacity onPress={() => Linking.openURL('https://app-privacy-policy-generator.firebaseapp.com/').catch((err) => console.error('An error occurred', err))}>
                            <Text style={{ color: colors.green }}>
                              link
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={() => this.Register()}>
              <Text style={styles.registerText}>Register</Text>
              <Image
                source={require('../../assets/chef-app-images/sign-in-btn-arrow.png')}
                style={styles.registerImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.5)',
  },
  mainBackground: {
    width,
    height,
    flex: 1,
  },
  topBackground: {
    width,
    height: TOP_BACKGROUND_HEIGHT * TOP_BACKGROUND_RATIO,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageView: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  inputView: {
    justifyContent: 'center',
    flex: 1,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  checkBox: {
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingBottom: 0,
    marginBottom: 0,
    paddingVertical: 0,
    marginVertical: 0,
  },
  checboxWrapper: {
    backgroundColor: 'blue',
  },
  text: {
    fontFamily: 'futurastd-medium',
    fontSize: width / 25,
    fontWeight: 'normal',
    color: colors.black,
  },
  bottomGreen: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: width / 18,
    fontFamily: 'futurastd-medium',
    marginRight: 10,
  },
  forgotPasswordView: {
    alignItems: 'flex-end',
    padding: 10,
    paddingBottom: 30,
    fontFamily: 'futurastd-medium',
  },
  navigator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    ...ifIphoneX(
      {
        paddingTop: 20 + getStatusBarHeight(),
      },
      {
        paddingTop: 20,
      },
    ),
  },
  navigatorContent: {
    flex: 1,
  },
  navigatorTopText: {
    fontFamily: 'futurastd-medium',
    color: colors.white,
    fontSize: hp('3%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('3.5%') } : null),
  },
  inputContent: {
    backgroundColor: colors.white,
    width: '95%',
    flex: 1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  inputItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputImage: {
    width: hp('3%'),
    height: hp('3%'),
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: hp('2%'),
    margin: 0,
    padding: 0,
  },
  radioButton: {
    width: hp('2.5%'),
    height: hp('2.5%'),
    borderRadius: hp('1.25%'),
    borderColor: colors.borderGrey,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonFilled: {
    width: hp('1.5%'),
    height: hp('1.5%'),
    borderRadius: hp('0.75%'),
    backgroundColor: colors.green,
  },
  radioButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonView: { flexDirection: 'row', alignItems: 'center', marginLeft: 5 },
  radioButtonText: {
    marginLeft: 5,
    fontFamily: 'futurastd-medium',
    fontSize: wp('3.5%'),
  },
  registeredText: {
    fontFamily: 'futurastd-medium',
    fontSize: wp('3.5%'),
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.green,
    justifyContent: 'center',
  },
  registerText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('3%'),
    color: colors.white,
    ...(Platform.OS === 'ios' ? { lineHeight: hp('3.5%') } : null),
  },
  registerImage: {
    width: hp('5%'),
    height: hp('5%'),
    marginLeft: 10,
  },
  termOfCondition: {
    fontFamily: 'futurastd-medium',
  },
});
