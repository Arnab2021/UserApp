
import { Platform, Alert } from 'react-native';
import messaging, { firebase } from '@react-native-firebase/messaging';
import * as customNavigation from '../Services/CustomNavigation.js'
import { getData } from '../Services/LocalStorage.js';

const notification_to_show = async (notification) => {

  const user_id = await getData("user_id")

  Alert.alert("New message arrived", "Hey, \nThere is new message arrived.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK", onPress: () => {
          if (user_id != undefined || user_id != null)
            customNavigation.navigate("My Orders", { screen: 'Message', params: { user_id: user_id } })
        }
      }
    ]
  )
}


onMessage = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('A Firebase foreground message arrived!', remoteMessage);
    notification_to_show(remoteMessage.notification)
    //SendLocalNotification('SparkForegroundNotification', remoteMessage.notification.title, remoteMessage.notification.body, remoteMessage.data );
  });
}


const firebaseForgroundNotificationHandler = () => {

  onMessage()
}

export default firebaseForgroundNotificationHandler;