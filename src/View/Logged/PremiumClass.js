import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {BLUESLIGHT, WHITE} from '../../Config/theme';
import FreeClassListCompt from './Component/FreeClassListCompt';
import PremiumClassListCompt from './Component/PremiumClassListCompt';
import DasboardClass from './Component/DasboardClass';
import PremiumClassNew from './Component/PremiumClassNew';
import {HeaderBackButton} from '@react-navigation/stack';

export default class PremiumClass extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Premium Class',
    headerStyle: {
      backgroundColor: BLUESLIGHT,
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
    headerLeft: () => (
      <HeaderBackButton
        labelStyle={{
          color: WHITE,
        }}
        style={{
          color: WHITE,
        }}
        onPress={() => navigation.goBack(null)}
      />
    ),
  });

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
        <PremiumClassNew navigation={this.props.navigation} count={22} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});