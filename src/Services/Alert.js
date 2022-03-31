import React from "react";
import { Alert } from "react-native";

const showErrorAlert = (message) => {
    Alert.alert(
        'Alert!',
        message,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
}

export {showErrorAlert}