export interface CertificateImage{
    id:number;
    createdAt:Date;
    updatedAt:Date;
    isDeleted:boolean;
    isActive:boolean;

    certificateId: number;
    imagePath: string;
    date: Date;
}
