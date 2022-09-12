export interface ApiResponse<T = any>{
  status:string;
  results?: number;
  data?: {[key:string] : T};
  message?:string;
  error?:any;
  stack?:any
}
