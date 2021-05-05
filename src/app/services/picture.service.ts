import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Picture } from '../models/picture';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  apiURL= environment.apiURL;

  constructor(private httpClient:HttpClient,) { }


  get(Id:number):Observable<ItemResponseModel<Picture>>{
    let newPath = this.apiURL + 'pictures/get?id='+Id;
    return this.httpClient.get<ItemResponseModel<Picture>>(newPath)
  }

  getAll():Observable<ListResponseModel<Picture>>{
    let newPath=this.apiURL+"pictures/getall"
    return this.httpClient.get<ListResponseModel<Picture>>(newPath)
  }

  add(image: File):Observable<any> {
    const formData:FormData = new FormData();
    formData.append('Image', image);
    let newPath=this.apiURL+'pictures/add';
    return this.httpClient.post<ResponseModel>(newPath,formData,{
      reportProgress: true,
      responseType: 'json',
    });
    
  }

  update(image:Picture):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"pictures/update",image);
  }

  delete(image:Picture):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"pictures/delete",image);
  }
  
}
