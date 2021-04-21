import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Project } from '../models/project';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiURL = environment.apiURL;

  constructor(private httpClient:HttpClient) { }

  add(project:Project):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"projects/add",project);
  }

  update(project:Project):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"projects/update",project);
  }

  delete(project:Project):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"projects/delete",project);
  }
  
  getProjects():Observable<ListResponseModel<Project>>{
    let newPath=this.apiURL+"projects/getall";
    return this.httpClient.get<ListResponseModel<Project>>(newPath);
  }

  getProjectDetail(projectId:number):Observable<ItemResponseModel<Project>>{
    let newPath = this.apiURL + 'projects/getbyid?id='+projectId;
    return this.httpClient.get<ItemResponseModel<Project>>(newPath)
  }




}
