import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';
import MainScreen from './Component/Screens/MainScreen';
import { ActivityIndicator, I18nManager, View } from 'react-native';
import codePush from "react-native-code-push";


class App extends React.Component{
// const App = () => {
    constructor(props){
        super(props);
        this.state = {
          loader:false
        }
    }

    async UNSAFE_componentWillMount(){
        I18nManager.allowRTL(false);
        this.checkForUpdate()
    }
    
    async checkForUpdate() {
        this.setState({ loader:true })
        const a = await codePush.sync({
            // updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE
        });
        this.setState({ loader:false })
        if(a === 1){
            codePush.restartApp();
        }
    }

    render(){
        const { loader } = this.props
        return (
            <Provider store={createStore(reducers, applyMiddleware(thunk))}>
                {
                    // loader &&
                    // <View style={{
                    //     height:'100%',
                    //     width:'100%',
                    //     alignItems:'center',
                    //     justifyContent:'center',
                    //     position:'absolute',
                    //     zIndex:10,
                    //     backgroundColor:"#4399EC",
                    //     opacity:0.5
                    // }}>
                    //     <ActivityIndicator size="large" color="#fff"/>
                    // </View>
                }
                <MainScreen />
            </Provider>
        )
    }
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