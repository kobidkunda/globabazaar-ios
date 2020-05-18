import YouTube from 'react-native-youtube';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AvatarTeacher from '../../../Component/AvatarTeacher';
import {Col, Grid} from 'react-native-easy-grid';
import {inject, observer} from 'mobx-react';
import {BASE_URL} from '../../../Config/URL';
@inject('Auth','User','Teacher')
@observer
export default class DasboardTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      console.log(Teacherlist)

      this.setState({
          teachers: Teacherlist
      })


  }

    renderButtons(teacher) {
        return teacher.map((item, index) => {
            return(
               <Col key={item.id}>
                   <AvatarTeacher
                       key={item.id}
                       url={BASE_URL+item.image}
                   />
               </Col>
            );
        })

    }

    render() {

    return (
      <Grid
        style={{
          width: 160,
        }}>
         {this.renderButtons(this.state.teachers)}

      </Grid>
    );
  }
}

const styles = StyleSheet.create({});
