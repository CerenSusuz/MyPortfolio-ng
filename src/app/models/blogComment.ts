export interface BlogComment{
    id:number;
    content:string;
    blogId:number;
    blog:string;
    userId:number;
    user:string;
    writtenDate:Date;
}