export interface CertificateImage{
    id:number;
    createdAt:Date;
    updatedAt?:Date;
    isActive:boolean;

    certificateId: number;
    imagePath: string;
}
