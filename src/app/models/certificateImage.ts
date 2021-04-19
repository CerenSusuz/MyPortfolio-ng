export interface CertificateImage{
    id:number;
    createdAt:Date;
    updateAt:Date;
    isDeleted:boolean;
    isActive:boolean;

    certificateId: number;
    imagePath: string;
    date: Date;
}
