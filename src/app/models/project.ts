export interface Project{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isActive:boolean;

    title:string;
    description:string;
    content:string;
    link:string;
}