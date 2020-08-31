import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  Vibration,
  BackHandler,
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {BLUESLIGHT} from '../../Config/theme';

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          hidden={false}
          translucent={true}
          backgroundColor={BLUESLIGHT}
        />
        <WebView
          javaScriptEnabled={true}
          thirdPartyCookiesEnabled={true}
          cacheEnabled={false}
          allowsLinkPreview={true}
          useWebKit={true}
          startInLoadingState={true}
          source={{
            uri: 'https://tawk.to/chat/5f0ee94f67771f3813c1158f/default',
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
