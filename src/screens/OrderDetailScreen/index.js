import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { callApi } from '../ApiHelper/callApi';
import { getData } from '../../Services/LocalStorage';
import { showErrorAlert } from '../../Services/Alert';

const { width, height } = Dimensions.get('window');

export default class OrderDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: true,
      chef_id: '',
      shipping_to: '',
      shipping_address: '',
      total_amount_payable: '0',
      order_number: '',
      dishes: [],
      hasOrderChanged: false,
      orderChangedTo: ''
    }
  }

  setHeader() {
    this.props.navigation.setOptions({
      title: 'Order Details',
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
    this.setHeader()
    await this._getUserid()
    await this.getdetails()
  }

  async _getUserid() {
    const chef_id = await getData('chef_id')
    this.setState({
      chef_id: chef_id
    })
  }

  async getdetails() {
    const { orderid } = this.props.route.params
    const param = {
      userid: this.state.chef_id,
      orderid: orderid
    }

    this.setState({ loader: true })
    const response = await callApi('getOrderDetail', "POST", param)
    this.setState({ loader: false })

    if (response.status != false) {
      if (response.status == 'success') {
        const data = response.data[0]

        this.setState({
          shipping_to: data.shipping_to_user,
          shipping_address: data.shipping_address,
          total_amount_payable: data.total_order_amount,
          order_number: data.order_id,
          dishes: response.dish
        })

      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ', response.message)
    }

  }

  renderItem = ({ item, index }) => {

    return (
      <View style={styles.orderItem}>
        <View style={styles.orderItemContent}>
          <Image
            source={{ uri: `${item.pic_url}` }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.orderItemTextView}>
          <Text style={styles.orderItemMainText}>{item.dish_name}</Text>
          <Text style={styles.orderItemSubText}>${item.price}</Text>
        </View>
      </View>
    )
  }

  async changeOrderStatus(val) {
    const param = {
      userid: this.state.chef_id,
      order_id: this.state.order_number,
      status: val
    }
    console.log(param);
    this.setState({ loader: true })
    const response = await callApi('changeOrderStatus', "POST", param)
    this.setState({ loader: false })
    console.log(response);

    if (response.status != false) {
      if (response.status == 'success') {
        showErrorAlert(response.message)
        this.setState({
          hasOrderChanged: true,
          orderChangedTo: val
        })
      } else {
        showErrorAlert(response.message)
      }
    } else {
      showErrorAlert('Error: ' + response.message)
    }
  }

  render() {
    const { order_status } = this.props.route.params
    console.log(order_status);
    if (this.state.loader) {
      return (
        <View style={styles.main}>
          <View style={styles.content}>
            <ActivityIndicator
              animating={true}
              size="small"
              color={colors.green}
            />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <View style={styles.topTextView}>
            <Text style={styles.topText}>Order number: #{this.state.order_number}</Text>
          </View>
          <View style={styles.shippingInformationView}>
            <Text style={styles.shippingTo}>Shipping To</Text>
            <Text style={styles.customerName}>{this.state.shipping_to}</Text>
            <Text style={styles.address}>
              {this.state.shipping_address}
            </Text>
          </View>
          <View style={styles.topTextView}>
            <Text style={styles.orderDetailsText}>Order Details</Text>
          </View>
          <View style={styles.orderData}>
            <FlatList
              data={this.state.dishes}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
          <View style={styles.totalAmount}>
            <Text style={styles.totalAmountText}>Total Amount</Text>
            <Text style={styles.totalAmountPriceText}>${this.state.total_amount_payable}</Text>
          </View>
        </View>
        {
          (order_status == 'active_order') ?
            (this.state.hasOrderChanged) ?
              (this.state.orderChangedTo == 1) ?
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ paddingVertical: 10, fontSize: 20, textAlign: 'center' }}>
                    Order has been Accepted.
                  </Text>
                </View>
                :
                (this.state.orderChangedTo == 0) &&
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ paddingVertical: 10, fontSize: 20, textAlign: 'center' }}>
                    Order has been Cancelled.
                  </Text>
                </View>
              :
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <TouchableOpacity
                  style={[styles.saveButton, { backgroundColor: colors.green }]} onPress={() => this.changeOrderStatus(0)}>
                  <Text style={styles.saveText}>Cancel Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.saveButton, { marginTop: 5 }]} onPress={() => this.changeOrderStatus(1)}>
                  <Text style={styles.saveText}>Confirm Order</Text>
                </TouchableOpacity>
              </View>
            :
            <View></View>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: colors.black,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  saveText: {
    color: colors.white,
    fontFamily: 'futurastd-medium',
    fontSize: hp('2%'),
  },
  topTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
    padding: 6,
  },
  topText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2%'),
  },
  shippingInformationView: {
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
  },
  shippingTo: {
    fontSize: hp('2.5%'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? { lineHeight: hp('3%') } : null),
  },
  customerName: {
    fontSize: hp('2%'),
    fontFamily: 'futurastd-medium',
    color: colors.green,
    marginTop: 5,
    ...(Platform.OS === 'ios' ? { lineHeight: hp('2.5%') } : null),
  },
  address: {
    fontSize: wp('3.5%'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? { lineHeight: hp('2.5%') } : null),
  },
  orderDetailsText: {
    fontSize: hp('2.5%'),
    fontFamily: 'futurastd-medium',
    color: colors.green,
  },
  orderData: {
    flex: 1,
  },
  addNewItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
  },
  addNewItemText: {
    fontSize: hp('2%'),
    color: colors.green,
    fontFamily: 'futurastd-medium',
  },
  totalAmount: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
    flexDirection: 'row',
    padding: 15,
  },
  totalAmountText: {
    fontSize: hp('2%'),
    fontFamily: 'futurastd-medium',
  },
  totalAmountPriceText: {
    fontSize: hp('2.5%'),
    color: colors.green,
    fontFamily: 'futurastd-medium',
  },
  orderItem: {
    borderBottomWidth: 1,
    borderColor: colors.borderGrey,
    padding: 5,
    flexDirection: 'row',
    height: 90
  },
  orderItemContent: {
    justifyContent: 'center',
  },
  orderItemTextView: {
    padding: 5,
    paddingLeft: 10,
  },
  orderItemMainText: {
    fontSize: hp('2%'),
    fontFamily: 'futurastd-medium',
    ...(Platform.OS === 'ios' ? { lineHeight: hp('2.5%') } : null),
  },
  orderItemSubText: {
    fontSize: hp('2.5%'),
    fontFamily: 'futurastd-medium',
    color: colors.green,
    marginTop: 5,
  },
  image: {
    width: 80,
    height: 80
  },
});
