import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { callApi } from '../ApiHelper/callApi';
import { getData } from '../../Services/LocalStorage'
import { showErrorAlert } from '../../Services/Alert';

export default class AddCardScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: true,
      deliveryFee: 0,
      subTotal: 0,
      total: 0,
      cart_details: [],      
    }
  }

  setheader() {
    this.props.navigation.setOptions({
      title: 'Add Cart',
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
    await this._getcartdetails()
  }

  async getUser() {
    const userid = await getData('user_id')
    this.setState({
      userid: userid
    })
  }

  async _getcartdetails() {
    const { userid } = this.state

    const param = {
      userid: userid,
    }

    this.setState({ loader: true })
    const response = await callApi('getCartFoodDetail', 'POST', param)
    this.setState({ loader: false })
    console.log(response);
   
    if (response.status != false) {
      if (response.status == 'Success') {
        let subtotal = 0
        let deliveryfee = 0
        response.data.map((x,i) => {
          subtotal += parseInt(x.quantity) * parseInt(x.price)
          deliveryfee += parseInt(x.delivery_fees)
        })
        this.setState({
          cart_details: response.data,
          subTotal: subtotal,
          total: subtotal,
          deliveryFee: deliveryfee
        })
      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ' + response.message)
    }

  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.orderItem}>
        <View style={styles.orderItemRow}>
          <View style={styles.orderItemContent}>
            <Image
              source={ (item.pic_url != '')? {uri: item.pic_url} : require('../../assets/chef-app-images/noimage.png') }
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.orderItemTextView}>
            <Text style={styles.orderItemMainText}>{item.dish_name}</Text>
            <Text style={styles.orderItemSubText}>${item.price}</Text>
          </View>
        </View>
        <View style={styles.quantityView}>
          <Text style={styles.qtyText}>Qty</Text>
          <View style={styles.quantityCountView}>
            <View style={styles.quantityCount}>
              <Text>{item.quantity}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {

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
        <View style={styles.addCartContent}>
          <Text style={styles.yourOrderText}>Your order</Text>
          <FlatList
            data={this.state.cart_details}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index} 
            onRefresh={ () => this._getcartdetails()}           
            refreshing={this.state.loader}
          />
        </View>
        <View style={styles.addCartPaymentDetail}>
          <View style={styles.paymentDetailTextView}>
            <Text style={styles.paymentDetailText}>Subtotal</Text>
            <Text style={styles.paymentDetailText}>${this.state.subTotal}</Text>
          </View>
          <View style={styles.paymentDetailTextView}>
            <Text style={styles.paymentDetailText}>Delivery</Text>
            <Text style={styles.paymentDetailText}>{this.state.deliveryFee}</Text>
          </View>
          <View style={styles.paymentDetailTextView}>
            <Text style={[styles.paymentDetailText, { color: colors.black }]}>
              Total
            </Text>
            <Text style={[styles.paymentDetailText, { color: colors.black }]}>
              ${this.state.total}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContent}>
          <TouchableOpacity
            style={styles.button}
            >
            <Text style={styles.buttonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.buttonContent,
            { borderTopWidth: 0, borderBottomWidth: 0 },
          ]}>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('PlaceOrder')}>
            <Text style={styles.buttonText}>Check Out</Text>
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
  addCartPaymentDetail: {
    backgroundColor: colors.white,
    flex: 1,
    borderColor: colors.borderGrey,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    padding: 10,
    justifyContent: 'space-between',
  },
  addCartContent: {
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
    backgroundColor: colors.white,
    flex: 5,
    borderRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.borderGrey,
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
  buttonText: {
    fontFamily: 'futurastd-medium',
    color: colors.white,
    fontSize: wp('5%'),
    lineHeight: hp('3.5%'),
  },
  orderItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: colors.borderGrey,
    flex: 1,
  },
  orderItemContent: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  orderItemTextView: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  orderItemMainText: {
    fontSize: wp('3.5%'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? { lineHeight: hp('3%') } : null),
  },
  orderItemSubText: {
    fontSize: wp('5%'),
    fontFamily: 'futurastd-medium',
    color: colors.green,
    marginTop: 5,
  },
  image: {
    width: 80,
    height: 80
  },
  yourOrderText: {
    fontSize: hp('3%'),
    padding: 10,
  },
  orderItemRow: {
    flexDirection: 'row',
    flex: 1,
  },
  quantityView: {
    alignItems: 'center',
  },
  qtyText: {
    fontFamily: 'futurastd-medium',
  },
  quantityCountView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityCount: {
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 18,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
