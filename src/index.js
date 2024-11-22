import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import authReducer from './store/reducers/auth';
import baseSetup from './store/reducers/baseSetup';
import {createStore, combineReducers,applyMiddleware, compose } from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
const composeEnhancers =process.env.NODE_ENV ==="development"? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose:null;

const rootReducer = combineReducers({auth: authReducer,baseSetup:baseSetup})
const store = createStore(rootReducer,applyMiddleware(thunk));
// const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
