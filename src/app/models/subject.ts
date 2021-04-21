export interface Subject{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isDeleted?:boolean;
    isActive:boolean;

    name:string;
}