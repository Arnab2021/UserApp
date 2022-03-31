import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import colors from '../assets/Colors';

export default class OrderViewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item, onPressOrder, onPressChat, onPressRate } = this.props
        const no_order_found = (item.no_order_found !== undefined) ? item.no_order_found : ''

        return (
            <TouchableOpacity
                onPress={onPressOrder}>
                <View
                    style={[
                        styles.orderItem,
                        {
                            borderBottomWidth: 1,
                            borderColor: colors.borderGrey,
                            paddingVertical: 8,
                        },
                    ]}>
                    <View style={styles.orderInformation}>
                        <Text style={styles.dateText}>{(no_order_found) != '' ? 'No Order found.' : item.order_date}</Text>
                        <Text style={styles.orderidText}> {(no_order_found == '') && 'Order id #'}  {item.order_id}</Text>
                    </View>
                    {
                        ((no_order_found) == '') &&
                        <View style={styles.orderRightInformation}>

                            <View style={styles.statusView}>
                                <Text style={styles.statusText}>{item.order_status}</Text>
                                <Icon name="arrow-right" style={styles.icon} />
                            </View>

                            <View style={styles.buttonView}>
                                <TouchableOpacity
                                    style={styles.activeButton}
                                    onPress={onPressChat}>
                                    <Text style={styles.activeButtonText}>Chat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.inactiveButton}
                                    onPress={onPressRate}>
                                    <Text style={styles.inactiveButtonText}>Rate</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 5
    },
    orderidText: {
        fontSize: wp('4%'),
        color: colors.softText,
        marginTop: 5,
    },
    orderRightInformation: {
    },
    statusText: {
        fontSize: hp('2%'),
        color: colors.green,
        textTransform: 'capitalize'
    },
    statusView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    activeButton: {
        backgroundColor: colors.green,
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    activeButtonText: {
        fontSize: hp('2%'),
        fontFamily: 'futurastd-medium',
        color: colors.white,
    },
    inactiveButton: {
        backgroundColor: colors.black,
        padding: 5,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    inactiveButtonText: {
        fontSize: hp('2%'),
        fontFamily: 'futurastd-medium',
        color: colors.white,
    },
})