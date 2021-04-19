export interface BlogImage{
    id:number;
    createdAt:Date;
    updateAt:Date;
    isDeleted:boolean;
    isActive:boolean;

    blogId: number;
    imagePath: string;
    date: Date;
}