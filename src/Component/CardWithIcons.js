import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  BLUEDARK,
  BLUESLIGHT,
  BLURBACKGROUND,
  WHITE,
  WIDTH,
} from '../Config/theme';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TEXTLLG, TEXTNL} from '../Style/TextStyle';

const CardWithIcons = props => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      height: 70,
      backgroundColor: props.bgcolor,
      borderRadius: 5,
      elevation: 10,
    }}>
    <Icon
      style={{
        elevation: 20,
      }}
      name={props.iconname}
      size={30}
      color={WHITE}
    />

    <TEXTNL>{props.text}</TEXTNL>
  </TouchableOpacity>
);

const styles = StyleSheet.create({});

export default CardWithIcons;
