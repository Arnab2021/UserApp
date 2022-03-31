import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import colors from '../../assets/Colors';
import FoodCard from '../../components/FoodCard';
import { TextInput } from 'react-native-gesture-handler';
import { callApi } from '../ApiHelper/callApi';
import { showErrorAlert } from '../../Services/Alert';

const { width, height } = Dimensions.get('window');

//Image Resolutions
const TOP_BACKGROUND_WIDTH = 375;
const TOP_BACKGROUND_HEIGHT = 193;
const TOP_BACKGROUND_RATIO = width / TOP_BACKGROUND_WIDTH;

export default class SearchScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchText: '',
      offset: 0
    }
  }


  async _searchData() {

    const { searchText, offset } = this.state
    const param = {
      searchtext: searchText,
      offset: offset
    }
    console.log(param);

    this.setState({ loader: true })
    const response = await callApi('searchCompleteDishList', 'POST', param)
    this.setState({ loader: false })
    console.log(response);
    if (response.status != false) {
      if (response.status == 'success') {
        let data = []
        response.data.map((item, index) => {
          data.push({
            dish_id: item.dish_id,
            dish_image: item.pic_url,
            dish_name: item.dish_name
          })
        })
        this.setState({
          data: data
        })
      } else {
        this.setState({
          data: []
        })
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ' + response.message)
    }
  }

  renderItem = ({ item, index }) => {
    return (
      <FoodCard
        item={item}
        onPressViewDetails={() => {
          this.props.navigation.navigate('DishDescription', {
            food_id: item.dish_id,
          })
        }}
      />
    )
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={styles.main}
          source={require('../../assets/chef-app-images/forgotpassword-bg.jpeg')}>
          <View style={styles.mainContent}>
            <ImageBackground
              source={require('../../assets/chef-app-images/top-bg.png')}
              style={styles.topBackground}>
              <View style={styles.navigator}>
                <View style={styles.navigatorContent}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Image
                      source={require('../../assets/chef-app-images/menu.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.navigatorContent} />
                <View
                  style={[styles.navigatorContent, { alignItems: 'flex-end' }]}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}>
                    <Image
                      source={require('../../assets/chef-app-images/arrow.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/chef-app-images/login-logo.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </ImageBackground>
            <View style={styles.main}>
              <View style={styles.searchTextView}>
                <Text style={styles.searchText}>Search</Text>
              </View>

              <View style={styles.inputView}>
                <TouchableOpacity style={styles.iconContent} onPress={() => this._searchData()}>
                  <Icon name="search1" style={styles.searchIcon} />
                </TouchableOpacity>
                <TextInput style={styles.input} onChangeText={e => this.setState({ searchText: e })} value={this.state.searchText} />
              </View>

              {
                (this.state.loader) ?
                  <ActivityIndicator animating color="#000" size="large" />
                  :
                  <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between', marginVertical: 5 }}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    numColumns={2}
                  />
              }

            </View>
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
  input: {
    // flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.softText,
    width: wp('85%'),
    paddingVertical: 0,
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    fontFamily: 'futurastd-medium',
    fontSize: hp('3%'),
    backgroundColor: 'rgba(255,255,255, 0.6)',
  },
  searchIcon: {
    color: colors.softText,
    fontSize: hp('4%'),
  },
  iconContent: {
    width: wp('15%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.softText,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.6)',
  },
  inputView: {
    flexDirection: 'row',
    marginTop: hp('3%'),
    marginBottom: 10
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
        width: hp('25%'),
        height: hp('25%'),
      },
      {
        width: hp('25%'),
        height: hp('25%'),
      },
    ),
  },
  content: {
    flex: 1,
  },
  navigator: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  navigatorContent: {
    flex: 1,
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
  searchTextView: {
    alignItems: 'center',
    //marginTop: hp('5%'),
  },
  searchText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('4%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('4.5%') } : null),
  },
});
