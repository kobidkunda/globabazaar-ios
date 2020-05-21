import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import DasboardClass from './Component/DasboardClass';
import {BLUEDARK} from '../../Config/theme';
import DashboardSchedule from '../../Component/DashboardSchedule';

export default class UpcomingClass extends Component {
  static navigationOptions = {
    title: 'UpcomingClass',
    headerStyle: {
      backgroundColor: BLUEDARK,
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
      <View>
        <DasboardClass  navigation={this.props.navigation} count={12} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
