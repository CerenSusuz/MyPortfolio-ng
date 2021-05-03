export interface Blog{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isActive:boolean;
    
    title:string;
    subjectId:number;
    content:string;
    description:string;
    publishedDate:Date;
}