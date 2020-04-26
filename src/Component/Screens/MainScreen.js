import React from 'react';
import Aux from '../HOC/Auxiliary';
import Home from './Home';
import DrawerContainer from '../Helpers/DrawerContainer';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';


class MainScreen extends React.Component {

    state = {
        drawer: 'closed'
    }

    componentDidMount(){
        console.disableYellowBox = true;
    }

    render() {
        return (
            <Aux>
                <Home drawerOpen={() => this.setState({ drawer: 'open' })} drawerClose={() => this.setState({ drawer: 'close' })} />
                <DrawerContainer drawer={this.state.drawer} drawerColse={() => this.setState({ drawer: 'closed' })} />
            </Aux>
        );
    }
}

export default connect(null, actions)(MainScreen);