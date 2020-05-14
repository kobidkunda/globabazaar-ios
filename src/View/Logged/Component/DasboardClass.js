import YouTube from 'react-native-youtube';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import {Row, Grid} from 'react-native-easy-grid';
import DashboardSchedule from '../../../Component/DashboardSchedule';

export default class DasboardClass extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Grid style={{
          justifyContent: 'center',
          alignItems: 'center',
      }}>
        <Row>
          <DashboardSchedule
            url={'https://randomuser.me/api/portraits/women/47.jpg'}
          />
        </Row>
        <Row>
          <DashboardSchedule
            url={'https://randomuser.me/api/portraits/women/77.jpg'}
          />
        </Row>
        <Row>
          <DashboardSchedule
            url={'https://randomuser.me/api/portraits/women/87.jpg'}
          />
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({});
