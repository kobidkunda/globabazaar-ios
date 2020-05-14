import YouTube from 'react-native-youtube';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AvatarTeacher from '../../../Component/AvatarTeacher';
import {Col, Grid} from 'react-native-easy-grid';

export default class DasboardTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Grid
        style={{
          width: 160,
        }}>
        <Col>
          <AvatarTeacher
            url={'https://randomuser.me/api/portraits/women/47.jpg'}
          />
        </Col>
        <Col>
          <AvatarTeacher
            url={'https://randomuser.me/api/portraits/men/86.jpg'}
          />
        </Col>
        <Col>
          <AvatarTeacher
            url={'https://randomuser.me/api/portraits/women/57.jpg'}
          />
        </Col>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({});
