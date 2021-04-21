export interface BlogImage{
    id:number;
    createdAt:Date;
    updatedAt:Date;
    isDeleted:boolean;
    isActive:boolean;

    blogId: number;
    imagePath: string;
    date: Date;
}