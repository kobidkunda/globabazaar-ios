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
import {TEXTLLGWHITE, TEXTSMWHITE} from '../Style/TextStyle';
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
        height: 100,
      }}>
      <LinearGradient
        colors={[BLUEDARK, BLUESLIGHT]}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 1.0}}
        style={{
          flex: 3,
          elevation: 30,
          backgroundColor: BLUEDARK,
          height: 100,
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
                paddingLeft:10
            }}>
            <TEXTLLGWHITE>Anjan Shrestha</TEXTLLGWHITE>
            <TEXTSMWHITE>6:30 PM, Tuesday</TEXTSMWHITE>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={'message-video'}
              size={55}
              color={'rgba(255,255,255,0.22)'}
            />
          </View>
        </View>
      </LinearGradient>

      <View
        style={{
          flex: 1,
          // backgroundColor:BLUEDARK,
          height: 100,
        }}>
        <Avatar
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
    marginTop: 15,
    elevation: 30,
  },
});

export default DashboardSchedule;
