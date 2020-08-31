import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AvatarTeacher from '../../../Component/AvatarTeacher';
import {Col, Grid} from 'react-native-easy-grid';
import {inject, observer} from 'mobx-react';
import {BASE_URL} from '../../../Config/URL';
import CircleLoader from '../../../Component/Loader/CircleLoader';
import * as Animatable from "react-native-animatable";
@inject('Auth','User','Teacher')
@observer
export default class DasboardTeacher extends Component {
  constructor(props) {
    super(props);


    this.state = {
        loading: true,
        teachers: [
            {
                name: 'https://randomuser.me/api/portraits/women/47.jpg'
            },{
                name: 'https://randomuser.me/api/portraits/women/47.jpg'
            },{
                name: 'https://randomuser.me/api/portraits/women/47.jpg'
            },
        ]

    };
  }

 async componentDidMount(): void {

      let _Token = await  this.props.Auth.GetToken();
      let Teacherlist = await  this.props.Teacher.GetRandomTeacher(await _Token);
      //console.log(Teacherlist)

     this.setState({
          teachers: Teacherlist,
          loading: false,

      })


  }




    renderButtons(teacher) {


        return teacher.map((item, index) => {
            return (
                <Col key={item.id}>


                    <AvatarTeacher
                        key={item.id}
                        url={BASE_URL+item.image}
                    />




                </Col>
            )
        })

    }

    render() {

    return (
      <Grid style={{
          width: 160,
      }}>
          {this.state.loading === true? (
                  <Grid
                      style={{

                      }}>
                <Col ><CircleLoader/></Col>
                <Col ><CircleLoader/></Col>
                <Col><CircleLoader/></Col>
                  </Grid>
             ) :
              (
                  <Grid
                      style={{
                      }}>
              {this.renderButtons(this.state.teachers)}
                  </Grid>
          )}

      </Grid>
    );
  }
}

const styles = StyleSheet.create({});
