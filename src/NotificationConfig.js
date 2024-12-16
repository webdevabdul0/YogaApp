import PushNotification from 'react-native-push-notification';

// Configure push notifications
PushNotification.configure({
  onNotification: function (notification) {
    console.log('Notification:', notification);
  },
  requestPermissions: true,
});

export default PushNotification;
