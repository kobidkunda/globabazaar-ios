import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import {BLURBACKGROUND, WHITE, WIDTH} from '../Config/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      editable={props.editable}
      returnKeyType={props.returnKeyType}
      onSubmitEditing={props.InputonSubmitEditing}
      autoCapitalize={props.autoCapitalize}
      textContentType={props.autoCapitalize}
      onChangeText={props.onChangeText}
      autoCorrect={props.autoCorrect}
      getRef={props.getRef}
      keyboardType={props.keyboardType}
      blurOnSubmit={props.blurOnSubmit}
      onBlur={props.onBlur}
      shake={props.shake}
      errorMessage={props.errorMessage}
      status={props.status}
      value={props.value}
      ref={props.InputRef}
      editable={props.editable}
      secureTextEntry={props.secureTextEntry}
      leftIconContainerStyle={styles.leftIconContainerStyle}
      leftIcon={<Icon name={props.leftIcon} size={24} color={BLURBACKGROUND} />}
    />
  </View>
);

const styles = StyleSheet.create({
  labelStyle: {
    borderRadius: 3,
    // backdropFilter: 'blur(33px)',
    backgroundColor: BLURBACKGROUND,
    borderBottomWidth: 0,
    borderBottomColor: BLURBACKGROUND,
  },
  inputContainerStyle: {},

  inputStyle: {
    color: WHITE,
      fontFamily:'MontserratSemiBold',
  },
  leftIconContainerStyle: {
    paddingLeft: 10,
  },

  containerStyle: {},
});

export default InputCustom;
