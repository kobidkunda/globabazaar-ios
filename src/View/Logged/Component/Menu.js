import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {inject, observer} from 'mobx-react';
import { ListItem } from 'react-native-elements'
import LinearGradient from "react-native-linear-gradient";
import { Avatar } from 'react-native-elements';
import { Icon } from 'react-native-elements'

import {FloatingAction} from "react-native-floating-action";
import AsyncStorage from '@react-native-community/async-storage';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;
@inject("Auth","User","Config")
@observer
export default class Mainmenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: false,
            user:[],
            usermoredetails:[],
            mainmenu:[],
            productmenu:[]
        };
    }


    async componentWillMount() {
        let menuproduct = this.props.Config.menuproduct;
        let menumain = this.props.Config.menumain;
        let userdetails = this.props.User.userdetails;


        this.setState({
            user: JSON.parse(userdetails),
            mainmenu:JSON.parse(menumain),
            productmenu:JSON.parse(menuproduct)
        });
        let moredetails = await this.props.User.UserDetailsmoredet();
        //   console.log(moredetails);

        this.setState({
            usermoredetails : moredetails
        })





    }

    onLogout = async () => {

        console.log('kkkk')
        await AsyncStorage.removeItem('@token_type');
        await AsyncStorage.removeItem('@access_token');
        await AsyncStorage.removeItem('@refresh_token');
        this.props.Auth.auth = false;

    }

    onProductPress = async (l) => {
        await this.props.Config.ToggleMenu()
        this.props.navigation.navigate('CategoryView', {category: l});

    }

    onMainPress = async (l) => {
        await this.props.Config.ToggleMenu()
        this.props.navigation.navigate(l.slug);

    }


    render() {


        return (

            <View>

                <Modal isVisible={this.props.Config.menuvisible}
                       animationIn={'slideInLeft'	}
                       animationInTiming={1000}
                       useNativeDriver={true}
                       animationOut={'slideOutLeft'	}
                       animationOutTiming={1000}
                       onBackdropPress={() => this.props.Config.ToggleMenu()}
                       swipeDirection={'left'}
                       onSwipeComplete={() => this.props.Config.ToggleMenu()}

                >
                    <View
                        style={{
                            flex: 1,
                            position:'absolute',
                            backgroundColor: this.props.Config.theme.COLORBACKGROUND,
                            width: WIDTH - 100,
                            height:HEIGHT,
                            left: -20,
                            top:-20
                        }}>
                        <View style={{
                            flex:1
                        }}>
                            <View
                                style={{
                                    flex:2
                                }}
                            >
                                <LinearGradient
                                    colors={['#006ac4', '#0073c4', '#0094ff']} style={{
                                    flex:1,
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                    // backgroundColor: 'rgb(0,133,233)',
                                }}>

                                    <Avatar
                                        rounded
                                        size="medium"
                                        //  onPress={() => this.onPresssbttn()}
                                        source={{

                                            uri:moredetails.selfile

                                        }}

                                        containerStyle={{
                                            paddingTop:6
                                        }}
                                    />

                                    <Text style={{
                                        fontFamily: 'MontserratSemiBold',
                                        fontSize:15,
                                        paddingTop:7,
                                        textTransform: 'uppercase',
                                        color:'#ffffff'
                                    }}>{this.state.user.fname} {this.state.user.lname} </Text>

                                    <View style={{
                                        flex:1,
                                        flexDirection:'row'
                                    }}>
                                        <View style={{
                                            flex:1,
                                            width:70,
                                            justifyContent: 'center',
                                            alignItems: 'flex-end',

                                        }}>
                                            <Icon
                                                style={{
                                                    //  textAlign:'right',
                                                    //  marginRight:34
                                                }}
                                                size={16}
                                                type='entypo'
                                                name='flow-tree'
                                                color='#ffffff' />
                                        </View>
                                        <View style={{
                                            flex:1,
                                            width:70,
                                            justifyContent: 'center',
                                            //alignItems: 'center',

                                        }}>
                                            <Text style={{
                                                paddingLeft:8,
                                                paddingBottom:8,
                                                textAlign:'left',
                                                fontFamily: 'MontserratSemiBold',
                                                fontSize:19,
                                                paddingTop:7,
                                                textTransform: 'uppercase',
                                                color:'#ffffff'
                                            }}>{this.state.user.commission}  </Text>
                                        </View>

                                    </View>






                                </LinearGradient>

                            </View>

                            <View style={{
                                flex:10
                            }}>



                                <View style={{
                                    paddingTop:7,
                                    borderTopWidth:1,
                                    borderColor:'#eeeeee'
                                }}>

                                    <ListItem
                                        key={i}
                                        title={l.title}
                                        containerStyle={{
                                            height:40,
                                            backgroundColor:this.props.Config.theme.COLORBACKGROUND
                                        }}
                                        onPress={() =>  this.onMainPress(l) }
                                        //    bottomDivider={true}
                                        leftIcon={<Icon
                                            size={15}
                                            name={l.iconname}
                                            type={l.icon}
                                            color={COLOR1}
                                            onPress={() => console.log('hello')} />}
                                        titleStyle={{ color: this.props.Config.theme.COLORFOREGROUND, fontWeight: 'bold',
                                            fontSize: 12,
                                            textTransform: 'uppercase',
                                            fontFamily: "MontserratBold"
                                        }}
                                    />

                                </View>





                            </View>

                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
