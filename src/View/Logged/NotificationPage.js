import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {BLUEDARK} from '../../Config/theme';
import {inject, observer} from 'mobx-react';


@inject('Auth','User')
@observer
export default class NotificationPage extends Component {
  static navigationOptions = {
    title: 'Notification',
    headerStyle: {
      backgroundColor: BLUEDARK,
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
    };
  }

 async componentDidMount(): void {
    let _TOKEN =  await this.props.Auth.GetToken();

    let Allnotification = await this.props.User.GET_ALL_NOTIFICATION(_TOKEN);
    this.setState({
      notification: Allnotification.user_notifications
    });

    console.log(Allnotification);
  }

  render() {


    return (
      <View>
        {this.state.notification.map((l, i) => (
          <ListItem
            key={i}
            title={l.user_id}
            subtitle={l.user_id}
            bottomDivider
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
