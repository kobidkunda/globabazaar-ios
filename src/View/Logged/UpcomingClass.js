import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import DasboardClass from './Component/DasboardClass';
import {BLUEDARK, BLUESLIGHT} from '../../Config/theme';
import ClassListComp from './Component/ClassListComp';
import ClassListCompt from './Component/ClassListCompt';

export default class UpcomingClass extends Component {
  static navigationOptions = {
    title: 'Upcoming Class',
    headerStyle: {
      backgroundColor: BLUESLIGHT,
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ClassListCompt navigation={this.props.navigation} count={22} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
