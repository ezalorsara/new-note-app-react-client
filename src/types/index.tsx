/*-- AUTH --*/

export type LOGIN_TYPE = {
  email: string,
  password: string
}


export type authState = {
  isloggedin: boolean,
  error: boolean,
  message: string,
  name: string,
  code: string
}

export type REGISTER_TYPE = {
  fullname: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export type CONFIRMATION_TYPE = {
  email: string,
  verificationCode: string
}

export type FORM_ERROR_TYPE = {
  formError:boolean,
  fields: {
    
  }
}

export type NOTE_STATE_TYPE = {
  list_data:[],
  single_data:any
}