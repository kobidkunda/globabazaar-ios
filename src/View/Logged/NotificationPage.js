import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {ListItem} from 'react-native-elements';
import {BLUEDARK, BLUESLIGHT} from '../../Config/theme';
import {inject, observer} from 'mobx-react';
import { Icon } from 'react-native-elements'


@inject('Auth','User')
@observer
export default class NotificationPage extends Component {
  static navigationOptions = {
    title: 'Notification',
    headerStyle: {
      backgroundColor: BLUESLIGHT,
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
      notification: [],
        loading:true
    };
  }

 async componentDidMount(): void {
    let _TOKEN =  await this.props.Auth.GetToken();

    let Allnotification = await this.props.User.GET_ALL_NOTIFICATION(_TOKEN);
    this.setState({
      notification: Allnotification.user_notifications,
        loading:false
    });

    console.log(Allnotification);
  }

  render() {


    return (
      <ScrollView style={{
          backgroundColor:'#dadada'
      }}>
          { this.state.loading === true ? (
              <ActivityIndicator size={'large'}/>
          ): null }


        {this.state.notification.map((l, i) => (
          <ListItem
            key={i}
            leftIcon={
                <Icon
                    name='bell'
                    type='simple-line-icon'
                    color='#517fa4'
                />
            }
            title={'New Video added'}
            subtitle={l.created_at}
            bottomDivider
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
