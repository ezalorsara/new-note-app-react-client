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