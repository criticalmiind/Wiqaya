import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Aux from '../HOC/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';


class AudioPlayerControls extends React.Component {

    state = {
        expanded: false
    }

    render() {

        const {
            container,
            textStyle,
            iconStyle,
            playerContainer,
            backwardButton,
            forwardButton,
            playpauseButton,
            nameContainer
        } = Styles;

        const {
            childExpanded,
            onPress,
            name,
            playButton,
            nextButton,
            previousButton
        } = this.props;

        return (
            <Aux>
                <TouchableOpacity
                    onPress={onPress.bind(this, name)}
                    activeOpacity={0.7}>
                    <View style={container}>
                        <Text style={textStyle}>مشغل الصوت</Text>
                        <Image resizeMode='contain' style={iconStyle} source={this.state.expanded ? require('../../Assets/up.png') : require('../../Assets/down.png')} />
                    </View>
                </TouchableOpacity>
                {childExpanded === name ?
                    <Aux>
                        <View style={playerContainer}>
                            <TouchableOpacity
                                onPress={nextButton}
                                activeOpacity={0.7}>
                                <Image source={require('../../Assets/Backward-Button.png')} resizeMode='contain' style={backwardButton} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={playButton}
                                activeOpacity={0.7}>
                                <Image source={require('../../Assets/play-pause.png')} resizeMode='contain' style={playpauseButton} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={previousButton}
                                activeOpacity={0.7}>
                                <Image source={require('../../Assets/Forward-Button.png')} resizeMode='contain' style={forwardButton} />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={nameContainer}>
                            <Text>
                                {this.props.playing.playing ? this.props.playing.playing.getName().split('/')[this.props.playing.playing.getName().split('/').length - 1] : 'No audio playing'}
                            </Text>
                        </View> */}
                    </Aux>
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

    playerContainer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
        justifyContent: 'space-evenly'
    },

    backwardButton: {
        width: 20,
        height: 20
    },

    playpauseButton: {
        width: 40,
        height: 40
    },

    forwardButton: {
        width: 20,
        height: 20
    },

    nameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 10
    }
});

const mapStateToProps = state => {
    return {
        ...state.home //for simple store
        // ...state.reducers.home // for persist store
    }
}

export default connect(mapStateToProps, actions)(AudioPlayerControls);