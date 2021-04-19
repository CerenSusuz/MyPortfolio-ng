import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Certificate } from '../models/certificate';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  apiURL = environment.apiURL;
  constructor(private httpClient:HttpClient) { }

  add(certificate:Certificate):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"certificates/add",certificate);
  }

  update(certificate:Certificate):Observable<ResponseModel>{
    console.log(certificate);
    return this.httpClient.post<ResponseModel>(this.apiURL+"certificates/update",certificate);
  }

  delete(certificate:Certificate):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"certificates/delete",certificate);
  }

  getCertificates():Observable<ListResponseModel<Certificate>>{
    let newPath= this.apiURL+"certificates/getall";
    return this.httpClient.get<ListResponseModel<Certificate>>(newPath);
  }

  getCertificate(Id:number):Observable<ItemResponseModel<Certificate>>{
    let newPath = this.apiURL + 'certificates/getbyid?id='+Id;
    return this.httpClient.get<ItemResponseModel<Certificate>>(newPath)
  }
}
