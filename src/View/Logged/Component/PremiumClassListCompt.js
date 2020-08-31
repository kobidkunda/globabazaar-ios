import MaskedView from '@react-native-community/masked-view';
import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {Row, Grid, Col} from 'react-native-easy-grid';
import DashboardSchedule from '../../../Component/DashboardSchedule';
import AvatarTeacher from '../../../Component/AvatarTeacher';
import {BASE_URL} from '../../../Config/URL';
import {inject, observer} from 'mobx-react';
import CircleLoader from '../../../Component/Loader/CircleLoader';
import ClassLoader from '../../../Component/Loader/ClassLoader';
@inject('Auth','User','Class')
@observer
export default class PremiumClassListCompt extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
      class : [

      ]
    };
  }

async  componentDidMount(): void {
    let _Token = await  this.props.Auth.GetToken();
    console.log(this.props.count)
    let Teacherlist = await  this.props.Class.upcomingPremiumClass( _Token,3);
    console.log('premium class')
    console.log(Teacherlist)


    this.setState({
      class: Teacherlist,
        loading:false
    })

  }

  renderButtons(teacher) {
    return this.state.class.map((item, index) => {
      return(
          <Row>
            <DashboardSchedule
                teacher={item.seminar_to_teacher.name}
                url={BASE_URL+ item.seminar_to_teacher.image}
                title={item.title}
                time={item.time}
                date={item.date}
                content={'Premium'}

            />
          </Row>
      );
    })

  }

  render() {
    return (
      <ScrollView style={{
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
