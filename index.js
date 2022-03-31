/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import initialiseFirebaseNotification from './src/NotificationServices/initialiseFirebaseNotification'
import firebaseForgroundNotificationHandler from './src/NotificationServices/firebaseForgroundNotificationHandler';
import firebaseBackgroundNotificationHandler from './src/NotificationServices/firebaseBackgroundNotificationHandler'

initialiseFirebaseNotification()
firebaseForgroundNotificationHandler()
firebaseBackgroundNotificationHandler()

AppRegistry.registerComponent(appName, () => App);
