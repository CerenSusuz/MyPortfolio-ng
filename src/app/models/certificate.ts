import { CertificateImage } from "./certificateImage";

export interface Certificate{
    id:number;
    createdAt:Date;
    updatedAt:Date;
    isDeleted:boolean;
    isActive:boolean;
    
    title:string;
    receivedDate:Date;

    image:CertificateImage;
}