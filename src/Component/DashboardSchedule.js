import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  BLUEDARK,
  BLUESLIGHT,
  BLURBACKGROUND,
  WHITE,
  WIDTH,
} from '../Config/theme';
import {Avatar, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {TEXTDESCWHITE, TEXTLLGWHITE, TEXTSMWHITE} from '../Style/TextStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardSchedule = props => (
  <View
    style={{
      width: WIDTH,
      padding: 10,
    }}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        height: 80,
      }}>
      <LinearGradient
        colors={[BLUESLIGHT, BLUEDARK]}
        start={{x: 0.0, y: 0.3}}
        end={{x: 1.0, y: 0.7}}
        style={{
          flex: 3,
          elevation: 30,
          backgroundColor: BLUEDARK,
          height: 80,
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              // alignItems: 'center',
              paddingLeft: 10,
            }}>
            <TEXTLLGWHITE>Anjan Shrestha</TEXTLLGWHITE>
            <TEXTDESCWHITE>Self Deveopment Class</TEXTDESCWHITE>
            <TEXTSMWHITE>6:30 PM, Tuesday</TEXTSMWHITE>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={'video-account'}
              size={55}
              color={'rgba(255,255,255,0.12)'}
            />
          </View>
        </View>
      </LinearGradient>

      <View
        style={{
          flex: 1,
          // backgroundColor:BLUEDARK,
          height: 80,
        }}>
        <Avatar
          overlayContainerStyle={styles.overlayContainerStyle}
          rounded
          containerStyle={styles.containerStyle}
          //avatarStyle={styles.containerStyle}
          //  placeholderStyle={styles.containerStyle}
          size={70}
          source={{
            uri: props.url,
          }}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    paddingLeft: 6,
    marginTop: 0,
    elevation: 30,
  },
  overlayContainerStyle: {
    borderColor: WHITE,
    borderWidth: 3,
  },
});

export default DashboardSchedule;
