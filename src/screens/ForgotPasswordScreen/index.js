import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../../assets/Colors';
import CustomInput from '../../components/CustomInput';
import { showErrorAlert } from '../../Services/Alert';
import { callApi } from '../ApiHelper/callApi';


const { width, height } = Dimensions.get('window');

//Image Resolutions
const TOP_BACKGROUND_WIDTH = 375;
const TOP_BACKGROUND_HEIGHT = 193;
const TOP_BACKGROUND_RATIO = width / TOP_BACKGROUND_WIDTH;

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateEmail: 'abc@abc.com',
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
  resetPassword = async () => {
    if (this.state.stateEmail.trim() == '') {
      showErrorAlert('Email is required!')
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

    const param = {
      email: this.state.stateEmail,
      user_type: 'user'
    }

    const response = await callApi('resetPassword', 'POST', param)
    console.log(response);
    if (response.status != false) {
      if (response.status == 'success') {

        showErrorAlert(response.message)

      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ', response.message)
    }
  }
  render() {
    return (
      <ImageBackground
        style={styles.mainBackground}
        source={require('../../assets/chef-app-images/forgotpassword-bg.jpeg')}>
        <View style={styles.main}>
          <KeyboardAwareScrollView>
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
                <View style={styles.navigatorContent} />
                <View style={styles.navigatorContent} />
              </View>
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
              <View style={styles.forgotPasswordTextView}>
                <Text style={styles.forgotPasswordText}>
                  Forgot <Text style={{ color: colors.green }}>Password</Text>
                </Text>
              </View>
              <View style={styles.forgotPasswordInformationTextView}>
                <Text style={styles.forgotPasswordInformationText}>
                  To reset your
                  <Text style={{ color: colors.green }}> password</Text>, enter
                  the
                  {'\n'} email address
                </Text>
              </View>

              <View style={styles.inputView}>
                <View style={styles.inputContent}>
                  <CustomInput
                    placeholder="Email Address"
                    imgSource={require('../../assets/chef-app-images/email.png')}
                    //autoFocus={true}
                    value={this.state.stateEmail}
                    onChangeText={(text) => this.setState({ stateEmail: text })}
                  />
                </View>
              </View>
              <View style={{ marginTop: 20, marginRight: 40, }}>
                <TouchableOpacity style={[styles.registerButton, { borderTopRightRadius: 30, borderBottomRightRadius: 30 }]} onPress={() => this.resetPassword()}>
                  <Text style={styles.registerText}>Send Password</Text>
                  <Image
                    source={require('../../assets/chef-app-images/sign-in-btn-arrow.png')}
                    style={styles.registerImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

            </View>
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
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
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.green,
    justifyContent: 'center',
  },
  registerImage: {
    width: hp('5%'),
    height: hp('5%'),
    marginLeft: 10,
  },
  registerText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('3%'),
    color: colors.white,
    ...(Platform.OS === 'ios' ? { lineHeight: hp('3.5%') } : null),
  },
  imageContainer: {
    height: '85%',
    width: 'auto',
  },
  content: {
    flex: 1,
  },
  forgotPasswordText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('4%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('5%') } : null),
  },
  forgotPasswordInformationTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  forgotPasswordInformationText: {
    textAlign: 'center',
    fontFamily: 'futurastd-medium',
    fontSize: hp('1.9%'),
  },
  forgotPasswordTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  inputView: {
    flex: 1,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputContent: {
    backgroundColor: colors.white,
    width: '90%',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    marginTop: 10,
    padding: 10,
  },
  bottomGreen: {
    padding: hp('4%'),
    backgroundColor: colors.green,
  },
  navigator: {
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
    flex: 1,
    alignSelf: 'stretch',
  },
  navigatorContent: {
    flex: 1,
  },
});
