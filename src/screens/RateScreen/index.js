import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Platform,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Rating } from 'react-native-ratings'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getData } from '../../Services/LocalStorage';
import { showErrorAlert } from '../../Services/Alert';
import { callApi } from '../ApiHelper/callApi';


const { width, height } = Dimensions.get('window');

export default class RateScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loader: false,
      qualityRate: 0,
      value_for_money: 0,
      time_accuracy: 0,
      comment: ''
    }
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Rating and Reviews',
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

  async submitReview() {

    const user_id = await getData("user_id")
    const { item } = this.props.route.params

    const param = {
      userid: user_id,
      order_id: item.order_id,
      quality: this.state.qualityRate,
      value_for_money: this.state.value_for_money,
      time_accuracy: this.state.time_accuracy,
      comment: this.state.comment
    }

    this.setState({ loader: true })
    const response = await callApi('addFeedback', "POST", param)
    this.setState({ loader: false })

    if (response.status != false) {
      if (response.status == 'success') {
        showErrorAlert(response.message)
      }else{
        showErrorAlert(response.message)
      }
    }else{
      showErrorAlert(response.message)
    }

  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1, backgroundColor:'#fff'}}>
        <View style={styles.content}>
          <View style={styles.startView}>
            <Text style={styles.startItemText}>Quality</Text>
            <View style={styles.imageView}>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={40}
                onFinishRating={(q) => this.setState({ qualityRate: q })}
              />
            </View>
          </View>
          <View style={styles.startView}>
            <Text style={styles.startItemText}>Value for money</Text>
            <View style={styles.imageView}>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={40}
                onFinishRating={(q) => this.setState({ value_for_money: q })}
              />
            </View>
          </View>
          <View style={styles.startView}>
            <Text style={styles.startItemText}>Time Accuracy</Text>
            <View style={styles.imageView}>
              <Rating
                type='star'
                ratingCount={5}
                imageSize={40}
                onFinishRating={(q) => this.setState({ time_accuracy: q })}
              />
            </View>
          </View>
          <View style={styles.commentView}>
            <Text style={styles.commentsText}>Comments:</Text>
            <View style={styles.comments}>
              <TextInput
                style={styles.input}
                placeholder="Lorem Ipsum"
                multiline
                onChangeText={e => this.setState({ comment: e })}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.ratingButton} onPress={() => this.submitReview()}>
            {
              (this.state.loader) ?
                <ActivityIndicator size="small" animating color="#fff" />
                :
                <Text style={styles.ratingText}>Send</Text>
            }
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    margin: 10,
  },
  imageView: {
    width: wp('40%'),
    height: wp('11%'),
  },
  startView: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15
  },
  startItemText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
  },
  commentView: {
    marginTop: 10,
  },
  commentsText: {
    fontFamily: 'futurastd-medium',
    fontSize: hp('2.5%'),
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: hp('2.5%'),
  },
  comments: {
    marginTop: 10,
    height: hp('18%'),
  },
  ratingButton: {
    backgroundColor: colors.black,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  ratingText: {
    color: colors.white,
    fontFamily: 'futurastd-medium',
    fontSize: hp('3%'),
    ...(Platform.OS === 'ios' ? { lineHeight: hp('3.5%') } : null),
  },
});
