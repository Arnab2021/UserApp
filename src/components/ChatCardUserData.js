import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChatCardMsgTime from './ChatCardMsgTime';

class ChatCardUserData extends Component {
  constructor(props) {
    super(props);
    this.state = {      
    };
  }

  componentDidMount(){    
    
  }

  shouldComponentUpdate(nextProps){  
    if(this.props === nextProps){
      return false
    }
    return true    
  }

  render() {   
    const { name, time, lastMessage } = this.props
    
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.username}>{name}</Text>
          <ChatCardMsgTime time={time} />
        </View>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
    );
  }
}

export default ChatCardUserData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize'
  },
  message: {
    fontSize: 14,
    color: '#828181'
  },
  row: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
})