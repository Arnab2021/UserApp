import { AsyncStorage } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const initialiseFirebaseNotification = () => {

    checkPermission()
}

async function checkPermission() {
    const enabled = await messaging().hasPermission();

    if (enabled) {
        getToken();
    } else {
        requestPermission();
    }
}

async function getToken() {

    const token = await messaging().getToken()
    console.log('fcm token - ', token)
    if (token)
        await saveToken(token)
}

async function requestPermission() {
    try {
        const token = await messaging().requestPermission()
        getToken()
    } catch (err) {
        requestPermission()
    }
}

const saveToken = async (token) => {
    await AsyncStorage.setItem('fcm_token', token);
}


export default initialiseFirebaseNotification;