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
  <LinearGradient
    colors={[BLUEDARK, BLUESLIGHT]}
    start={{x: 0.0, y: 0.8}}
    end={{x: 1.0, y: 1.0}}
    style={{
      padding: 10,
      height: 70,
      //  backgroundColor: props.bgcolor,
      borderRadius: 5,
      elevation: 10,
    }}>
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
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
  </LinearGradient>
);

const styles = StyleSheet.create({});

export default CardWithIcons;
