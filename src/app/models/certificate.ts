
export interface Certificate{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isActive:boolean;
    
    title:string;
    receivedDate:Date;

}