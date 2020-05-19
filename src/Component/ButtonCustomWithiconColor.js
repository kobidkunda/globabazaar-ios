import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BLUEDARK, BLUESLIGHT, WHITE, WIDTH} from '../Config/theme';
import {Button, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const ButtonCustomWithiconColor = props => (
  <View
    style={{
      width: WIDTH,
      padding: 10,
    }}>
    <Button
      ViewComponent={LinearGradient} // Don't forget this!
      linearGradientProps={{
        colors: [props.color1, props.color2, props.color3],
        start: {x: 0, y: 0.9},
        end: {x: 1, y: 0.2},
      }}
      icon={
        <Icon name={props.iconname} type={props.type} size={22} color="white" />
      }
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
    fontFamily: 'MontserratSemiBold',
    textTransform: 'uppercase',
    paddingLeft: 5,
  },
});

export default ButtonCustomWithiconColor;
