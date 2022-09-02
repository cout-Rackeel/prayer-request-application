

export class Prayer{
  _id:string;
  userId: string;
  title:string;
  name:string;
  date:Date;
  prayerRequest:string;
  commitedToPray:any[];
  status:boolean;
  updates:string[];

  constructor(_id?:string , userId?:string, title?:string, name?:string, date?: Date,  prayerRequest?:string, commitedToPray?:any[], status?:boolean, updates?:string[] ) {
      this._id = _id!;
      this.userId = userId!;
      this.title = title!;
      this.name = name!;
      this.date = date!;
      this.prayerRequest = prayerRequest!;
      this.commitedToPray = commitedToPray!;
      this.status = status!;
      this.updates = updates!;
  }

}

