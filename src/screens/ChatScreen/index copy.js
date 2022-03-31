import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import colors from '../../assets/Colors';
import ChatBubble from '../../components/ChatBubble';
import {color} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

export default class ChatScreen extends Component {
  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Messages',
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
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../assets/chef-app-images/arrow.png')}
            resizeMode="contain"
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
      ),
    });
  }
  render() {
    return (
      <View style={styles.main}>
        <KeyboardAwareScrollView>
          <View style={styles.content}>
            <ChatBubble
              name="Emma Cole"
              message="Hay, How are you? :)"
              align="left"
            />
            <ChatBubble
              name="Jhon Smith"
              message="I'm fine, did you work?"
              align="right"
            />
            <ChatBubble name="Emma Cole" message="yes" align="left" />
            <ChatBubble
              name="Emma Cole"
              message="I'm work as designer"
              align="left"
            />
            <ChatBubble name="Jhon Smith" message="Awesome" align="right" />
            <ChatBubble
              name="Jhon Smith"
              message="let us drink coffee together ^_^"
              align="right"
            />
            <ChatBubble name="Emma Cole" message="good idea" align="left" />
            <ChatBubble name="Emma Cole" message="ok" align="left" />
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            autoCorrect={false}
            secureTextEntry
            placeholder="Type message..."
          />
          <Image source={require('../../assets/chef-app-images/send.png')} />
        </View>
      </View>
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
