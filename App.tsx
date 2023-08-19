/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SpeechPage from './src/screen/SpeechPage';
import { checkMultiple, PERMISSIONS, requestMultiple } from 'react-native-permissions';
interface IProps{}
class App extends React.Component<IProps>{
  constructor(props: IProps) {
    super(props)
  }
  // componentDidMount = async () => {
  //   if (Platform.OS === "ios") {
  //     const result = await checkMultiple([
  //       PERMISSIONS.IOS.MICROPHONE,
  //       PERMISSIONS.IOS.SPEECH_RECOGNITION,
  //     ]);
  //     const mic = result['ios.permission.MICROPHONE'];
  //     const speech = result['ios.permission.SPEECH_RECOGNITION']
  //     if (mic === "granted" && speech === "granted") {
  //       console.log('Permission Granted')
  //     } else if (mic === 'unavailable' && speech === 'unavailable') {
  //       console.log('Permission not available in this device')
  //     } else if (mic === 'denied' && speech === "denied") {
  //       console.log("permission danied but requestable");
  //       Linking.openSettings()
  //     } else {
  //       console.log('Permission blocked');
  //       Linking.openSettings()
  //     }
  //   } 
    
  // }
  render() { 
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <SpeechPage />
      </SafeAreaView>
    );
  }
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#5885AF',
  },
});
