export class User{
  _id:string
  firstname : string;
  lastname : string;
  username : string;
  email:string;
  password:string;
  pals: string[];
  roles?:string[];

  constructor(
    _id?:string,
    firstname ?: string,
    lastname ?: string,
    username ?: string,
    email?:string,
    password?:string,
    pals?: string[],
    roles?:string[], ){

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
