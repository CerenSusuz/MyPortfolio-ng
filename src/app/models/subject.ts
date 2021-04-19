export interface Subject{
    id:number;
    createdAt:Date;
    updateAt?:Date;
    isDeleted?:boolean;
    isActive:boolean;

    name:string;
}