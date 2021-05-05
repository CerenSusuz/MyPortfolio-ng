export interface Picture{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isActive:boolean;

    imagePath: string;
}