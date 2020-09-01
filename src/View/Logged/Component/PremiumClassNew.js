
import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import {Row, Grid, Col} from 'react-native-easy-grid';
import DashboardSchedule from '../../../Component/DashboardSchedule';
import AvatarTeacher from '../../../Component/AvatarTeacher';
import {BASE_URL} from '../../../Config/URL';
import {inject, observer} from 'mobx-react';
import CircleLoader from '../../../Component/Loader/CircleLoader';
import ClassLoader from '../../../Component/Loader/ClassLoader';
import { ListItem } from 'react-native-elements'
import {WIDTH} from "../../../Config/theme";
import { FlatGrid } from 'react-native-super-grid';
import EmptyClass from "./EmptyClass";
import {TEXTNLBLACK} from "../../../Style/TextStyle";


@inject('Auth','User','Class')
@observer
export default class PremiumClassNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
      class : [],
        empty:false,

        activeclassprem: [
        ]
    };
  }

async  componentDidMount(): void {
    let _Token = await  this.props.Auth.GetToken();
    console.log('premium class')
    let LiveClass = await this.props.User.getLiveClass(_Token);
    console.log(LiveClass);

    if (LiveClass !==  'false' ){
        this.setState({
    activeclassprem: LiveClass,
        loading:false
})
} else {
    this.setState({
        // activeclassprem: [],
        empty:true,
        loading:false
    })
}

  }



   gotoDetails = async (item) => {

       if (item.is_free === 1){
           this.props.navigation.navigate('UpcomingClassDetails43', {
               id: item.id
           })
       }
       else if (this.props.User.is_premium === 1){
           this.props.navigation.navigate('UpcomingClassDetails43', {
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


  render() {

      const list = this.state.activeclassprem
      console.log(this.state.activeclassprem)


    return (

                  <View style={{
                  }}>
                      <FlatGrid
                          itemDimension={WIDTH}
                          data={list}
                          ListHeaderComponent={
                              <View>
                                  {this.state.empty ? (
                                      <View style={{
                                          flex: 1,
                                          //marginTop: HEIGHT - 250,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                      }}>

                                          <EmptyClass/>
                                          <TEXTNLBLACK>No Active Class</TEXTNLBLACK>

                                      </View>
                                  ) : null}

                              </View>
                          }
                          renderItem={({ item }) => (

                              <DashboardSchedule

                                  onPress={() => this.gotoDetails(item) }
                                   teacher={item.seminar_to_teacher.name}
                                   url={BASE_URL + item.seminar_to_teacher.image}
                                  title={item.title}
                                  time={item.time}
                                  date={item.date}
                                  is_free={item.is_free}
                                  image={item.image}
                                  content={'Premium'}

                              />
                          )}
                      />







                  </View>

    );
  }
}

const styles = StyleSheet.create({});
