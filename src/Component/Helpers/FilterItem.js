import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import Aux from '../HOC/Auxiliary';
import Slider from '@ptomasroos/react-native-multi-slider';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';


class FilterItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            min: this.props.currMin,
            max: this.props.currMax
        }
    }

    componentDidUpdate() {
        const {
            currMin,
            currMax,
        } = this.props;
        const {
            min,
            max
        } = this.state;
        if (currMax != max || currMin != min) this.setState({ min: currMin, max: currMax });
    }


    _padPageNumber(number){
        let str = "" + number
        let pad = "000"
        return pad.substring(0, pad.length - str.length) + str;
    }

    _slider(value, single){
        if (!single) {
            if ((parseInt(value[0]) > 0 && parseInt(value[0]) < parseInt(value[1]) && parseInt(value[1]) <= parseInt(this.props.max))) {
                if(value[0] !== value[1]-1){
                    switch (this.props.type) {
                        case "set_page_limit":
                            this.props.setLimit(this.props.type, [this._padPageNumber(value[0]), this._padPageNumber(value[1])]);
                            break;
                        case "set_juzz_limit":
                            this.props.setLimit(this.props.type, [parseInt(value[0]), parseInt(value[1])]);
                            break;
                        case "set_ayat_limit":
                            this.props.setLimit(this.props.type, [parseInt(value[0]), parseInt(value[1])]);
                            break;
                        case "set_repeat_limit":
                            this.setState({ max: value[0] })
                            this.props.setLimit(type, [parseInt(this.props.min), parseInt(value[0])]);
                            break;
                        default:
                            break;
                    }
                    this.setState({ min: value[0], max: value[1] })
                    // this.props.onPress()
                }
            }
        }else {
            this.setState({ max: value[0] })
            this.props.setLimit(this.props.type, [parseInt(this.props.min), parseInt(value[0])]);
            // this.props.onPress()
        }
    }

    _minInputBox(text){
        if ((parseInt(text) > 0 && parseInt(this.props.currMax) > parseInt(text))) {
            if (text) {
                if(this.props.max > text){
                    switch (this.props.type) {
                        case "set_page_limit":
                            this.props.setLimit(this.props.type, [this._padPageNumber(text), this._padPageNumber(this.props.currMax)]);
                            break;
                        case "set_juzz_limit":
                            this.props.setLimit(this.props.type, [parseInt(text), parseInt(this.props.currMax)]);
                            break;
                        case "set_ayat_limit":
                            this.props.setLimit(this.props.type, [parseInt(text), parseInt(this.props.currMax)]);
                            break;
                        case "set_repeat_limit":
                            this.props.setLimit(this.props.type, [parseInt(text), parseInt(this.props.currMax)]);
                            break;
                        default:
                            break;
                    }
                    this.setState({ min: text });
                }
            }
        }
    }

    _maxInputBox(text){
        if ((parseInt(this.props.min) > 0 && parseInt(text) > parseInt(this.props.min)) && parseInt(this.props.max) >= parseInt(text)) {
            if (text) {
                switch (this.props.type) {
                    case "set_page_limit":
                        this.props.setLimit(this.props.type, [this._padPageNumber(this.props.currMin), this._padPageNumber(text)]);
                        break;
                    case "set_juzz_limit":
                        this.props.setLimit(this.props.type, [parseInt(this.props.currMin), parseInt(text)]);
                        break;
                    case "set_ayat_limit":
                        this.props.setLimit(this.props.type, [parseInt(this.props.currMin), parseInt(text)]);
                        break;
                    case "set_repeat_limit":
                        this.props.setLimit(this.props.type, [parseInt(this.props.currMin), parseInt(text)]);
                        break;
                
                    default:
                        break;
                }
                this.setState({ max: text });
            }
        }
    }

    render() {

        const {
            container,
            textStyle,
            iconStyle,
            limitsContainer,
            topLimitsContainer,
            inputStyle,
            bottomLimitsContainer,
        } = Styles;

        const {
            type,
            title,
            currMin,
            currMax,
            min,
            max,
            setLimit,
            single,
            onPress,
            childExpanded,
            name,
        } = this.props;

        const {
            expanded
        } = this.state;

        return (
            <Aux>
                <TouchableOpacity
                    onPress={onPress.bind(this, name)}
                    activeOpacity={0.7}>
                    <View style={container}>
                        <Text style={textStyle}>{title}</Text>
                        <Image resizeMode='contain' style={iconStyle} source={this.state.expanded ? require('../../Assets/up.png') : require('../../Assets/down.png')} />
                    </View>
                </TouchableOpacity>
                {childExpanded === name ?
                    <View style={limitsContainer}>
                        <View style={topLimitsContainer}>
                            <Slider
                                sliderLength={Dimensions.get('window').width * 0.65}
                                enabledOne
                                enabledTwo
                                markerStyle={{ width: 20, height: 20 }}
                                min={min}
                                max={max}
                                allowOverlap={false}
                                values={single ? [currMax] : [ parseInt(currMin), parseInt(currMax)]}
                                onValuesChangeFinish={value => {
                                    this._slider(value, single)
                                }} />
                        </View>
                        <View style={bottomLimitsContainer}>
                            {!single ?
                                <Aux>
                                    <Text>
                                        حد أدنى
                                    </Text>
                                    <TextInput
                                        placeholder={!isNaN(this.state.min) ? `${this.state.min}` : ''}
                                        placeholderTextColor={'black'}
                                        keyboardType='number-pad'
                                        maxLength={3}
                                        onChangeText={text => {
                                            this._minInputBox(text)
                                        }}
                                        style={inputStyle} />
                                </Aux>
                                :
                                null}
                            <Text>
                                حد اقصي
                            </Text>
                            <TextInput
                                keyboardType='number-pad'
                                maxLength={3}
                                onChangeText={text => {
                                    this._maxInputBox(text)
                                }}
                                placeholder={!isNaN(this.state.max) ? `${this.state.max}` : ''}
                                placeholderTextColor={'black'}

                                style={inputStyle} />
                        </View>
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

    limitsContainer: {
        width: '100%',
        height: 100,
        backgroundColor: '#ddd',
        borderRadius: 5
    },

    topLimitsContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    bottomLimitsContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    inputStyle: {
        width: '20%',
        height: '60%',
        backgroundColor: '#fff',
        padding: 0,
        paddingLeft: 5,
        borderRadius: 5,
        borderWidth: 1
    },

    sliderStyle: {
        width: 100,
    }
})

export default connect(null, actions)(FilterItem);