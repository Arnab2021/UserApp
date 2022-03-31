import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { callApi } from '../ApiHelper/callApi';
import { getData } from '../../Services/LocalStorage'
import { showErrorAlert } from '../../Services/Alert';

const { width } = Dimensions.get('window');

export default class DishDescriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      loader: true,
      quantityCount: 0,
      imageSource: '',
      dish_data: []
    };
  }

  setheader() {
    this.props.navigation.setOptions({
      title: this.props.route.params.dishName,
      headerTitleStyle: {
        fontFamily: 'futurastd-medium',
        color: colors.white,
        alignSelf: 'center',
        ...(Platform.OS === 'ios' ? { lineHeight: hp('4%') } : null),
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
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../assets/chef-app-images/arrow.png')}
            resizeMode="contain"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }

  async componentDidMount() {
    this.setheader()
    await this.getUser()
    await this._getDishDetails()
  }

  async getUser() {
    const userid = await getData('user_id')
    this.setState({
      userid: userid
    })
  }

  async _getDishDetails() {
    const { userid } = this.state
    const { food_id } = this.props.route.params

    const param = {
      userid: userid,
      food_id: food_id
    }

    this.setState({ loader: true })
    const response = await callApi('getFoodDetail', 'POST', param)
    this.setState({ loader: false })
    console.log(response);

    if (response.status != false) {
      if (response.status == 'success') {
        const data = response.data[0]
        this.setState({
          dish_data: data
        })
      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ' + response.message)
    }

  }

  async _addToCart() {
    const { userid } = this.state
    const { food_id } = this.props.route.params

    if(this.state.quantityCount == 0){
      showErrorAlert("Please select quantity")
      return
    }

    const param = {
      userid: userid,
      dish_id: food_id,
      quantity: this.state.quantityCount
    }

    this.setState({ btnloader: true })
    const response = await callApi('addOrderCart', 'POST', param)
    this.setState({ btnloader: false })
    console.log(response);

    if (response.status != false) {
      if (response.status == 'success') {
        showErrorAlert("Saved to cart")
      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ' + response.message)
    }

  }


  render() {

    const { quantityCount, dish_data } = this.state;

    if (this.state.loader) {
      return (
        <View style={styles.main}>
          <ActivityIndicator
            animating
            color={colors.green}
            size="large"
          />
        </View>
      )
    }
    return (
      <View style={styles.main}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={(dish_data.pic_url != '') ? { uri: dish_data.pic_url } : require('../../assets/chef-app-images/noimage.png')} />
        </View>
        <View style={styles.descriptionContent}>
          <View style={styles.descriptionItem}>

            <Text style={styles.mainText}>Description</Text>
            <View style={styles.subItemContent}>
              <Text style={styles.subText}>Price per Quantity: {dish_data.price}</Text>
              <Text style={styles.subText}>Cuisine: {dish_data.cuisine}</Text>
              <Text style={styles.subText}>Dish Type: {dish_data.dish_type}</Text>
              <Text style={styles.subText}>Ingredients: {dish_data.ingredients}</Text>
              <Text style={styles.subText}>Dietary Preferences: {dish_data.dietary_pref}</Text>
              <Text style={styles.subText}>Quantity Available: {dish_data.quantity}</Text>
              <Text style={styles.subText}>Order Type: {dish_data.order_type}</Text>
            </View>
          </View>
          <View
            style={[
              styles.descriptionItem,
              { borderBottomWidth: 2, borderColor: colors.borderGrey },
            ]}>
            <View style={styles.subItemContent}>
              <Text style={styles.subText}>Home Chef Name: {dish_data.chef_name}</Text>
              <Text style={styles.subText}>Home Chef Location: {dish_data.chef_location}</Text>
              <Text style={styles.subText}>Home Chef Distance: {dish_data.chef_distance}</Text>
              <Text style={styles.subText}>Delivery Available: {dish_data.delivery_type}</Text>
              <Text style={styles.subText}>Home Chef Rating: {dish_data.chef_rating}</Text>
              <Text style={styles.subText}>Reviews Received: {dish_data.reviews}</Text>
            </View>
          </View>
          <View style={styles.buttonView}>
            <View style={styles.quantityButton}>
              <TouchableOpacity
                style={styles.quantityItem}
                onPress={() =>
                  this.setState({
                    quantityCount: this.state.quantityCount + 1,
                  })
                }>
                <Icon name="plus" size={wp('4%')} />
              </TouchableOpacity>
              <View style={styles.quantityItem}>
                <Text style={styles.quentityText}>Qty:{quantityCount}</Text>
              </View>
              <TouchableOpacity
                style={styles.quantityItem}
                onPress={() => {
                  if (quantityCount < 1) {
                    return;
                  }
                  this.setState({
                    quantityCount: this.state.quantityCount - 1,
                  });
                }}>
                <Icon name="minus" size={wp('4%')} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => this._addToCart()}>
              {
                (this.state.btnloader) ?
                  <ActivityIndicator size="small" color={colors.green} animating />
                  :
                  <Text style={styles.addToCartText}>Add To Cart</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  imageView: {
    margin: 3,
  },
  image: {
    width: '100%',
    height: hp('25%'),
  },
  descriptionContent: {
    flex: 1,
    marginTop: 5,
  },
  descriptionItem: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    borderTopWidth: 2,
    borderTopColor: colors.borderGrey,
  },
  mainText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
  },
  subItemContent: {
    flex: 1,
    padding: 5,
    justifyContent: 'space-between',
  },
  subText: {
    fontFamily: 'futurastd-medium',
    fontSize: wp('3.5%'),
    flex: 1,
    color: colors.softText,
    ...(Platform.OS === 'ios' ? { lineHeight: hp('2.5%') } : null),
  },
  buttonView: {
    alignItems: 'center',
    padding: wp('3%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quantityButton: {
    flexDirection: 'row',
    backgroundColor: colors.green,
    width: wp('35%'),
    marginRight: 5,
  },
  quantityItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('2%'),
  },
  quentityText: {
    color: colors.white,
    fontFamily: 'futurastd-medium',
    fontSize: wp('3.5%'),
  },
  addToCartButton: {
    backgroundColor: colors.black,
    width: wp('35%'),
    padding: wp('2%'),
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: colors.white,
    fontFamily: 'futurastd-medium',
    fontSize: wp('3.5%'),
  },
});
