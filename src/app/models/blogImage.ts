export interface BlogImage{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isActive:boolean;

    blogId: number;
    imagePath: string;
    date: Date;
}