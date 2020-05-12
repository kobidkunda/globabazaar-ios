import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, ImageBackground} from 'react-native';

let HEIGHT = Dimensions.get('screen').height;
let WIDTH = Dimensions.get('screen').width;

export default class Splash extends Component {


    render() {
        return (
            <ImageBackground style={{
                width:WIDTH,
                height:HEIGHT
            }} source={require('../Assets/Images/splashbg.png')}>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({});
