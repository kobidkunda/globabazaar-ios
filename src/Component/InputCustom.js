import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {WHITE, WIDTH} from '../Config/theme';

const InputCustom = props => (
  <View
    style={{
      width: WIDTH,

    }}>
    <Input
      inputStyle={styles.inputStyle}
      labelStyle={styles.labelStyle}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.labelStyle}
      placeholder={props.placeholder}
    />
  </View>
);

const styles = StyleSheet.create({
  labelStyle: {
      borderRadius: 3,
      // backdropFilter: 'blur(33px)',
      backgroundColor: 'rgba(255,255,255,0.29)',
      borderBottomWidth: 0,
      borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
    inputContainerStyle:{

    },

  inputStyle: {

      color:WHITE
  },

  containerStyle: {},
});

export default InputCustom;
