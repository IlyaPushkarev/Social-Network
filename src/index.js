import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./redux/redux-store";
import {Provider} from "react-redux";



// export let renderEntireTree = (state) => {

    ReactDOM.render(
        <React.StrictMode>
        <Provider store={store}>
            <App //state={store.getState()}
                //store={store}
                //dispatch={store.dispatch.bind(store)}
            />
        </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
// }



// renderEntireTree(store.getState());/*state*/

// store.subscribe(()=>renderEntireTree());/*Передаем ф-ю renderEntireTree которая реагирует на изменения в store*/