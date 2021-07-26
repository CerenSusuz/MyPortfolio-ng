export interface BlogComment{
    id:number;
    isActive?:boolean;
    createdDate?:Date;
    updatedAt?:Date;

    content:string;
    blogId:number;
    blog:string;
    userId:number;
    user:string;

}