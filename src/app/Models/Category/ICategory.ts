export interface ICategory {
  uuid: string,
  dateCreated:string ,
  displayName: string,
  children: ICategory[],
  // ??
  parentUuid?: string,
  iconPath: string,
  level: number
}
