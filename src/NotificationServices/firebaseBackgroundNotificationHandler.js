
import messaging from '@react-native-firebase/messaging';

const setBackgroundMessageHandler =() =>{
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('A Firebase Background message arrived!', remoteMessage);
        //SendLocalNotification('SparkBarkgroundNotification', remoteMessage.notification.title, remoteMessage.notification.body,remoteMessage.data );
    });
}


const  firebaseBackgroundNotificationHandler =()=> {
    setBackgroundMessageHandler()
}

export default firebaseBackgroundNotificationHandler;