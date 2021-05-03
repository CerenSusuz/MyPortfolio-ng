export interface Claim{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isActive:boolean;
    
    name:string;
}