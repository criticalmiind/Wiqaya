import React from 'react';
import { Animated, View, StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Aux from '../HOC/Auxiliary';
import Drawer from './Drawer';
import constants from '../../constants';


class DrawerContainer extends React.Component {

    state = {
        closeDrawer: false
    }

    componentDidMount() {
        constants.closeDrawer = () => {
            this.setState({ closeDrawer: true });
            Keyboard.dismiss();
        }
    }

    render() {
        const {
            container,
            modal
        } = Styles;

        const {
            drawer,
            drawerColse
        } = this.props;

        let slideLeft = null;
        let opacity = null;

        const time = 100;

        if (drawer === 'open' && !this.state.closeDrawer) {
            slideLeft = new Animated.Value(-500);
            opacity = new Animated.Value(0);
            Animated.parallel([Animated.timing(slideLeft, {
                toValue: 0,
                timing: time
            }),
            Animated.timing(opacity, {
                toValue: 0.5,
                timing: time
            })
            ]).start();
        }

        if (this.state.closeDrawer) {
            slideLeft = new Animated.Value(0);
            opacity = new Animated.Value(0.5);

            Animated.parallel([Animated.timing(slideLeft, {
                toValue: -500,
                timing: time
            }),
            Animated.timing(opacity, {
                toValue: 0,
                timing: time
            })
            ]).start(() => {
                this.setState({ closeDrawer: false });
                drawerColse();
            });
        }

        return (
            <Aux>
                {drawer === 'open' ?
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({ closeDrawer: true });
                            Keyboard.dismiss();
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'red'
                        }}>
                        <Animated.View style={{ ...modal, opacity }}>

                        </Animated.View>
                    </TouchableWithoutFeedback>
                    :
                    null
                }
                <Animated.View style={{ ...container, right: drawer === 'open' ? slideLeft : -500 }}>
                    <Drawer drawerColse={drawerColse} />
                </Animated.View>
            </Aux>
        );
    }
}

const Styles = StyleSheet.create({
    modal: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#000',
    },

    container: {
        width: Dimensions.get('window').width * 0.8,
        height: '100%',
        position: 'absolute',
        zIndex: 10,
        backgroundColor: '#fff'
    }
});

export default DrawerContainer;