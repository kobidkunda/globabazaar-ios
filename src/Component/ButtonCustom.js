import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BLUEP, WHITE, WIDTH} from '../Config/theme';
import { Button } from 'react-native-elements';

const ButtonCustom = props => (
  <View
    style={{
      width: WIDTH,
        padding:10
    }}>
      <Button
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          titleStyle={styles.titleStyle}
          title="Login"
      />
  </View>
);

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:BLUEP

    },
    containerStyle:{

    },
    titleStyle:{

    }
});

export default ButtonCustom;
