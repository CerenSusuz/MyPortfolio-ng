import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  apiURL = environment.apiURL;

  constructor(private httpClient:HttpClient) { }

  add(subject:Subject):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"subjects/add",subject);
  }

  update(subject:Subject):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"subjects/update",subject);
  }

  delete(subject:Subject):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"subjects/delete",subject);
  }
  
  getSubjects():Observable<ListResponseModel<Subject>>{
    let newPath=this.apiURL+"subjects/getall";
    return this.httpClient.get<ListResponseModel<Subject>>(newPath);
  }

  getById(subjectId:number):Observable<ItemResponseModel<Subject>>{
    let newPath = this.apiURL + 'subjects/getbyid?id='+subjectId;
    return this.httpClient.get<ItemResponseModel<Subject>>(newPath)
  }



}
