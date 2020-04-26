import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native';
import Aux from '../HOC/Auxiliary';
import AuioPlayerControls from './AudioPlayerControls';
import VolumeControls from './VolumeControls';


class Controls extends React.Component {



    state = {
        expanded: false,
        childExpanded: 'none'
    };

    onFilterClick = (e) => {
        if (this.state.childExpanded === e) {
            this.setState({ childExpanded: 'none' });
            return;
        }
        this.setState({ childExpanded: e });
    }

    render() {

        const {
            container,
            titleContainer,
            textStyle,
            imageStyle
        } = Styles;

        return (
            <Aux>
                <View style={container}>
                    <TouchableOpacity onPress={() => {
                        if (this.state.expanded) this.setState({ expanded: false, childExpanded: 'none' });
                        else this.setState({ expanded: true });
                    }}>
                        <View style={titleContainer}>
                            <Text style={textStyle}>
                                ضوابط الصوت
                        </Text>
                            <Image
                                style={imageStyle}
                                source={this.state.expanded ? require('../../Assets/up.png') : require('../../Assets/down.png')} />
                        </View>
                    </TouchableOpacity>
                </View>

                {this.state.expanded ?
                    <Aux>
                        <AuioPlayerControls name='audioPlayer' childExpanded={this.state.childExpanded} onPress={this.onFilterClick} />
                        <VolumeControls name='volumeControl' childExpanded={this.state.childExpanded} onPress={this.onFilterClick} />
                    </Aux>
                    :
                    null
                }
                <View style={{ height: 300 }}></View>
            </Aux>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#1976d2',
        borderRadius: 5,
        margin: 1
    },

    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20,
        overflow: 'hidden'
    },

    textStyle: {
        flex: 1,
        paddingVertical: 10,
        color: '#fff',
        textAlign: 'right'
    },

    imageStyle: {
        width: 15,
        height: 15,
        marginLeft: 10
    },
});

export default Controls;