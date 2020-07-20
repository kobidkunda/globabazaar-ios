import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BLUEDARK, BLUESLIGHT, WHITE, WIDTH} from '../Config/theme';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const ButtonText = props => (
  <View
    style={{
      width: WIDTH,
      padding: 10,
    }}>
    <Button
      type={'clear'}
      onPress={props.onPress}
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
    borderWidth: 0,
  },
  titleStyle: {
    fontFamily: 'Montserrat-SemiBold',
    textTransform: 'uppercase',
      color:WHITE
  },
});

export default ButtonText;
