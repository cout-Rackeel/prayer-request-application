import { Role } from "./roles";

export class User{
  _id:string
  firstname : string;
  lastname : string;
  username : string;
  email:string;
  password:string;
  pals?: any;
  roles?: any[];

  constructor(
    _id?:string,
    firstname ?: string,
    lastname ?: string,
    username ?: string,
    email?:string,
    password?:string,
    pals?: any,
    roles?: any[], ){

    this._id = _id!;
    this.firstname = firstname!;
    this.lastname = lastname!;
    this.username = username!;
    this.email = email!;
    this.password = password!;
    this.pals = pals!;
    this.roles = roles!;


  }


}
