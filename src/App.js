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

// import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { persistStore, persistCombineReducers } from 'redux-persist';

// import reducers from './redux/reducers';
// import MainScreen from './Component/Screens/MainScreen';
// import { I18nManager, AsyncStorage } from 'react-native';
// import { PersistGate } from 'redux-persist/integration/react';

// const config = {
//     key: 'root',
//     storage: AsyncStorage,
//     // blacklist: ['loadingReducer'],
//     debug: true, //to get useful logging
// };
// const rootReducer = persistCombineReducers(config, {reducers});
// const store = createStore(rootReducer, applyMiddleware(thunk));
// const persistor = persistStore(store);

// const App = () => {
//     I18nManager.allowRTL(false);
//     return (
//         <Provider store={store}>
//             <PersistGate persistor={persistor}>
//                 <MainScreen />
//             </PersistGate>
//         </Provider>
//     )
// }

// export default App;