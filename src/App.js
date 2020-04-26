import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import MainScreen from './Component/Screens/MainScreen';
import { I18nManager } from 'react-native';


const App = () => {
    I18nManager.allowRTL(false);
    return (
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <MainScreen />
        </Provider>
    )
}

export default App;