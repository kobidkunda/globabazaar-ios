import YouTube from 'react-native-youtube';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import {Row, Grid, Col} from 'react-native-easy-grid';
import DashboardSchedule from '../../../Component/DashboardSchedule';
import AvatarTeacher from '../../../Component/AvatarTeacher';
import {BASE_URL} from '../../../Config/URL';
import {inject, observer} from 'mobx-react';
import CircleLoader from '../../../Component/Loader/CircleLoader';
import ClassLoader from '../../../Component/Loader/ClassLoader';
@inject('Auth','User','Class')
@observer
export default class DasboardClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
      class : [],
        activeclass: []
    };
  }

async  componentDidMount(): void {
    let _Token = await  this.props.Auth.GetToken();
    console.log(this.props.count)
    let Teacherlist = await  this.props.Class.upcomingClass( _Token,this.props.count);

    console.log('Classlist')
    console.log(Teacherlist)

    let LiveClass = await this.props.User.getLiveClass(_Token);

    console.log(LiveClass);



    this.setState({
      class: Teacherlist,
        activeclass: LiveClass,
        loading:false
    })

  }

  renderButtons(teacher) {
    return this.state.activeclass.map((item, index) => {
      return(
          <Row>
            <DashboardSchedule

                onPress={() => this.props.navigation.navigate('UpcomingClassDetails',{
                    id: item.id
                })}
                teacher={item.seminar_to_teacher.name}
                url={BASE_URL+ item.seminar_to_teacher.image}
                title={item.title}
                time={item.time}
                date={item.date}

            />
          </Row>
      );
    })

  }

  render() {
    return (
      <Grid style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
      }}>

          {this.state.loading === true? (
                  <Grid
                      style={{
                          padding: 10,
                          justifyContent: 'flex-start',
                          alignItems: 'center',

                      }}>
                      <Row ><ClassLoader/></Row>
                      <Row ><ClassLoader/></Row>
                      <Row><ClassLoader/></Row>
                      <Row><ClassLoader/></Row>
                      <Row><ClassLoader/></Row>
                  </Grid>
              ) :
              (
                  <Grid
                      style={{
                          flex:1,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                      }}>
                      { this.renderButtons(this.state.class)}
                  </Grid>
              )}
      </Grid>
    );
  }
}

const styles = StyleSheet.create({});
