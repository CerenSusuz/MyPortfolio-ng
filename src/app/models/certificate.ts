export interface Certificate{
    id:number;
    createdAt:Date;
    updateAt:Date;
    isDeleted:boolean;
    isActive:boolean;
    
    title:string;
    receivedDate:Date;
}