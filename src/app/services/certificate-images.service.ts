import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CertificateImage } from '../models/certificateImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})

export class CertificateImageService {

  apiURL= environment.apiURL;

  constructor(private httpClient:HttpClient,) { }


  get(Id:number):Observable<ItemResponseModel<CertificateImage>>{
    let newPath = this.apiURL + 'certificateImages/get?id='+Id;
    return this.httpClient.get<ItemResponseModel<CertificateImage>>(newPath)
  }

  getAll():Observable<ListResponseModel<CertificateImage>>{
    let newPath=this.apiURL+"certificateImages/getall"
    return this.httpClient.get<ListResponseModel<CertificateImage>>(newPath)
  }

  getImagesByCertificateId(certificateId:number):Observable<ListResponseModel<CertificateImage>>{
    let newPath=this.apiURL+"certificateImages/getimagesbycertificateid?certificateId="+certificateId;
    return this.httpClient.get<ListResponseModel<CertificateImage>>(newPath)
  }

  add(image: File,certificateId:number):Observable<any> {

    console.log(image.name)
    console.log(certificateId)
    const formData:FormData = new FormData();

    formData.append('Image', image);
    formData.append('CertificateId',certificateId.toString());

    let newPath=this.apiURL+'certificateImages/add';
    return this.httpClient.post<ResponseModel>(newPath,formData,{
      reportProgress: true,
      responseType: 'json',
    });
    
  }

  update(image:CertificateImage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"certificateImages/update",image);
  }

  delete(image:CertificateImage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"certificateImages/delete",image);
  }
  
}