import React, {Component} from 'react';
import {StyleSheet, ScrollView, StatusBar} from 'react-native';
import ProfileItem from '../../Component/ProfileItem';
import {inject, observer} from 'mobx-react';
import ButtonCustom from '../../Component/ButtonCustom';
import LinearGradient from "react-native-linear-gradient";
import {BLUEDARK, BLUESLIGHT} from '../../Config/theme';
@inject('Auth','User')
@observer
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otpsent: false,
      editable: true,
      loading: false,
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
        <ProfileItem title={'First Name'} value={this.props.User.fname} />
        <ProfileItem title={'Last Name'} value={this.props.User.lname} />
        <ProfileItem title={'Email'} value={this.props.User.email} />
        <ProfileItem title={'Phone'} value={this.props.User.phone} />
        <ProfileItem title={'Street'} value={this.props.User.street} />
        <ProfileItem title={'City'} value={this.props.User.city} />
        <ProfileItem title={'Pin Code'} value={this.props.User.pin_code} />
        <ProfileItem title={'DOB'} value={this.props.User.date_of_birth} />

        <ButtonCustom loading={this.state.loading}  title={'Logout'} onPre={() => this.onLogout() }/>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
