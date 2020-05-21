import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BLUEDARK, BLUESLIGHT, WHITE, WIDTH} from '../Config/theme';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const TextPrimary = props => (
  <View
    style={{
      width: WIDTH,
      padding: 10,
    }}>
    <Text style={styles.text}>{props.value}</Text>
  </View>
);

const styles = StyleSheet.create({
    text: {
        color:WHITE,
        fontSize:11,
        fontFamily:'MontserratBold',
        textTransform:'uppercase'
    // backgroundColor: BLUEDARK,
  }
});

export default TextPrimary;
