import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Aux from '../HOC/Auxiliary';
import NS from 'numeral-systems';

class DataItem extends React.Component {

    state = {
        loading: false,
        showZoomed: false
    }

    render() {

        const {
            itemContainer,
            left,
            center,
            right,
            bottomContainer,
            touchableContainer,
            ayatText,
            zoomedTextContainer,
            textBoxZoomed
        } = Styles;

        const {
            i,
            item,
            last,
            playAudio,
            hilighted,
            forceUpdate
        } = this.props;
        return (
            <Aux>
                {this.state.showZoomed ?
                    <View style={zoomedTextContainer}>
                        <View style={textBoxZoomed}>
                            <Text style={{ ...ayatText, fontSize: 22, fontFamily: 'QCF2' + item.page_number }}>{item.ayat_name}</Text>
                        </View>
                    </View>
                    :
                    null }
                <View style={{ ...itemContainer, marginBottom: last ? 10 : 0 }}>
                    <View style={left}>
                        <View style={bottomContainer}>
                            <Text>{NS(i, "Arabic")}</Text>
                        </View>
                    </View> 
                    <View style={center}>

                        <View style={{ ...bottomContainer, backgroundColor: hilighted ? '#ddd' : '#fff' }}>
                            <TouchableOpacity
                                onLongPress={() => this.setState({ showZoomed: true })}
                                onPressOut={() => this.setState({ showZoomed: false })}
                                onPress={playAudio.bind(this, item.id)}
                                activeOpacity={0.5}
                                style={touchableContainer}>
                                <Text style={{ ...ayatText, fontFamily: 'QCF2' + item.page_number }}>{item.ayat_name}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={right}>
                        <View style={bottomContainer}>
                            <Text>{NS(item.ayat, "Arabic")}</Text>
                        </View>
                    </View>
                </View >
            </Aux>
        );
    }
}

const Styles = StyleSheet.create({
    imageBg: {
        width: '100%',
        height: Dimensions.get('window').height
    },

    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    itemContainer: {
        width: '100%',
        height: 75,
        flexDirection: 'row',
        paddingHorizontal: 10
    },

    left: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    center: {
        flex: 2,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    right: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    bottomContainer: {
        flex: 2,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        marginTop: 10,
    },

    touchableContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    topBar: {
        width: '100%',
        height: 75,
        backgroundColor: '#fff',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    hamIconStyle: {
        height: 30,
        width: 30,
        margin: 30
    },

    ayatText: {
        textAlign: 'center',
        width: '100%'
    },

    pageNumberContainer: {
        width: '100%',
        height: 70,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pageNumberContainerInner: {
        backgroundColor: '#ddd',
        width: '95%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    zoomedTextContainer: {
        position: 'absolute',
        height: 75,
        width: '100%',
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    textBoxZoomed: {
        width: '55%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginRight: 5,
        borderColor: '#555',
        borderWidth: 2
    }

});

export default connect(null, actions)(DataItem);