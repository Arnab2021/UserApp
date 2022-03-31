import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FoodName from '../../components/FoodName';
import FoodCard from '../../components/FoodCard';
import FilterByModal from '../../components/FilterByModal';
import { callApi } from '../ApiHelper/callApi';
import { getData } from '../../Services/LocalStorage'
import { showErrorAlert } from '../../Services/Alert';

import messaging, { firebase } from '@react-native-firebase/messaging';
import * as customNavigation from '../../Services/CustomNavigation.js'

export default class FoodScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      filterByModalVisible: false,
      userid: '',
      all_dishes: [],
      dataParam: {
        price_range: [],
        cuisine: [],
        dish_name: '',
        postcode: '',
        dish_type: [],
        dietary_pref: [],
        ingredient: '',
        chef_name: '',
        order_type: []
      },
      isFiltered: false
    };
  }
  setheader() {
    this.props.navigation.setOptions({
      title: 'Food',
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
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            this.setState({
              filterByModalVisible: true,
            })
          }>
          <Image
            source={require('../../assets/chef-app-images/filter.png')}
            resizeMode="contain"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }

  async openNotificationFromBackgroundState() {
    try {
      const user_id = await getData("user_id")
      messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage) {
          customNavigation.navigate("My Orders", { screen: 'Message', params: { user_id: user_id } })
        }

      });
    } catch (error) {

    }

  }

  async openNotificationFromQuitState() {
    try {
      const user_id = await getData("user_id")
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            customNavigation.navigate("My Orders", { screen: 'Message', params: { user_id: user_id } })
          }
        });
    } catch (error) {

    }

  }

  async componentDidMount() {
    this.setheader()
    this.openNotificationFromQuitState()
    this.openNotificationFromBackgroundState()
    await this.getUser()
    await this._getDishes()

  }

  async getUser() {
    const userid = await getData('user_id')
    this.setState({
      userid: userid
    })
  }

  async _getDishes() {
    const { userid, dataParam } = this.state
    const param = {
      userid: userid,
      ...dataParam
    }

    console.log(param);
    this.setState({ loader: true })
    const response = await callApi('searchUserDishList', 'POST', param)
    this.setState({ loader: false })

    if (response.status != false) {
      if (response.status == 'success') {
        let data = []
        response.data.map((item, index) => {
          data.push({
            dish_id: item.dish_id,
            dish_image: item.dish_image,
            dish_name: item.dish_name
          })
        })
        this.setState({
          all_dishes: data
        })

      } else {
        this.setState({
          all_dishes: []
        })
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ' + response.message)
    }

  }

  clearFilter() {

    this.setState({
      dataParam: {
        price_range: [],
        cuisine: [],
        dish_name: '',
        postcode: '',
        dish_type: [],
        dietary_pref: [],
        ingredient: '',
        chef_name: '',
        order_type: []
      }
    }, () => this._getDishes())
  }

  renderItem = ({ item, index }) => {
    return (
      <FoodCard item={item} onPressViewDetails={() => {
        this.props.navigation.navigate('DishDescription', {
          food_id: item.dish_id,
        })
      }} />
    )
  }

  render() {
    const { filterByModalVisible } = this.state;
    return (
      <View style={styles.main}>

        {
          (this.state.isFiltered) &&
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => this.clearFilter()}>
              <Text style={{ fontSize: 19 }}>Clear Filter</Text>
            </TouchableOpacity>
          </View>
        }

        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', marginVertical: 5 }}
          data={this.state.all_dishes}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          numColumns={2}
          onRefresh={() => this._getDishes()}
          refreshing={this.state.loader}
        />
        <FilterByModal
          filterByModalVisible={filterByModalVisible}
          closeFilterByModalVisible={(data) => {

            this.setState({
              filterByModalVisible: false,
              dataParam: data,
              isFiltered: true
            }, () => this._getDishes())
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});
