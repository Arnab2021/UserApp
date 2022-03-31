import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {ifIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
import { getData, removeData } from '../Services/LocalStorage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CommonActions} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../assets/Colors';

export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      user_id:''
    };
  }

  async componentDidMount(){
    const user_id = await getData("user_id")
    this.setState({
      user_id
    })
  }

  render() {
    const {navigate} = this.props.props.navigation;
    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('Home', {screen: 'Home'})}>
            <Image
              source={require('../assets/chef-app-images/25694.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('Home', {screen: 'Profile'})}>
            <Image
              source={require('../assets/chef-app-images/5065892-my-profile-icon-png-327283-free-icons-library-profile-icon-png-500_500_preview.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('My Orders', {screen: 'ViewOrders'})}>
            <Image
              source={require('../assets/chef-app-images/my-order-green.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('My Cart', {screen: 'Payment'})}>
            <Image
              source={require('../assets/chef-app-images/dfe751219c2.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Payment Methods</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            //onPress={() => navigate('Home', {screen: 'Orders'})}
          >
            <Image
              source={require('../assets/chef-app-images/location.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Saved Adresses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('My Orders', {screen: 'Message',params: { user_id: this.state.user_id }}) }>
            <Image
              source={require('../assets/chef-app-images/94001795a3efc6330f4b6b835b68b989.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigate('My Orders', {screen: 'ReviewRateList'})}>
            <Image
              source={require('../assets/chef-app-images/5-star-rating-icon-png-8.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Ratings & Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentItem} onPress={async() => {
            await removeData('user_id')
            await removeData('rememberme')
            
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [{ name: 'SignInStack' }],
            });
           
            this.props.props.navigation.dispatch(resetAction)
          }}>
            <Image
              source={require('../assets/chef-app-images/img_351044.png')}
              style={styles.inputImage}
              resizeMode="contain"
            />
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    flex: 0.7,
    backgroundColor: colors.black,
  },
  contentItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    alignItems: 'center',
    flex: 1,
  },
  inputImage: {
    width: hp('4%'),
    height: hp('4%'),
  },
  menuItemText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
    color: colors.white,
    marginLeft: wp('4%'),
    ...(Platform.OS === 'ios' ? {lineHeight: hp('3.5%')} : null),
  },
  icon: {
    color: colors.white,
    fontSize: wp('8%'),
  },
});
