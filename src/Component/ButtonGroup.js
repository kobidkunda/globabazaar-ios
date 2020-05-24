import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BLUEDARK, BLUESLIGHT, WHITE, WIDTH} from '../Config/theme';
import {ButtonGroup as ButtonGroupp} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const ButtonGroup = props => (
  <View
    style={{
      width: WIDTH,
      padding: 10,
    }}>
    <ButtonGroupp
      onPress={props.onPress}
      selectedIndex={props.selectedIndex}
      buttons={props.buttons}
      containerStyle={styles.buttonStyle}
      disabledSelectedStyle={styles.disabledSelectedStyle}
      disabledSelectedTextStyle={styles.disabledSelectedTextStyle}
    />
  </View>
);

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: BLUEDARK,
  },
    disabledSelectedTextStyle:{
      color: '#ffffff'
    },

    disabledSelectedStyle: {
    backgroundColor: BLUEDARK,
  },
  containerStyle: {
    elevation: 10,
  },
  titleStyle: {
    color: WHITE,
    fontFamily: 'MontserratSemiBold',
    textTransform: 'uppercase',
  },
});

export default ButtonGroup;
