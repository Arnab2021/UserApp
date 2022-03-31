import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import colors from '../../assets/Colors';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { getData } from '../../Services/LocalStorage';
import { showErrorAlert } from '../../Services/Alert';
import { callApi } from '../ApiHelper/callApi';

const { width, height } = Dimensions.get('window');

//Image Resolutions
const TOP_BACKGROUND_WIDTH = 375;
const TOP_BACKGROUND_HEIGHT = 193;
const TOP_BACKGROUND_RATIO = width / TOP_BACKGROUND_WIDTH;

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateImagePath: '',
      user_id: '',
      name: '',
      email: '',
      phonenumber: '',
      address: '',

    };
    this.HeaderContent()
  }
  async componentDidMount() {
    //await this._retrieveData();	  
    await this._getUserid()
    await this.getProfileDetails()
    this.willFocusSubscription = await this.props.navigation.addListener(
      'willFocus',
      async () => {
        //await this._retrieveData();				
      });
  }

  async _getUserid() {
    const user_id = await getData('user_id')
    this.setState({
      user_id: user_id
    })
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };
  HeaderContent = () => {
    return (
      <View style={styles.navigator}>
        <View style={styles.navigatorContent}>
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require('../../assets/chef-app-images/menu.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.navigatorContent]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../assets/chef-app-images/arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  async getProfileDetails() {

    const param = {
      userid: this.state.user_id,
      user_type : 'user'
    }

    this.setState({ loader: true })
    const response = await callApi('getProfile', "POST", param)
    this.setState({ loader: false })
    console.log(response);
    if (response.status != false) {
      if (response.status == 'success') {
        const data = response.data[0]
        const name = (data.first_name != null)? data.first_name : '' + ' ' + (data.last_name != null) ? data.last_name : ''
        this.setState({
          name: name,
          email: data.email,
          phonenumber: data.mobile,
          address: data.address,
          stateImagePath: data.profile_pic
        })

      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: '+ response.message)
    }

  }

  async updateProfile() {
    const { name, email, phonenumber, address } = this.state
    let fullname = name.split(" ")
    const param = {
      userid: this.state.user_id,
      firstname: fullname[0],
      lastname: fullname[1],
      email: email,
      mobile: phonenumber,
      address: address,
      user_type : 'user'
    }

    console.log(param);

    this.setState({ loader: true })
    const response = await callApi('updateProfile', 'POST', param)
    this.setState({ loader: false })
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

  async uploadImage(imageObj) {
    const formData = new FormData()
    const imagePath = imageObj.path
    const fileType = imageObj.mime
    const fileName_arr = imagePath.split('.')
    const extension = fileName_arr[fileName_arr.length - 1]
    const fileName = fileName_arr[0]

    formData.append('image', {
      uri: imagePath,
      name: `${this.state.user_id}` + '-' + Math.random() + '.' + `${extension}`,
      type: "image/" + `${extension}`
    })

    formData.append('userid', this.state.user_id)

    console.log(formData._parts[0]);

    
    this.setState({ loader: true })
    const response = await callApi('uploadUserImage', 'FILE_UPLOAD', formData)
    this.setState({ loader: false })

    console.log(response);

    if (response.status != false) {
      if (response.status == 'success') {

        showErrorAlert(response.message)
        this.setState({
          //stateImagePath: response.data[0].image
        })

      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ', response.message)
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={styles.main}
          source={require('../../assets/chef-app-images/profile-bg.png')}>
          <View style={styles.mainContent}>
            <ImageBackground
              source={require('../../assets/chef-app-images/top-bg.png')}
              style={styles.topBackground}>

              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/chef-app-images/login-logo.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
              <Text style={styles.profileText}>Profile <ActivityIndicator animating={this.state.loader} color="#fff" /> </Text>

            </ImageBackground>
            <View style={styles.content}>
              <View style={styles.avatarImageContainer}>
                <Image
                  source={this.state.stateImagePath ? { uri: this.state.stateImagePath } : require('../../assets/chef-app-images/noimage.png')}
                  style={styles.avatarImage}
                />
              </View>
              <View style={styles.uploadPhotoView}>
                <TouchableOpacity
                  style={styles.uploadPhoto}
                  disabled={(this.state.loader)}
                  onPress={() => {
                    this.showActionSheet();
                  }}>
                  <Text style={styles.uploadPhotoText}>Upload Photo</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContent}>
                <View style={styles.inputItem}>
                  <Image
                    source={require('../../assets/chef-app-images/5065892-my-profile-icon-png-327283-free-icons-library-profile-icon-png-500_500_preview.png')}
                    style={styles.inputImage}
                    resizeMode="contain"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={colors.black}
                    value={this.state.name}
                    onChangeText={e => this.setState({ name: e })}
                  />
                </View>
                <View style={styles.inputItem}>
                  <Image
                    source={require('../../assets/chef-app-images/email.png')}
                    style={styles.inputImage}
                    resizeMode="contain"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.black}
                    value={this.state.email}
                    onChangeText={e => this.setState({ email: e })}
                  />
                </View>
                <View style={styles.inputItem}>
                  <Image
                    source={require('../../assets/chef-app-images/mobile.png')}
                    style={styles.inputImage}
                    resizeMode="contain"
                    placeholderTextColor={colors.black}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    placeholderTextColor={colors.black}
                    value={this.state.phonenumber}
                    onChangeText={e => this.setState({ phonenumber: e })}
                  />
                </View>
                <View style={[styles.inputItem, { borderBottomWidth: 0 }]}>
                  <Image
                    source={require('../../assets/chef-app-images/location.png')}
                    style={styles.inputImage}
                    resizeMode="contain"
                    placeholderTextColor={colors.black}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor={colors.black}
                    value={this.state.address}
                    onChangeText={e => this.setState({ address: e })}
                  />
                </View>
              </View>
              <View style={styles.updateButtonView}>
                <TouchableOpacity style={styles.updateButton} onPress={() => this.updateProfile()}
                  disabled={(this.state.loader)} >
                  <Text style={styles.updateButtonText}>Update</Text>
                  <Image
                    source={require('../../assets/chef-app-images/sign-in-btn-arrow.png')}
                    style={styles.updateButtonImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ActionSheet
              ref={(o) => (this.ActionSheet = o)}
              //title={'Which one do you like ?'}
              options={['Select from gallery', 'Take a photo', 'Cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => {
                if (index === 0) {
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                  }).then((image) => {
                    this.setState({ stateImagePath: image.path });
                    this.uploadImage(image)
                  }).catch(err => {
                    console.log('Camera canceled!')
                  })
                } else if (index === 1) {
                  ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                  }).then((image) => {
                    console.log(image);
                    this.setState({ stateImagePath: image.path });
                    this.uploadImage(image)
                  }).catch(err => {
                    console.log('Camera canceled!')
                  })
                }
              }}
            />
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.6)',
  },
  topBackground: {
    width,
    height: TOP_BACKGROUND_HEIGHT * TOP_BACKGROUND_RATIO,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  profileText: {
    fontFamily: 'futurastd-medium',
    color: colors.white,
    fontSize: hp('4.5%'),
    position: 'absolute',
    alignSelf: 'flex-start',
    bottom: 60,
    left: 15,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    marginTop: -hp('4%'),
    ...ifIphoneX(
      {
        width: hp('13%'),
        height: hp('13%'),
      },
      {
        width: hp('17%'),
        height: hp('17%'),
      },
    ),
  },
  content: {
    flex: 1,
  },
  navigator: {
    //alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: wp('100%'),
    paddingVertical: 10
  },
  navigatorContent: {
    paddingLeft: 10,
    paddingRight: 10,
    ...ifIphoneX(
      {
        paddingTop: 20 + getStatusBarHeight(),
      },
      {
        //paddingTop: 20,
      },
    ),

  },
  avatarImageContainer: {
    width: hp('20%'),
    height: hp('20%'),
    borderRadius: hp('20%') / 2,
    borderWidth: 3,
    borderColor: colors.white,
    marginTop: -30,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    flex: 1,
    width: undefined,
    height: '100%',
  },
  uploadPhoto: {
    backgroundColor: colors.green,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
    borderWidth: 3,
    borderColor: colors.white,
  },
  uploadPhotoText: {
    fontFamily: 'futurastd-medium',
    color: colors.white,
    fontSize: hp('2%'),
  },
  uploadPhotoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContent: {
    backgroundColor: colors.white,
    width: '90%',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginTop: 10,
    padding: 10,
  },
  inputItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginTop: 5
  },
  inputImage: {
    width: hp('3%'),
    height: hp('3%'),
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: hp('2%'),
    margin: 0,
    padding: 0,
  },
  updateButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateButtonText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('3%'),
  },
  updateButtonImage: {
    width: hp('5%'),
    height: hp('5%'),
    marginLeft: 10,
  },
});
