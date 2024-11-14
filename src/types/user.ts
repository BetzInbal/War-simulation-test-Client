import { typesMissiles } from "./types/enums";

export interface IUser {
  _id: string;
  username: string;
  hashedPassword:string
  organization:IOrganization
}


export interface IOrganization extends Document {
  name:string,
  resources:IResource[],
  budget:number

}

export interface IResource extends Document {
  name:typesMissiles,
  amount:number
}
