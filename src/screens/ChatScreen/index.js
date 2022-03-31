import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import colors from '../../assets/Colors';
import { getData } from '../../Services/LocalStorage';
import {showErrorAlert} from '../../Services/Alert'
import { _handleUserinFirebase } from '../../Services/FirebaseServices';
const { width, height } = Dimensions.get('window');

export default class ChatScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sender_id: '',
      sender_name: '',
      sender_image: '',

      receiver_id: '',
      receiver_name: '',
      receiver_image: '',

      loader: false,
      messages: []
    }
  }

  header() {
    const { item } = this.props.route.params

    this.props.navigation.setOptions({
      title: item.chef_name,
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
    this.header()
    const { item } = this.props.route.params
    const sender_name = item.user_name
    const sender_image = item.UserPic
    const receiver_id = item.chef_id
    const receiver_name = item.chef_name
    const receiver_image = item.ChefPic
    const sender_id = await getData('user_id')

    this.setState({
      sender_id,
      sender_name,
      sender_image,
      receiver_id,
      receiver_name,
      receiver_image
    })
    
    const doc_id = (sender_id > receiver_id) ? sender_id + '_' + receiver_id : receiver_id + '_' + sender_id

    const querySnap = firestore().collection("chatrooms").doc(doc_id).collection('messages').orderBy("createdAt", "desc")

    this.subscriber = querySnap.onSnapshot(item => {
      const allMessages = item.docs.map((doc) => {
        if (doc.data().createdAt) {
          return {
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate()
          }
        } else {
          return {
            ...doc.data(),
            createdAt: new Date()
          }
        }
      })
      this.setState({
        messages: allMessages
      })
    })

  }

  componentWillUnmount() {
    this.subscriber
  }


  async onSend(messages) {
    const prevMsg = this.state.messages

    const { receiver_id, receiver_name, receiver_image, sender_id, sender_name, sender_image } = this.state


    const collection = {
      _id: messages[0]._id,
      text: messages[0].text,
      createdAt: firestore.FieldValue.serverTimestamp(),
      sender_id: sender_id,
      receiver_id: receiver_id,
      user: messages[0].user
    }
    this.setState({
      messages: GiftedChat.append(prevMsg, messages)
    })

    const doc_id = (sender_id > receiver_id) ? sender_id + '_' + receiver_id : receiver_id + '_' + sender_id
    try {
      firestore().collection("chatrooms").doc(doc_id).collection("messages").add({ ...collection, createdAt: firestore.FieldValue.serverTimestamp() })

      const data = {
        chef_id: receiver_id,
        chef_name: receiver_name,
        ChefPic: receiver_image,
        user_id: sender_id,
        user_name: sender_name,
        UserPic: sender_image,
        last_message: messages[0].text,
        message_time: new Date().toLocaleString()
      }
      await _handleUserinFirebase(data)
      
    } catch (error) {
      showErrorAlert("could not send message" + error)
    }
  }

  render() {
    const { messages, sender_id, sender_name, sender_image } = this.state

    if (this.state.loader) {
      return (
        <View style={[styles.main, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#000" animating />
        </View>
      )
    }
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: sender_id,
          name: sender_name,
          avatar: sender_image,
        }}
        keyboardShouldPersistTaps="handled"
      />
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    flex: 1,
    margin: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: colors.green,
    backgroundColor: colors.white,
    padding: 10,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 10,
  },
});
