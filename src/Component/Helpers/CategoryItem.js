import React from 'react';
import { ScrollView } from 'react-native';
import ListItem from './ListItem';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import Filters from './Filters';
import Controls from './Controls';


class CategoryItem extends React.Component {

    render() {
        const {
            data,
            fetchRecord,
            pageFilter,
            juzzFilter,
            ayatFilter,
            voiceFilter,
            reciters,
            drawerColse
        } = this.props;

        return (
            <ScrollView
                style={{ paddingHorizontal: 4 }}
                showsVerticalScrollIndicator={false}>
                {data.map((el, i) => <ListItem drawerColse={drawerColse} fetchRecord={fetchRecord} treeLevel={1} key={i} expanded item={el} />)}
                <Filters reciters={reciters} pageFilter={pageFilter} juzzFilter={juzzFilter} ayatFilter={ayatFilter} voiceFilter={voiceFilter} drawerClose={drawerColse} />
                <Controls />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.home //for simple store
        // ...state.reducers.home // for persist store
    }
}

export default connect(mapStateToProps, actions)(CategoryItem);