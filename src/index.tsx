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

const sagaMiddleware = createSagaMiddleWare();
const rootStore = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
})

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
        name: "manga",
        endpoint: process.env.REACT_APP_API_GATEWAY_REGION,
        region: process.env.REACT_APP_API_GATEWAY_REGION
      },
    ]
  }
});

ReactDOM.render(
  <Provider store={rootStore}>
    <App />
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
