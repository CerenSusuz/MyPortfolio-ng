export interface Blog{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isDeleted?:boolean;
    isActive:boolean;
    
    title:string;
    content:string;
    description:string;
    publishedDate:Date;
}