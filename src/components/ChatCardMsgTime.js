import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class ChatCardMsgTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgtime: ''
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
    
    const{time} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.time} adjustsFontSizeToFit >{time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 65,
    
  },
  time: {
    fontSize: 12,
    fontWeight:'bold',
    textAlign:'center'
  }
})