/**
 * @format
 */
import PushNotification from 'react-native-push-notification';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
