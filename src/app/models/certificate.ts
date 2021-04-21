
export interface Certificate{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isDeleted?:boolean;
    isActive:boolean;
    
    title:string;
    receivedDate:Date;

}