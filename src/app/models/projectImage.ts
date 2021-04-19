  export interface ProjectImage{
    id:number;
    createdAt:Date;
    updateAt?:Date;
    isDeleted?:boolean;
    isActive:boolean;
    
    projectId: number;
    imagePath: string;
    date: Date;
}