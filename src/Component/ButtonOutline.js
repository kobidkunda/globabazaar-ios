import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BLUEDARK, BLUESLIGHT, WHITE, WIDTH} from '../Config/theme';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const ButtonOutline = props => (
  <View
    style={{
      width: WIDTH,
      padding: 10,
    }}>
    <Button
      type={'outline'}


      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      titleStyle={styles.titleStyle}
      title={props.title}
    />
  </View>
);

const styles = StyleSheet.create({
  buttonStyle: {
   // backgroundColor: BLUEDARK,
  },
  containerStyle: {
    elevation: 10,
      borderWidth:1,
      borderColor:BLUESLIGHT
  },
  titleStyle: {
      color:BLUESLIGHT,
      fontFamily:'MontserratSemiBold',
      textTransform:'uppercase'
  },
});

export default ButtonOutline;
