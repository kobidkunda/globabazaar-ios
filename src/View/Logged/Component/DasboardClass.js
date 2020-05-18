import YouTube from 'react-native-youtube';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import {Row, Grid, Col} from 'react-native-easy-grid';
import DashboardSchedule from '../../../Component/DashboardSchedule';
import AvatarTeacher from '../../../Component/AvatarTeacher';
import {BASE_URL} from '../../../Config/URL';
import {inject, observer} from 'mobx-react';
@inject('Auth','User','Class')
@observer
export default class DasboardClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class : [

      ]
    };
  }

async  componentDidMount(): void {
    let _Token = await  this.props.Auth.GetToken();
    let Teacherlist = await  this.props.Class.upcomingClass(await _Token);
    console.log(Teacherlist)

    this.setState({
      class: Teacherlist
    })

  }

  renderButtons(teacher) {
    return teacher.map((item, index) => {
      return(
          <Row>
            <DashboardSchedule
                url={'https://randomuser.me/api/portraits/women/47.jpg'}
            />
          </Row>
      );
    })

  }

  render() {
    return (
      <Grid style={{
          justifyContent: 'center',
          alignItems: 'center',
      }}>
        {
          this.renderButtons(this.state.class)
        }
      </Grid>
    );
  }
}

const styles = StyleSheet.create({});
