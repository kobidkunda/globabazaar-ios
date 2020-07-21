import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BLUEDARK, BLUESLIGHT, WHITE, WIDTH} from '../Config/theme';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const ButtonIcon = props => (
  <View
    style={props.contstyle}>
    <Button
      ViewComponent={LinearGradient} // Don't forget this!
      linearGradientProps={{
        colors: [BLUEDARK, BLUESLIGHT, BLUESLIGHT],
        start: {x: 0, y: 0.9},
        end: {x: 1, y: 0.2},
      }}
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      titleStyle={styles.titleStyle}
      title={props.title}
      loading={props.loading}
      onPress={props.onPre}
    />
  </View>
);

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: BLUEDARK,
  },
  containerStyle: {
    elevation: 10,
  },
  titleStyle: {
    color: WHITE,
    fontFamily: 'Montserrat-SemiBold',
    textTransform: 'uppercase',
  },
});

export default ButtonIcon;
