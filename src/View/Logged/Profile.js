import React, {Component} from 'react';
import {StyleSheet, ScrollView, StatusBar, View, Image, TouchableOpacity} from 'react-native';
import ProfileItem from '../../Component/ProfileItem';
import {inject, observer} from 'mobx-react';
import ButtonCustom from '../../Component/ButtonCustom';
import LinearGradient from "react-native-linear-gradient";
import {BLUEDARK, BLUESLIGHT, HEIGHT, WIDTH} from '../../Config/theme';
import {Avatar} from 'react-native-elements';
import {BASE_URL} from '../../Config/URL';
import {Col, Grid, Row} from 'react-native-easy-grid';
import QRCode from 'react-native-qrcode-svg';
import Modal from 'react-native-modal';
import {TEXTNLBLACKD} from '../../Style/TextStyle';
@inject('Auth','User')
@observer
export default class Profile extends Component {


  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
    headerStyle: {
      backgroundColor: BLUESLIGHT,
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  })



  constructor(props) {
    super(props);

    this.state = {
      otpsent: false,
      editable: true,
      loading: false,
      model:false
    };
  }
  onLogout = async ()=>  {
    this.setState({
      loading: true
    })
    await this.props.Auth.Logout()

    this.setState({
      loading: false
    })
}
  render() {
    return (
      <ScrollView style={{
        backgroundColor:'#f0f0f0'
      }}>
        <StatusBar
            hidden={false}
            translucent={true}
            backgroundColor={BLUESLIGHT}
        />

        <View style={{


        }}>
          <Grid style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin:20
          }}>
            <Col style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Avatar
                  overlayContainerStyle={styles.overlayContainerStyle}
                  size={100}
                  source={{
                    uri: BASE_URL+  this.props.User.avatar,
                  }}
              />
            </Col>
            <Col style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableOpacity onPress={() => this.setState({
                model: true
              })}>
                <QRCode

                    size={100}
                    value={this.props.User.uuid}
                />
              </TouchableOpacity>
            </Col>
          </Grid>

        </View>
        <ProfileItem title={'First Name'} value={this.props.User.fname} />
        <ProfileItem title={'Last Name'} value={this.props.User.lname} />
        <ProfileItem title={'Email'} value={this.props.User.email} />
        <ProfileItem title={'App Signature'} value={this.props.User.uuid} />
        <ProfileItem title={'Phone'} value={this.props.User.phone} />
        <ProfileItem title={'Street'} value={this.props.User.street} />
        <ProfileItem title={'City'} value={this.props.User.city} />
        <ProfileItem title={'Pin Code'} value={this.props.User.pin_code} />
        <ProfileItem title={'DOB'} value={this.props.User.date_of_birth} />

        <ButtonCustom loading={this.state.loading}  title={'Logout'} onPre={() => this.onLogout() }/>

        <Modal
            isVisible={this.state.model}
            animationIn={'slideInUp'}
            useNativeDriver={true}
            animationInTiming={700}
            animationOutTiming={700}
            backdropTransitionOutTiming={1000}
            onSwipeComplete={() => this.setState({model: false})}
            swipeDirection="down"
            style={{margin: 0}}
            onBackButtonPress={() =>
                this.setState({
                  model: false,
                })
            }>
          <View
              style={{
                position: 'absolute',
                flex:1,
                bottom: 0,
                width: WIDTH,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'#ffffff',
                height: HEIGHT / 2,
                borderTopRightRadius: 22,
                borderTopLeftRadius: 22,
              }}>

            <QRCode
                size={200}
                value={this.props.User.uuid}
            />

            <TEXTNLBLACKD >Scan at Terminal</TEXTNLBLACKD>


          </View>

        </Modal>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
