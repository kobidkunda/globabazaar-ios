import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {TEXTPROFILEBLACK, TEXTPROFILEBLACKVAL} from '../Style/TextStyle';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;

export default class ProfileItem extends Component {
  render() {
    return (
      <View
        style={{
          height: 30,
          margin: 5,
          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 20,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
            }}>
            <TEXTPROFILEBLACK>{this.props.title}</TEXTPROFILEBLACK>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
            }}>
            <TEXTPROFILEBLACKVAL>{this.props.value}</TEXTPROFILEBLACKVAL>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
