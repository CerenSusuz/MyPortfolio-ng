import { Claim } from "./claim";

export interface TokenModel{
    token:string;
    expiration:string;
    claims:Claim[];
}