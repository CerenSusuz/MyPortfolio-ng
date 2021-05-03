export interface Subject{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isActive:boolean;

    name:string;
}