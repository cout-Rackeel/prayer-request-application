export interface SearchResult<T extends any>{
  criterion: string
  result : T[]
}
