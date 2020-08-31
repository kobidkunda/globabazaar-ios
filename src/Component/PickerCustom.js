import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BLUEDARK, BLUESLIGHT, BLURBACKGROUND, WHITE, WIDTH} from '../Config/theme';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-community/picker';

const PickerCustom = props => (
  <View
    style={{
      width: WIDTH,
      paddingTop: 0,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 20,


    }}>
      <Picker
          selectedValue={props.selectedValue}
          style={styles.style}
          mode="dialog"
          onValueChange={props.onValueChange}>
          <Picker.Item itemStyle={styles.itemStyle} label="Male" value="java" />
          <Picker.Item itemStyle={styles.itemStyle} label="Female" value="java" />
      </Picker>
  </View>
);

const styles = StyleSheet.create({
  style: {
      borderRadius: 30,
      // backdropFilter: 'blur(33px)',
      backgroundColor: BLURBACKGROUND,
      elevation: 10,
      height:50,
      fontFamily:'Montserrat-SemiBold',
      textTransform:'uppercase',
      fontSize:16,
      color: WHITE,
  },
  containerStyle: {
    elevation: 10,
  },
    itemStyle: {
        fontSize:16,
      color: WHITE,
      fontFamily:'Montserrat-SemiBold',
      textTransform:'uppercase'
  },
});

export default PickerCustom;
