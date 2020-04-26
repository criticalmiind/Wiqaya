import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, Platform, TouchableOpacity, ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Aux from '../HOC/Auxiliary';
import SplashScreen from 'react-native-splash-screen';
import DataItem from '../Helpers/DataItem';
import { FlatList } from 'react-native-gesture-handler';
import NS from 'numeral-systems';
import Modal from 'react-native-modal';
import Select from 'react-native-picker-select';


class Home extends React.Component {

    state = {
        headerSurahName: '',
        modal: false,
        loading: true,
        // loading: false,
        error: false,
        currPage: '',
        dropDownIndex:0,
        viewableItems: null
    }

    componentDidMount() {
        SplashScreen.hide();
        const { 
            getCategories,
            getAllRecords
        } = this.props;
        getCategories();
        const callbackSuccess = () => {
            this.setState({ loading: false });
        }
        const callbackFailure = () => { 
            this.setState({ loading: false, error: true });
        }
        getAllRecords(callbackSuccess, callbackFailure);
        this.props.setForceUpdate(() => this.forceUpdate());
    }

    componentDidUpdate() {
        const {
            allCategories,
            categoriesTree,
            setCategoriesTree
        } = this.props;
        if (!categoriesTree && allCategories) setCategoriesTree(this.makeCategoriesTree([...allCategories]));
    }

    makeCategoriesTree(data, parentElement) {
        if (!parentElement) {
            parentElement = data[0];
        }
        let i = 0;
        while (i < data.length) {
            if (parentElement.cid === data[i].parent_id) {
                if (!parentElement.children) {
                    parentElement.children = [];
                }
                if (!parentElement.children.find(el => data[i].cid === el.cid)) parentElement.children.push(data[i]);
                data.splice(i, 1);
                parentElement.children.forEach(parent => {
                    this.makeCategoriesTree(data, parent);
                });
                i--;
            } else {
                i++;
            }
        }
        return data;
    }

    onViewableItemsChanged = ({ viewableItems }) => {
        try {
            if (viewableItems) {
                if (!this.state.headerSurahName || (viewableItems[4].item.surah_name !== this.state.headerSurahName)) this.setState({ headerSurahName: viewableItems[4].item.surah_name, viewableItems: viewableItems });
                else this.setState({ viewableItems: viewableItems })
            }
        } catch (e) {

        }
    }

    _padPageNumber(number){
        let str = "" + number
        let pad = "000"
        return pad.substring(0, pad.length - str.length) + str;
    }
 
    renderListItem = () => {
        const {
            left,
            center,
            right,
            topContainer,
            itemTitleContainer,
            paginationContainer,
            selectorContainer,
            pageNavTouch,
        } = Styles;

        const {
            currentPage,
            pagesArray,
            setCurrentPage,
            playbackIndex
        } = this.props;

        if (this.list && playbackIndex.i) if (this.state.viewableItems) {
            const found = this.state.viewableItems.find(el => el.index === playbackIndex.i);
            if (!found){
                this.list.scrollToIndex({ animated: true, index: playbackIndex.i-1 });
            }
        }

        if(parseInt(this.props.pageFilter.currMin) <= parseInt(currentPage.page) && parseInt(this.props.pageFilter.currMax) >= parseInt(currentPage.page)){
            if (currentPage) {
                this.state.currPage = currentPage.page;
                if (currentPage.data) {
                    currentPage.data.sort(function(a, b){return a.id - b.id});
                    return (
                        <Aux>
                            <View style={itemTitleContainer}>
                                <View style={left}>
                                    <View style={topContainer}>
                                        <Text>م</Text>
                                    </View>
                                </View>
                                <View style={center}>
                                    <View style={topContainer}>
                                        <Text>الكلمة</Text>
                                    </View>
                                </View>
                                <View style={right}>
                                    <View style={topContainer}>
                                        <Text>الاية</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={currentPage.data}
                                    ref={ref => this.list = ref}
                                    onViewableItemsChanged={this.onViewableItemsChanged}
                                    onScrollToIndexFailed={() => this.list.scrollToOffset({ animated: false, offset: 0 })}
                                    keyExtractor={item => `${item.id}`}
                                    viewabilityConfig={{
                                        itemVisiblePercentThreshold: 99
                                    }}
                                    renderItem={({ item, index }) => {
                                        return <DataItem
                                            last={(index === currentPage.data.length - 1)}
                                            hilighted={index === playbackIndex.i}
                                            item={item} i={index + 1} />
                                    }} />
                            </View>
                            <View style={paginationContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    disabled={parseInt(currentPage.page) === parseInt(pagesArray[parseInt(pagesArray.length) - 1]) || parseInt(currentPage.page) >= parseInt(this.props.pageFilter.currMax)}
                                    onPress={setCurrentPage.bind(this, `${this._padPageNumber(parseInt(currentPage.page) + 1)}`)}
                                    style={pageNavTouch}>
                                    <Text>{'التالي'}</Text>
                                </TouchableOpacity>
                                {Platform.OS !== 'android' ?
                                    <View>
                                        <Select
                                            useNativeAndroidPickerStyle={false}
                                            doneText={'إلغاء'}
                                            placeholder={{}}
                                            value={currentPage.page}
                                            onValueChange={value => {
                                                if (value) {
                                                    this.list.scrollToOffset({ animated: false, offset: 0 })
                                                    this.props.setCurrentPage(value);
                                                } else {
                                                    this.list.scrollToOffset({ animated: false, offset: 0 })
                                                    this.props.setCurrentPage(pagesArray[0]);
                                                }
                                            }}
                                            items={pagesArray.map(el =>{
                                                if(parseInt(this.props.pageFilter.currMin) <= parseInt(el) && parseInt(this.props.pageFilter.currMax) >= parseInt(el)){
                                                    return({
                                                        label: NS(el, "Arabic"),
                                                        value: el
                                                    })
                                                }else{
                                                    return {}
                                                }
                                            } )} />
                                    </View>
                                    :
                                    <TouchableOpacity onPress={() => this.setState({ modal: true })}>
                                        <Text style={{ color: '#1976d2', fontSize: 20 }}>
                                            {NS(this.state.currPage, "Arabic")}
                                        </Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    disabled={parseInt(currentPage.page) === parseInt(pagesArray[0]) || parseInt(currentPage.page) <= parseInt(this.props.pageFilter.currMin)}
                                    onPress={setCurrentPage.bind(this, `${this._padPageNumber(parseInt(currentPage.page) - 1)}`) }
                                    style={pageNavTouch}>
                                    <Text>{'السابق'}</Text>
                                </TouchableOpacity>
                            </View> 
                        </Aux>
                    )
                } else {
                    return (
                        <View style={selectorContainer}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>
                                لم يتم العثور على نتائج
                        </Text>
                        </View>
                    );
                }
            }
            else {
                return (
                    <View style={selectorContainer}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>
                            لم يتم العثور على نتائج
                    </Text>
                    </View>
                );
            }
        }
    }

    render() {

        const {
            imageBg,
            container,
            topBar,
            hamIconStyle,
        } = Styles;

        const {
            drawerOpen,
            pagesArray,
            setCurrentPage
        } = this.props;


        if (this.state.loading || this.props.loader) return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#1976d1', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#fff' />
            </View>
        );

        return (
            <Aux>
                {Platform.OS === 'android' ? <StatusBar backgroundColor='#1976d1' barStyle='light-content' /> : null}
                <Image source={require('../../Assets/background.jpg')} style={imageBg} />
                <View style={container}>
                    <View style={topBar}>
                        <Image style={{ width: '12%', marginLeft: '5%' }} resizeMode='contain' source={require('../../Assets/blue-logo.jpg')} />
                        <Text>{this.state.headerSurahName}</Text>
                        <TouchableOpacity onPress={drawerOpen}>
                            <Image style={hamIconStyle} resizeMode='contain' source={require('../../Assets/ham_icon.png')} />
                        </TouchableOpacity>
                    </View>
                    {this.renderListItem()}
                </View>
                
                <Modal
                    isVisible={this.state.modal}
                    coverScreen
                    animationInTiming={0}
                    animationOutTiming={0}
                    onShow={()=>{ 
                        this.modalListRef.scrollToIndex({ animated: true, index: this.state.dropDownIndex });
                     }}
                    backdropOpacity={0.9}
                    customBackdrop={<View style={{ flex: 1, backgroundColor: '#000' }} />}>
                    <View style={{ bottom: 0, height: '90%', alignSelf: 'center', width: '70%', backgroundColor: '#fff', borderRadius: 5 }}>
                        <View style={{ padding: 10, width: '100%', alignItems: 'center', borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
                            <Text style={{ color: '#1976d2' }}>
                                اختر صفحة
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            { pagesArray ?
                                <FlatList
                                    data={pagesArray.map(el => ({
                                        label: NS(el, "Arabic"),
                                        value: el
                                    }))}
                                    ref={(ref) => { this.modalListRef = ref; }}
                                    onScrollToIndexFailed={() => this.modalListRef.scrollToOffset({ animated: false, offset: 0 })}
                                    initialNumToRender={300}
                                    keyExtractor={(el, i) => `${i}`}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                style={{ padding: 10, paddingRight: 20, width: '100%' }}
                                                onPress={() => {
                                                    this.list.scrollToOffset({ animated: false, offset: 0 });
                                                    this.state.currPage = item.label;
                                                    this.state.modal = false;
                                                    setCurrentPage(item.value);
                                                    this.setState({ ...this.state, dropDownIndex: index })
                                                }}>
                                                <Text style={{ flex: 1, textAlign: 'center', borderBottomColor: '#ddd', borderBottomWidth: 1, marginHorizontal: 10, fontSize: 18 }}>
                                                    {item.label}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    }} />
                                : null }
                        </View>
                        <View style={{ padding: 10, width: '100%', alignItems: 'center', borderTopColor: '#ddd', borderTopWidth: 1 }}>
                            <TouchableOpacity onPress={() => this.setState({ modal: false })}>
                                <Text style={{ color: '#1976d2' }}>
                                    إلغاء
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Aux >
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

    itemTitleContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10
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

    topContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '95%',
    },

    bottomContainer: {
        flex: 2,
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        marginTop: 10
    },

    touchableContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    topBar: {
        width: '100%',
        height: '9%',
        backgroundColor: '#fff',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    hamIconStyle: {
        height: 30,
        width: 30,
        marginRight: '5%'
    },

    paginationContainer: {
        height: 60,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },

    pageNavTouch: {
        width: '20%',
        height: 40,
        backgroundColor: '#f9f9f9',
        borderRadius: 40,
        elevation: 3,
        marginHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowColor: '#000',
    },

    selectorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }

});

const mapStateToProps = state => {
    return {
        ...state.home
    }
}

export default connect(mapStateToProps, actions)(Home);
