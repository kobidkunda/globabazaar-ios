import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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
import CardWithIcons from './CardWithIcons';

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
          height: 60,
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
        }}>
        <TouchableOpacity
            onPress={props.onPress}

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
            <TEXTLLGWHITE>{props.teacher}</TEXTLLGWHITE>
            <TEXTDESCWHITE>{props.title}</TEXTDESCWHITE>
            <TEXTSMWHITE>
              {props.date} {props.time}
            </TEXTSMWHITE>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={'video-account'}
              size={40}
              color={'rgba(255,255,255,0.12)'}
            />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <View
        style={{
          flex: 1,
          // backgroundColor:BLUEDARK,
          height: 40,
            width:100
        }}>
        <Avatar
          overlayContainerStyle={styles.overlayContainerStyle}
          rounded
          containerStyle={styles.containerStyle}
          //avatarStyle={styles.containerStyle}
          //  placeholderStyle={styles.containerStyle}
          size={60}
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
      marginLeft:10,
    marginTop: -5,
    elevation: 30,
  },
  overlayContainerStyle: {
    borderColor: WHITE,
    borderWidth: 3,
  },
});

export default DashboardSchedule;
