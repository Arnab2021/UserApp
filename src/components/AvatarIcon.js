import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const usericon = require('../assets/chef-app-images/noimage.png')

export default class AvatarIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps) {
      return false
    }
    return true
  }

  render() {
    const { profileImage, AvatarIconStyle, avatarContainer } = this.props
    return (
      <View style={[styles.avatarContainer, avatarContainer]}>
        {
          (profileImage == '' || profileImage == undefined) ?
            <Image source={ usericon} style={[styles.image,AvatarIconStyle]} />
            :
            <Image source={{ uri: `${profileImage}` }} style={[styles.image,AvatarIconStyle]} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer:{
    width: 150,
    height: 150,
  },
  image: {
    width: "100%",
    height: '100%',
    borderRadius: 150,
  }
})