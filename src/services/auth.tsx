import { LOGIN_TYPE, authState } from '../types';

import { Auth } from 'aws-amplify';


const  login = (payload:LOGIN_TYPE, cb :(arg:authState) => void) => {
  
  Auth.signIn(payload.email, payload.password).then(result=>{
    cb(result);
  }).catch(err=>{
    let payload:authState = {
      isloggedin : false,
      error: true,
      code : err.code,
      message: err.message,
      name: err.name
    }
    cb(payload);
  });

}

export { login }