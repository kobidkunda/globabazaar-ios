import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BLUEDARK, BLUESLIGHT, WHITE, WIDTH} from '../Config/theme';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from 'react-native-elements';

const AvatarTeacher = props => (
  <View
    style={{
      width: WIDTH,
      padding: 10,
    }}>
    <LinearGradient
        colors={[BLUESLIGHT, BLUEDARK]}
        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
      style={{
        height: 75,
        width: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
      }}>
      <Avatar
        rounded
        overlayContainerStyle={styles.overlayContainerStyle}
        size={70}
        source={{
          uri: props.url,
        }}
      />
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  overlayContainerStyle: {
    // borderColor: BLUEDARK,
    //  borderWidth: 3,
  },
});

export default AvatarTeacher;
