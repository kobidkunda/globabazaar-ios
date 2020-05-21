/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import Route from './src/View/Route';
import stores from './src/Action/Index';
import {Provider} from 'mobx-react';
import CodePush from 'react-native-code-push';

class App extends Component {
  constructor() {
    super();
    this.state = {syncMessage: '', checked: false};
  }

  componentDidMount() {
    this.sync();
  }

  codePushStatusDidChange(syncStatus) {
    console.log(syncStatus);
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({syncMessage: 'Checking for update.'});
        break;

      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({syncMessage: 'Downloading package.'});
        break;

      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({syncMessage: 'Awaiting user action.'});
        break;

      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({syncMessage: 'Installing update.'});
        break;

      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({syncMessage: 'App is updated.'});
        break;

      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({
          syncMessage: 'Update cancelled by user.',
          progress: false,
        });
        break;

      case CodePush.SyncStatus.UPDATE_INSTALLED:
        this.setState({
          syncMessage: 'Update installed and will be applied on restart.',
          progress: false,
        });
        break;

      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({
          syncMessage: 'An unknown error occurred.',

          progress: false,
        });

        break;
    }
  } /** Update pops a confirmation dialog, and then immediately reboots the app */

  async sync() {
    await CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true},

      this.codePushStatusDidChange(),
    );

    CodePush.allowRestart();
  }
  render() {
    return (
      <>
        <Provider {...stores}>
          <StatusBar barStyle="light-content" />

          <Route
            checked={this.state.checked}
            syncMessage={this.state.syncMessage}
          />
        </Provider>
      </>
    );
  }
}

export default App;
