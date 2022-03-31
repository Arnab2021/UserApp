import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ChatCardUserData from './ChatCardUserData';
import AvatarIcon from './AvatarIcon';

export default class ChatCard extends Component {
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
    const{goToChat} = this.props
    const { chef_name, last_message, message_time, UserPic } = this.props.item
    const hour = new Date(message_time).getHours()
    const minute = new Date(message_time).getMinutes()
    const unit = (hour >= 12 )? 'PM' : 'AM'
    const timestr = hour + ':' + minute + ' ' + unit
   
    return (
      <TouchableOpacity style={styles.container} onPress={goToChat} >
        <AvatarIcon profileImage={UserPic} avatarContainer={{ width: 60,height: 60,}}  />
        <ChatCardUserData name={chef_name} lastMessage={last_message} time={timestr} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 8,
    marginVertical: 10
  }
})