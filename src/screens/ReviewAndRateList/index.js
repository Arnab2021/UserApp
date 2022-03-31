import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from "react-native"
import colors from '../../assets/Colors';
import { AirbnbRating } from 'react-native-ratings'

export default class ReviewAndRateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [
                {
                    id: 1,
                },
                {
                    id: 2
                }
            ]
        };
    }

    header() {
        this.props.navigation.setOptions({
            title: "Rating And Reviews",
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
    }

    renderItem = ({ item, index }) => {
        console.log('item', item);
        return (
            <TouchableOpacity style={styles.ordercardContainer} key={index} onPress={() => this.props.navigation.navigate('OrderDetail', { orderid: 1, order_status: 'cancelled' })}>
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.orderDate}>2020-02-23</Text>
                        <Text adjustsFontSizeToFit numberOfLines={2}>Order id # 425444</Text>
                    </View>
                    <View style={styles.rating}>
                        <Text style={styles.itemText}>5 items</Text>
                        <AirbnbRating
                            type='star'
                            count={5}
                            defaultRating={1}
                            size={20}
                            showRating={false}
                            isDisabled
                            selectedColor={colors.green}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <FlatList
                    data={this.state.orderList}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    style={{ marginTop: 5 }}                  
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    ordercardContainer: {
        padding: 10,
        //backgroundColor: 'pink'
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    row: {
        flexDirection: 'row'
    },
    orderDate: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 8
    },
    orderId: {
        color: '#000',
    },
    rating: {
        justifyContent: 'center'
    },
    itemText: {
        textAlign: 'right',
        fontSize: 12,
        marginBottom: 8
    },
    separator:{

    }
})