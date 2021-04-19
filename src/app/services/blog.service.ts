import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Blog } from '../models/blog';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  apiURL = environment.apiURL;
  constructor(private httpClient:HttpClient) { }

  add(blog:Blog):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"blogs/add",blog);
  }

  update(blog:Blog):Observable<ResponseModel>{
    console.log(blog);
    return this.httpClient.post<ResponseModel>(this.apiURL+"blogs/update",blog);
  }

  delete(blog:Blog):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"blogs/delete",blog);
  }

  getAll():Observable<ListResponseModel<Blog>>{
    let newPath= this.apiURL+"blogs/getall";
    return this.httpClient.get<ListResponseModel<Blog>>(newPath);
  }

  getById(id:number):Observable<ItemResponseModel<Blog>>{
    let newPath = this.apiURL + 'blogs/getbyid?id='+id;
    return this.httpClient.get<ItemResponseModel<Blog>>(newPath)
  }

  getBySubjectId(subjectId:number):Observable<ListResponseModel<Blog>>{
    let newPath = this.apiURL+"blogs/getbysubject?subjectId="+subjectId;
    return this.httpClient.get<ListResponseModel<Blog>>(newPath);
  }

}
