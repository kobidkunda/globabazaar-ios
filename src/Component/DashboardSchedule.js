import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
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
import Icon from 'react-native-vector-icons/AntDesign';
import CardWithIcons from './CardWithIcons';
import MaskedView from '@react-native-community/masked-view';
import * as Animatable from 'react-native-animatable';
import Shimmer from 'react-native-shimmer';
import {BASE_URL} from "../Config/URL";

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
          elevation: 18,
          backgroundColor: BLUEDARK,
          height: 80,
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
        }}>
        <View
          style={{
            position: 'absolute',
            width: WIDTH * 0.7,
            height: 80,
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
          }}>
          <Image
            style={{
              width: WIDTH * 0.7,
              height: 80,
              borderTopRightRadius: 40,
              borderBottomRightRadius: 40,
              opacity: 0.2,
            }}
            source={
              props.image === null
                ? require('../Assets/Images/bg-class.jpg')
                : {
                    uri: BASE_URL + props.image,
                  }
            }

            // source={require('../Assets/Images/bg-class.jpg')}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            left: WIDTH * 0.5,
            top: 10,
          }}>
          <Icon
            name={'playcircleo'}
           // type={'antdesign'}
            size={55}
            style={{
              opacity: 0.5,
            }}
            color={'rgba(255,255,255,0.6)'}
          />
        </View>
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 8,
          }}>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              // alignItems: 'center',
              paddingLeft: 10,
            }}>
            <TEXTLLGWHITE>{props.teacher.substring(0, 26)}</TEXTLLGWHITE>
            <TEXTDESCWHITE>{props.title.substring(0, 22)}</TEXTDESCWHITE>

            {props.is_free === 0 ? (
              <MaskedView
                style={{flex: 1, flexDirection: 'row', height: 50, width: 100}}
                maskElement={
                  <View
                    style={{
                      // Transparent background because mask is based off alpha channel.
                      backgroundColor: 'transparent',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Shimmer intensity={0.5} tilt={33} opacity={0.7}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: 'Montserrat-SemiBold',
                          color: '#ffffff',
                        }}>
                        Premium
                      </Text>
                    </Shimmer>
                  </View>
                }>
                {/* Shows behind the mask, you can put anything here, such as an image */}
                <Image
                  style={{
                    width: 120,
                    height: 100,
                  }}
                  source={require('../Assets/Images/gold.jpg')}
                />
              </MaskedView>
            ) : (
              <View
                style={{
                  // Transparent background because mask is based off alpha channel.
                  backgroundColor: 'transparent',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#ffffff',
                  }}>
                  Free
                </Text>
              </View>
            )}
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
          width: 100,
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
    marginLeft: 10,
    marginTop: -5,
    elevation: 30,
  },
  overlayContainerStyle: {
    borderColor: WHITE,
    borderWidth: 3,
  },
});

export default DashboardSchedule;
