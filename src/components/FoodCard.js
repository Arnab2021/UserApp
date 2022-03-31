import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import FoodName from './FoodName';

let width = Dimensions.get('screen').width/2 - 8

export default class FoodCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {item, onPressViewDetails} = this.props
        return (
            <TouchableWithoutFeedback
                onPress={onPressViewDetails} style={styles.itemView} >
                <View style={styles.rowItem}>
                    <ImageBackground
                        style={styles.imageBackground}
                        source={ (item.dish_image != '')?  {uri: item.dish_image} : require('../assets/chef-app-images/noimage.png')}>
                        <FoodName title={item.dish_name} />
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        width:width , 
        height:width ,
        justifyContent: 'flex-end'
    },
    itemView:{
       // margin: 5
    }
})
