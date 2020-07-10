import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import CategoryItem from './CategoryItem';


class Drawer extends React.Component {

    render() {

        const {
            categoriesTree,
            drawerColse
        } = this.props;

        const {
            container,
            pictureContainer,
            logoStyle,
            listContainer
        } = Styles;

        return (
            <View style={container}>
                <View style={pictureContainer}>
                    <Image style={logoStyle}
                        source={require('../../Assets/logo.png')}
                        resizeMode='contain' />
                </View>
                {categoriesTree ? <CategoryItem drawerColse={drawerColse} data={categoriesTree} /> : null}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },

    pictureContainer: {
        width: '100%',
        height: '25%',
        backgroundColor: '#1976d2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    logoStyle: {
        height: '75%'
    },


})

const mapStateToProps = state => {
    return {
        ...state.home //for simple store
        // ...state.reducers.home // for persist store
    }
}

export default connect(mapStateToProps)(Drawer);