import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Aux from '../HOC/Auxiliary';
import FilterItem from './FilterItem';
import RecitersList from './RecitersList';

class Filters extends React.Component {
    state = {
        expanded: false,
        childExpanded: 'none'
    }

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

        const {
            pageFilter,
            juzzFilter,
            ayatFilter,
            voiceFilter,
            reciters,
            drawerClose
        } = this.props;

        const {
            expanded
        } = this.state;
        return (
            <Aux>
                <View style={container}>
                    <TouchableOpacity onPress={() => {
                        if (expanded) this.setState({ expanded: false, childExpanded: 'none' });
                        else this.setState({ expanded: true });
                    }}>
                        <View style={titleContainer}>
                            <Text style={textStyle}>
                                مرشحات
                    </Text>
                            <Image
                                style={imageStyle}
                                source={expanded ? require('../../Assets/up.png') : require('../../Assets/down.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                {pageFilter && expanded ? <FilterItem {...pageFilter} name='pageFilter' childExpanded={this.state.childExpanded} onPress={this.onFilterClick} /> : null}
                {juzzFilter && expanded ? <FilterItem {...juzzFilter} name='juzzFilter' childExpanded={this.state.childExpanded} onPress={this.onFilterClick} /> : null}
                {ayatFilter && expanded ? <FilterItem {...ayatFilter} name='ayatFilter' childExpanded={this.state.childExpanded} onPress={this.onFilterClick} /> : null}
                {voiceFilter && expanded ? <FilterItem name='voiceFilter' childExpanded={this.state.childExpanded} single {...voiceFilter} onPress={this.onFilterClick} /> : null}
                {reciters.i && expanded ? <RecitersList name='reciters' childExpanded={this.state.childExpanded} reciters={reciters} onPress={this.onFilterClick} /> : null}
            </Aux>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#1976d2',
        borderRadius: 5,
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
})

export default Filters;