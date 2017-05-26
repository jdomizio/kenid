import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import App from './containers/App';
import * as reducers from './reducers';

import './main.scss';

const store = createStore(
    combineReducers({
        ...reducers,
        form: formReducer,
    }),
    applyMiddleware(thunkMiddleware)
);

render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'));
