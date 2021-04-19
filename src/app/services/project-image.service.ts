import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectImage } from '../models/projectImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})

export class ProjectImageService {

  apiURL= environment.apiURL;

  constructor(private httpClient:HttpClient,) { }


  get(Id:number):Observable<ItemResponseModel<ProjectImage>>{
    let newPath = this.apiURL + 'projectImages/getbyid?id='+Id;
    return this.httpClient.get<ItemResponseModel<ProjectImage>>(newPath)
  }

  getProjectImages():Observable<ListResponseModel<ProjectImage>>{
    let newPath=this.apiURL+"projectImages/getall"
    return this.httpClient.get<ListResponseModel<ProjectImage>>(newPath)
  }

  getProjectImagesByProjectId(projectId:number):Observable<ListResponseModel<ProjectImage>>{
    let newPath=this.apiURL+"projectImages/getimagesbyprojectid?projectId="+projectId;
    return this.httpClient.get<ListResponseModel<ProjectImage>>(newPath)
  }

  add(image: File,projectId:number):Observable<any> {

    console.log(image.name)
    console.log(projectId)
    const formData:FormData = new FormData();

    formData.append('Image', image);
    formData.append('ProjectId',projectId.toString());

    let newPath=this.apiURL+'projectImages/add';
    return this.httpClient.post<ResponseModel>(newPath,formData,{
      reportProgress: true,
      responseType: 'json',
    });
    
  }

  update(image:ProjectImage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"projectImages/update",image);
  }

  delete(image:ProjectImage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"projectImages/delete",image);
  }
  
}