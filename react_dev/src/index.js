/**
 * Standard packages
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

/**
 * Our custom components / packages
 */
import { ENVIRONMENT } from "./common/behaviour";
import App from './App';

// # 01
/**
 * A reducer is a function that operates on the state object and then returns it
 * Please note that this function is also called during initialization of store - so any code
 * without if stmt will be executed multiple times - internal operation of store !
 * @param state - this is a misleading name - here it is not the full state but just corresponding key value
 * @param action
 * @returns {Array} - every return value is assigned to the corresponding key in allReducers
 */
import rootSaga from './sagas/rootSaga';
import models from './store/models';

let reds = {};
for(let i=0; i < Object.keys(models).length; i++) {
    const model = models[Object.keys(models)[i]];
    reds[model.name] = model.reducers
}

const allReducers = combineReducers( Object.assign({}, {
}, reds));

// # 02
/**
 * Sagas to connect to external world - async api calls
 */
const sagaMiddleware = createSagaMiddleware();

// # 03
/**
 * Store enhancers, devToolsExtensions
 */
// Fixing error : TypeError: t is undefined
// Only chrome can handle the redux dev tool
// Redux compose cannot handle a null or undefined middleware
const allStoreEnhancers = window.navigator.userAgent.includes('Chrome') && window.devToolsExtension && ENVIRONMENT.DEV
    ? compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension && window.devToolsExtension()
    )
    : applyMiddleware(sagaMiddleware);

// # 04
/**
 * Create store with allReducers which are all called one by one when there is dispatch
 * Second param is initial state of store
 * Last param is for redux debug in chrome extension
 * @type {Store<S&StateExt>&Ext}
 */
const store = createStore(
    allReducers,
    {},
    allStoreEnhancers
);
sagaMiddleware.run(rootSaga);

// # 05
/**
 * You can see the status of store - but only data and not reducers
 */
console.log(store.getState());

// # 06
/**
 * Action is an object with format of type and payload
 * @type {{type: string, payload: {newState: string}}}
 * Dispatch action to store
 */

/*
* no need here moved to App component for unified standard place for all these actions
store.dispatch(eventStatsUpdateAction());
let statsUpdate = localStorage.getItem('statsUpdate');
clearInterval(statsUpdate);
statsUpdate = setInterval(() => store.dispatch(eventStatsUpdateAction()), 6000);
localStorage.setItem('statsUpdate', statsUpdate);
*/

// Read news
if(true || ENVIRONMENT.DEV) {
    // store.dispatch(postsReadAction());
    // store.dispatch(userReadAction());
    // store.dispatch(videoReadAction());
    // store.dispatch(show.actions.read({}));
    // store.dispatch(user.actions.read({}));
    /*store.dispatch(show.actions.read_success({
        a: 5455,
        b: 9909
    }));*/


    for(let i=0; i < Object.keys(models).length; i++) {
        const model = models[Object.keys(models)[i]];
        store.dispatch(model.actions.read({}));
    }
}

/**
 * Avoid setting up multiple interval objects in background
 * @type {string | null}
 */
if(ENVIRONMENT.DEV) {
    store.subscribe(() => {
        console.log('subscribed store in index', store.getState());
    });
}

/**
 * Render the main App Component
 */
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
