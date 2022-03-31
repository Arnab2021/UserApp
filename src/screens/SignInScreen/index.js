import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Platform,
  Alert,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import colors from '../../assets/Colors';
import CustomInput from '../../components/CustomInput';

import { showErrorAlert } from '../../Services/Alert';
import { getData, setData } from '../../Services/LocalStorage'
import {callApi} from '../ApiHelper/callApi'

const { width, height } = Dimensions.get('window');

//Image Resolutions
const TOP_BACKGROUND_WIDTH = 375;
const TOP_BACKGROUND_HEIGHT = 193;
const TOP_BACKGROUND_RATIO = width / TOP_BACKGROUND_WIDTH;

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rememberMeChecked: false,
      stateEmail: 'user@mail.com',
      statePassword: '123',

    };
  }
  async componentDidMount() {
   
  }

  signIn = async () => {
 
    if (this.state.stateEmail.trim() == '' || this.state.statePassword.trim() == '') {
      showErrorAlert('Email ID and password required!')
      return;
    }
    const rememberme = (this.state.rememberMeChecked) ? 1 : 0

    const param = {
      email: this.state.stateEmail,
      password: this.state.statePassword,
      user_type: 'user'
    }
    console.log(param);
    const response = await callApi('login', 'POST', param)
    console.log(response);
    if (response.status != false) {
      if (response.status == 'success') {
        let data = response.data[0]

        const user_id = data.user_id

        await setData('user_id', user_id)
        await setData('rememberme', rememberme.toString())

        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Root' }],
        })

      } else {
        showErrorAlert(response.message)
      }
    }else{
      showErrorAlert('Error: ',response.message)
    }
    
  }


  fblogin = async () => {

  }



  render() {
    const { rememberMeChecked } = this.state;
    return (
      <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={{flexGrow:1}} automaticallyAdjustContentInsets={ true }> 
        <ImageBackground
          style={styles.imageBackgroundMain}
          source={require('../../assets/chef-app-images/signin-bg.jpeg')}>
          <View style={styles.main}>
            <ImageBackground
              source={require('../../assets/chef-app-images/top-bg.png')}
              style={styles.topBackground}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/chef-app-images/login-logo.png')}
                  resizeMode="contain"
                  style={{
                    flex: 1,
                  }}
                />
              </View>
            </ImageBackground>
            <View style={styles.content}>
              <View style={styles.signInTextView}>
                <Text style={styles.signInText}>
                  Sign <Text style={{ color: colors.green }}>in</Text>
                </Text>
              </View>
              <View style={styles.inputView}>
                <TouchableOpacity style={styles.loginFacebookButton} onPress={() => this.fblogin()}>
                  <View style={styles.facebookIconView}>
                    <Icon name="facebook-f" style={styles.facebookIcon} />
                  </View>
                  <Text style={styles.loginFacebookText}>
                    Login with Facebook
                  </Text>
                </TouchableOpacity>
                <View style={styles.inputContent}>
                  <CustomInput
                    placeholder="Email"
                    imgSource={require('../../assets/chef-app-images/email.png')}
                    style={{
                      borderBottomWidth: 0.5,
                      borderColor: colors.borderGrey,
                    }}
                    value={this.state.stateEmail}
                    onChangeText={(text) => this.setState({ stateEmail: text })}
                  />
                  <CustomInput
                    placeholder="Password"
                    imgSource={require('../../assets/chef-app-images/password.png')}
                    value={this.state.statePassword}
                    onChangeText={(text) => this.setState({ statePassword: text })}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    rememberMeChecked: !this.state.rememberMeChecked,
                  });
                }}>
                <CheckBox
                  containerStyle={styles.checkBox}
                  textStyle={styles.text}
                  title={'Remember Me'}
                  checked={rememberMeChecked}
                  checkedColor={colors.green}
                />
              </TouchableOpacity>
              <View style={styles.buttonView}>
                <View style={styles.buttonContent}>
                  <TouchableOpacity
                    style={styles.signInButtonContent}
                    onPress={() => this.signIn()}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                    <Image
                      source={require('../../assets/chef-app-images/sign-in-btn-arrow.png')}
                      resizeMode="contain"
                      style={styles.signInArrow}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.forgotPasswordView}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Registration')
                    }>
                    <Text style={styles.forgotPasswordText}>Registration</Text>
                  </TouchableOpacity>
                  <Text> | </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ForgotPassword')
                    }>
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomGreen} />
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundMain: {
    //width,
    //height,
    flex: 1,
  },
  main: {
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255, 0.5)',
  },
  topBackground: {
    width,
    height: TOP_BACKGROUND_HEIGHT * TOP_BACKGROUND_RATIO,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    height: '85%',
    width: 'auto',
  },
  content: {
    flex: 1,
  },
  signInText: {
    fontFamily: 'futurastd-medium',
    fontSize: wp('7%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('5.5%') } : null),
  },
  signInTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    textAlign: 'center',
  },
  inputView: {
    justifyContent: 'center',
    marginTop: hp('5%'),
  },
  buttonView: {
    flex: 1,
  },
  loginFacebookButton: {
    backgroundColor: '#4267B2',
    width: '90%',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width / 8,
  },
  loginFacebookText: {
    fontSize: hp('2.2%'),
    color: colors.white,
    fontFamily: 'futurastd-medium',
    marginLeft: 10,
    ...(Platform.OS === 'ios' ? { lineHeight: hp('2.7%') } : null),
  },
  facebookIcon: {
    fontSize: hp('2.2%'),
    color: colors.white,
  },
  facebookIconView: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: hp('3%'),
    borderWidth: 1,
    borderColor: colors.white,
  },
  inputContent: {
    backgroundColor: colors.white,
    width: '90%',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    marginTop: 10,
    padding: 10,
  },
  checkBox: {
    backgroundColor: 'transparent',
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    borderWidth: 0,
    paddingLeft: 20,
  },
  text: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2%'),
    fontWeight: 'normal',
    color: colors.black,
  },
  bottomGreen: {
    backgroundColor: colors.green,
    padding: hp('5%'),
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
    fontSize: wp('6%'),
    fontFamily: 'futurastd-medium',
    marginRight: 10,
    ...(Platform.OS === 'ios' ? { lineHeight: hp('5%') } : null),
  },
  forgotPasswordView: {
    justifyContent: 'flex-end',
    padding: hp('2%'),
    paddingBottom: hp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontFamily: 'futurastd-medium',
    fontSize: wp('4%'),
    ...(Platform.OS === 'ios' ? { lineHeight: wp('4.5%') } : null),
  },
  signInArrow: {
    width: wp('8%'),
    height: wp('8%'),
  },
});
