import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import Aux from '../HOC/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Sound from 'react-native-sound';
import constants from '../../constants';

class RecitersList extends React.Component {

    state = {
        expanded: false,
        loading: false
    }

    componentDidMount() {
        constants.forceUpdate = () => this.forceUpdate();
    }

    render() {

        const {
            container,
            imageStyle,
            reciterTextStyle,
            textStyle,
            childContainer
        } = Styles;

        const {
            name,
            onPress,
            childExpanded
        } = this.props;

        return (
            <Aux>
                <TouchableOpacity
                    onPress={onPress.bind(this, name)}
                    activeOpacity={0.75}>
                    <View style={container}>
                        {this.state.loading ? <ActivityIndicator color='#222' size='small' /> : null}
                        <Text style={textStyle}>
                            راوي
                        </Text>
                        <Image
                            style={imageStyle}
                            source={require('../../Assets/up.png')} />
                    </View>
                </TouchableOpacity>
                {childExpanded === name ?
                    this.props.reciters.i.map((el, i) =>{
                        return (<TouchableOpacity
                            onPress={async () => {
                                if (this.props.playing.playing) this.props.playing.playing.release();
                                if (this.props.discardPlayback) this.props.discardPlayback();
                                this.setState({ loading: true });
                                this.props.setPlaying(new Sound(
                                    constants.audioUrl + el,
                                    null,
                                    e => {
                                        if (e) console.log('failed ', e);
                                        this.setState({ loading: false });
                                        this.props.playing.playing.play();
                                    }
                                ).setSpeed(this.props.speed).setVolume(this.props.volume));
                            }}
                            key={i}
                            activeOpacity={0.75}>
                            <View style={childContainer}>
                                <Text style={reciterTextStyle}>
                                    {el}
                                </Text>
                            </View>
                        </TouchableOpacity>)
                        })
                    :
                    null
                }

            </Aux>);
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#42a5f5',
        paddingVertical: 10,
        paddingLeft: 10,
        borderRadius: 5,
        flexDirection: 'row',
        marginVertical: 1
    },

    childContainer: {
        width: '100%',
        backgroundColor: '#ddd',
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        marginVertical: 1
    },

    imageStyle: {
        width: 15,
        height: 15,
        marginRight: 20
    },

    textStyle: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 10
    },

    reciterTextStyle: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 40
    }
});

const mapStateToProps = state => {
    return {
        ...state.home //for simple store
        // ...state.reducers.home // for persist store
    }
}

export default connect(mapStateToProps, actions)(RecitersList);