import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SectionList,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import OrderViewCard from '../../components/OrderViewCard';
import colors from '../../assets/Colors';
import { getData } from '../../Services/LocalStorage';
import { showErrorAlert } from '../../Services/Alert';
import { callApi } from '../ApiHelper/callApi';

export default class ViewOrdersScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: '',
      loader: false,
      orders: [],
    }
  }

  setHeader() {
    this.props.navigation.setOptions({
      title: 'View Orders',
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
    await this._getOrders()
  }

  async _getUserid() {
    const user_id = await getData('user_id')
    this.setState({
      user_id: user_id
    })
  }

  async _getOrders() {

    const param = {
      userid:  this.state.user_id,
    }

    this.setState({ loader: true })
    const response = await callApi('viewUserOrder', "POST", param)
    this.setState({ loader: false })
    console.log(response);
    if (response.status != false) {
      if (response.status == 'success') {
        const active_order = response.active_order
        const past_order = response.past_order
        const cancel_order = response.cancel_order

        let data = [
          {
            title: 'Active Orders',
            data: (active_order.length > 0) ? active_order : [{ no_order_found: true }]
          },
          {
            title: 'Past Orders',
            data: (past_order.length > 0) ? past_order : [{ no_order_found: true }]
          },
          {
            title: 'Cancelled Order',
            data: (cancel_order.length > 0) ? cancel_order : [{ no_order_found: true }]
          }
        ]

        this.setState({
          orders: data
        })

      } else {
        showErrorAlert(response.message)
        this.setState({
          orders: []
        })
      }
    } else {
      showErrorAlert('Error: '+ response.message)
    }


  }

  renderItem = ({ item, section }) => {
    const title = section.title
    const orderStatus = (title == 'Active Orders') ? 'active_order' :
      (title == 'Past Orders') ? 'past_order' : 'cancelled_order'

    return (
      <OrderViewCard
        item={item}
        onPressOrder={() => 
        {
          if(item.no_order_found === undefined){
            this.props.navigation.navigate('OrderDetail', { orderid: item.order_id, order_status: orderStatus })
          }
        }
        }
        onPressChat={() => {
          if (item.no_order_found === undefined) {
            this.props.navigation.navigate('Chat', { item: item })
          }
        }}
        onPressRate={() => {
          if (item.no_order_found === undefined) {
            this.props.navigation.navigate('Rate', { item: item })
          }
        }}
      />
    )
  }

  renderSectionHeader = ({ section: { title } }) => {
    return (
      <View style={styles.sectionHeaderTextView}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.main}>
        <SectionList
          sections={this.state.orders}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          refreshing={this.state.loader}
          onRefresh={async () => await this._getOrders()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  sectionHeaderTextView: {
    backgroundColor: colors.black,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  sectionHeaderText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('3%'),
    color: colors.white,
    paddingLeft: 10,
  },
});
