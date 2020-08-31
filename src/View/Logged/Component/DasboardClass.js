
import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import {Row, Grid, Col} from 'react-native-easy-grid';
import DashboardSchedule from '../../../Component/DashboardSchedule';
import AvatarTeacher from '../../../Component/AvatarTeacher';
import {BASE_URL} from '../../../Config/URL';
import {inject, observer} from 'mobx-react';
import CircleLoader from '../../../Component/Loader/CircleLoader';
import ClassLoader from '../../../Component/Loader/ClassLoader';
import { ListItem, Avatar } from 'react-native-elements'

@inject('Auth','User','Class')
@observer
export default class DasboardClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
      class : [],
        activeclass: null
    };
  }

async  componentDidMount(): void {
    let _Token = await  this.props.Auth.GetToken();
    let Teacherlist = await  this.props.Class.upcomingClass( _Token,this.props.count);
    let LiveClass = await this.props.User.getLiveClass(_Token);

    console.log(LiveClass);

    let vdos = LiveClass;

    let items = vdos.slice(0, 2).map(i => {
        return i
    });
    console.log(items);



    this.setState({
      class: Teacherlist,
        activeclass: items,
        loading:false
    })

  }

    gotoDetails = async (item) => {
        if (item.is_free === 1){
            this.props.navigation.navigate('UpcomingClassDetails', {
                id: item.id
            })
        }
        else if (this.props.User.is_premium === 1){
            this.props.navigation.navigate('UpcomingClassDetails', {
                id: item.id
            })
        }  else {
            Alert.alert(
                "Subscribe to premium plans",
                "This is a premium content. Only premium user can watch",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Subscribe ", onPress: () =>this.props.User.route = 1 }
                ],
                { cancelable: false }
            );
        }


    }

  renderButtons(teacher) {

      console.log(this.state.activeclass);
     if (this.state.activeclass === 'false') {
        console.log('active class is false')
     } else {
         return this.state.activeclass.map((item, index) => {
             return (
                 <Row style={{
                     justifyContent: 'flex-start',
                     alignItems: 'center',
                 }}>
                     <DashboardSchedule

                         onPress={() => this.gotoDetails(item)}
                         teacher={item.seminar_to_teacher.name}
                         url={BASE_URL + item.seminar_to_teacher.image}
                         title={item.title}
                         time={item.time}
                         image={item.image}
                         date={item.date}
                         is_free={item.is_free}
                         content={'Premium'}

                     />
                 </Row>
             );
         })
     }

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
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom:100
                      }}>



                      {this.renderButtons(this.state.class)}




                  </Grid>
              )}
      </Grid>
    );
  }
}

const styles = StyleSheet.create({});
