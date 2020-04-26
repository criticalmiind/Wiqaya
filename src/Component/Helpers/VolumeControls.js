import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Aux from '../HOC/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Slider from '@ptomasroos/react-native-multi-slider';

class VolumeControls extends React.Component {

    state = {
        expanded: false
    }

    renderMarker() {
        return <Image style={{ width: 30, height: 30 }} resizeMode='contain' source={require('../../Assets/Volume.png')} />;
    }


    render() {

        const {
            container,
            textStyle,
            iconStyle,
            volumeControlsContainer,
            topContainer,
            bottomContainer,
            speedTextStyle,
            volumeTextStyle
        } = Styles;

        const {
            playing,
            reciters,
            volume,
            speed,
            setSpeed,
            setVolume,
            name,
            onPress,
            childExpanded
        } = this.props;

        return (
            <Aux>
                <TouchableOpacity
                    onPress={onPress.bind(this, name)}
                    activeOpacity={0.7}>
                    <View style={container}>
                        <Text style={textStyle}>الصوت</Text>
                        <Image resizeMode='contain' style={iconStyle} source={this.state.expanded ? require('../../Assets/up.png') : require('../../Assets/down.png')} />
                    </View>
                </TouchableOpacity>
                {childExpanded === name ?
                    <View style={volumeControlsContainer}>
                        <View style={topContainer}>
                            <Text style={speedTextStyle}>سرعة</Text>
                            <Slider
                                min={0.5}
                                selectedStyle={{ backgroundColor: '#42a5f5' }}
                                customMarker={this.renderMarker}
                                max={1.5}
                                step={0.1}
                                values={[speed.i]}
                                onValuesChangeFinish={e => {
                                    if(playing){
                                        setSpeed(e[0]);
                                    }
                                }}
                                sliderLength={Dimensions.get('window').width / 2} />

                        </View>
                        {/* <View style={bottomContainer}>
                            <Text style={volumeTextStyle}>مستوى الصوت</Text>
                            <Slider
                                min={0}
                                selectedStyle={{ backgroundColor: '#42a5f5' }}
                                customMarker={this.renderMarker}
                                max={1}
                                step={0.025}
                                values={[this.state.volume]}
                                onValuesChangeFinish={e => {
                                    console.log(e);
                                    // setVolume(e[0]);
                                    VolumeControl.change(e[0]);
                                }}
                                sliderLength={Dimensions.get('window').width * 0.68} />
                        </View> */}
                    </View>
                    :
                    null
                }
            </Aux>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#42a5f5',
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 1,
        flexDirection: 'row'
    },

    textStyle: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 10
    },

    iconStyle: {
        width: 15,
        height: 15,
        marginRight: 20
    },

    volumeControlsContainer: {
        width: '100%',
        height: 70,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },

    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },

    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },

    speedTextStyle: {
        width: '70%',
        textAlign: 'right',
        paddingRight: 10
    },


    volumeTextStyle: {
        width: '100%',
        textAlign: 'right',
        paddingRight: 10
    },



});

const mapStateToProps = state => {
    return {
        ...state.home
    }
}

export default connect(mapStateToProps, actions)(VolumeControls);