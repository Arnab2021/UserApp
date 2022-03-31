import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native"
import firestore from '@react-native-firebase/firestore';

import colors from "../../assets/Colors"
import ChatCard from "../../components/ChatCard"
import { getData } from "../../Services/LocalStorage";

const MessagesScreen = ({ navigation, route }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        header()
    }, [navigation])
    const header = () => {

        navigation.setOptions({
            title: "Messages",
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
                    onPress={() => navigation.openDrawer()}
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../assets/chef-app-images/arrow.png')}
                        resizeMode="contain"
                        style={{ marginRight: 10 }}
                    />
                </TouchableOpacity>
            ),
        });
    }

    useEffect(() => {
        const collection = "peopleConnectedToUser"
        const user_id = route.params.user_id        
        const primary_doc_id = "for_user_" + user_id
      
        const querySnap = firestore().collection(collection).doc(primary_doc_id).collection("allusers")        
        const subscriber = querySnap.onSnapshot(item => {           
            const userData = item.docs.map((doc) => {
                return {
                    ...doc.data(),
                }
            })
            console.log(userData);
            setUsers(userData)
        })
        return () => subscriber();
    }, [])

    const goToChat = (data) => {
        navigation.navigate("Chat", { item: data })
    }

    const renderItem = ({ item, index }) => {       
        return (
            <ChatCard item={item} goToChat={() => goToChat({ ...item})} />
        )
    }

    return (
        <View style={{ flex: 1, }}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                style={{ marginTop: 5 }}
            />
        </View>
    )

}

export default MessagesScreen