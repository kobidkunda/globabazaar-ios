import React, {Component} from "react";
import {BLUEDARK, BLUESLIGHT, HEIGHT, WIDTH} from "../../../Config/theme";
import LinearGradient from "react-native-linear-gradient";
import {Image, StatusBar, View} from "react-native";
import Shimmer from 'react-native-shimmer';
import LottieView from "lottie-react-native";

export default class Loading extends Component{
    async componentDidMount() {
        this.animation.play();
        // Or set a specific startFrame and endFrame with:

    }
    render() {
        return <LinearGradient
            colors={[BLUEDARK, BLUESLIGHT]}
            start={{x: 0.0, y: 0.8}}
            end={{x: 1.0, y: 1.0}}
            style={{
                height: HEIGHT,
                //  backgroundColor: props.bgcolor,
            }}>
            <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
               <View style={{
                   flex:1,
                   justifyContent: 'center',
                   alignItems: 'center',
               }}>
                   <Shimmer intensity={0.8} opacity={0.7} tilt={33} duration={1000}>

                       <Image
                           style={{
                               width: 150,
                               height: 150,
                               justifyContent: 'center',
                               alignItems: 'center',

                           }}
                           source={require('../../../Assets/Images/logo/pure-white.png')}
                       />
                   </Shimmer>
               </View>

                <View
                    style={{
                        flex:1,
                        //marginTop: HEIGHT - 250,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <LottieView
                        style={{
                            height: 150,
                            width: 150,
                        }}
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={require('../../../Assets/lottie/lf30_editor_l54CXx')}
                    />
                </View>
            </View>



            <StatusBar
                hidden={false}
                translucent={true}
                backgroundColor={'rgba(255,255,255,0.0)'}
            />


        </LinearGradient>;
    }

}
