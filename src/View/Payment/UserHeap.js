import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;
import {Avatar} from 'react-native-elements';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {TEXTLLG} from '../../Style/TextStyle';

export default class UserHeap extends Component {
  static navigationOptions = {
    title: 'UserHeap',
    headerStyle: {
      backgroundColor: '#2eb79e',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    return (

         <View style={{
             alignItems: 'center',
             justifyContent: 'center',
         }}>
             <Grid style={{
                 padding:20,
                 width:WIDTH,
                 alignItems: 'center',
                 justifyContent: 'center',

             }}>
                 <Col><Avatar size={70} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
                 <Col><Avatar size={50} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
                 <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
                 <Col><Avatar size={45} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             </Grid>

             <Grid style={{
                 padding:20,
                 width:WIDTH,
                 alignItems: 'center',
                 justifyContent: 'center',
             }}>
                 <Col><Avatar size={65} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
                 <Col><Avatar size={70} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
                 <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
                 <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             </Grid>


             <Grid style={{
                 padding:20,
                 width:WIDTH,
                 alignItems: 'center',
                 justifyContent: 'center',
         }}>
             <Col><Avatar size={65} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={40} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={50} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
         </Grid>

             <Grid style={{
             padding:20,
             width:WIDTH,
             alignItems: 'center',
             justifyContent: 'center',
         }}>
             <Col><Avatar size={65} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={70} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
         </Grid>

             <Grid style={{
             padding:20,
             width:WIDTH,
             alignItems: 'center',
             justifyContent: 'center',
         }}>
             <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={45} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={70} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={70} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
         </Grid>

             <Grid style={{
             padding:20,
             width:WIDTH,
             alignItems: 'center',
             justifyContent: 'center',
         }}>
             <Col><Avatar size={70} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={87} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             <Col><Avatar size={66} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
         </Grid>

             <Grid style={{
                 padding:20,
                 width:WIDTH,
                 alignItems: 'center',
                 justifyContent: 'center',
             }}>
                 <Col><Avatar size={65} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
                 <Col><Avatar size={70} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
                 <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
                 <Col><Avatar size={60} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/></Col>
             </Grid>

         </View>


    );
  }
}

const styles = StyleSheet.create({});
