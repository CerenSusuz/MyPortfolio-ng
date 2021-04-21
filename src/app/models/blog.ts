export interface Blog{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isDeleted?:boolean;
    isActive:boolean;
    
    title:string;
    subjectId:number;
    content:string;
    description:string;
    publishedDate:Date;
}