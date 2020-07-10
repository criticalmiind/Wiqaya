import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Aux from '../HOC/Auxiliary';

class ListItem extends React.Component {

    state = {
        expanded: false
    }

    _padPageNumber(number){
        let str = "" + number
        let pad = "000"
        return pad.substring(0, pad.length - str.length) + str;
    }

    render() {

        const {
            container,
            textStyle,
            imageStyle,
            touchStyle
        } = Styles;

        const {
            item,
            treeLevel,
            fetchRecord,
        } = this.props;

        let backgroundColor = null;
        switch (treeLevel) {
            case 1:
                backgroundColor = '#1976d2';
                break;

            case 2:
                backgroundColor = '#1e88e5';
                break;

            case 3:
                backgroundColor = '#2196f3';
                break;
            case 4:
                backgroundColor = '#42a5f5';
                break;
            case 5:
                backgroundColor = '#64b5f6';
                break;
            default:
                backgroundColor = '#fff';
                break;
        }

        if (!item.children) backgroundColor = '#eee';

        return (

            <View>
                <View style={{ ...container, paddingRight: 20 * treeLevel, backgroundColor }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (item.children) {
                                if (this.state.expanded) this.setState({ expanded: false });
                                else this.setState({ expanded: true });
                            } else {
                                fetchRecord(item.cid);
                            }
                        }}
                        style={touchStyle}>
                        <Aux>
                            <Text style={{ ...textStyle, color: treeLevel === 1 || treeLevel === 2 ? '#fff' : "#000" }}>
                                {item.name.replace('\n', ' ')}
                            </Text>
                            {
                                item.children ?
                                    <Image
                                        style={imageStyle}
                                        source={this.state.expanded ? require('../../Assets/up.png') : require('../../Assets/down.png')} />
                                    :
                                    null
                            }
                        </Aux>
                    </TouchableOpacity>
                </View>
                {item.children && this.state.expanded
                    ?
                    item.children.map((el, i) => <ListItem fetchRecord={fetchRecord} treeLevel={treeLevel + 1} key={i} item={el} />)
                    :
                    null
                }
            </View >
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 5,
        marginVertical: 1
    },

    containerCollapsed: {
        height: 0,
        overflow: 'hidden'
    },

    touchStyle: {
        flex: 1,
        flexDirection: 'row'
    },

    imageStyle: {
        width: 15,
        height: 15,
        marginLeft: 10
    },

    textStyle: {
        flex: 1,
        textAlign: 'right'
    }
});

export default ListItem;