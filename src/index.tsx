import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider }  from 'react-redux';
import rootReducer  from './store/reducers'; 
import createSagaMiddleWare from 'redux-saga';
import { watchAllSagas } from './sagas';
import { configureStore } from 'redux-starter-kit';
import Amplify from 'aws-amplify';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['note']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleWare();
const rootStore = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware]
})

const persistor = persistStore(rootStore);
 

sagaMiddleware.run(watchAllSagas);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_S3_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
  },
  Storage: {
    region: process.env.REACT_APP_S3_REGION,
    bucket: process.env.REACT_APP_S3_BUCKET,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: process.env.REACT_APP_API_GATEWAY_URL,
        region: process.env.REACT_APP_API_GATEWAY_REGION
      },
    ]
  }
});

ReactDOM.render(
  <Provider store={rootStore}>
    <PersistGate loading="null" persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
