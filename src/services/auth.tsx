import { LOGIN_TYPE, REGISTER_TYPE, authState, CONFIRMATION_TYPE } from '../types';

import { Auth } from 'aws-amplify';



const  login = (payload:LOGIN_TYPE, cb :(arg:authState, status:string) => void) => {
  
  Auth.signIn(payload.email, payload.password).then(result=>{
    cb(result, "success");
  }).catch(err=>{
    let payload:authState = {
      isloggedin : false,
      error: true,
      code : err.code,
      message: err.message,
      name: err.name
    }
    cb(payload, "error");
  });

}

const  register = async (payload:REGISTER_TYPE) => {
  return await Auth.signUp({
    username: payload.email,
    password: payload.password,
    attributes : {
      'custom:full_name' : payload.fullname
    }
  });
}

const  verifyRegistrationCode = async (payload:CONFIRMATION_TYPE) => {
  return await Auth.confirmSignUp(payload.email, payload.verificationCode);
}

export { login, register, verifyRegistrationCode }