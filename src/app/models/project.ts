export interface Project{
    id:number;
    createdAt:Date;
    updateAt?:Date;
    isDeleted?:boolean;
    isActive:boolean;

    title:string;
    description:string;
    content:string;
}