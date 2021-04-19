import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogImage } from '../models/blogImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})

export class BlogImageService {

  apiURL= environment.apiURL;

  constructor(private httpClient:HttpClient,) { }


  get(Id:number):Observable<ItemResponseModel<BlogImage>>{
    let newPath = this.apiURL + 'blogImages/get?id='+Id;
    return this.httpClient.get<ItemResponseModel<BlogImage>>(newPath)
  }

  getAll():Observable<ListResponseModel<BlogImage>>{
    let newPath=this.apiURL+"blogImages/getall"
    return this.httpClient.get<ListResponseModel<BlogImage>>(newPath)
  }

  getImagesByBlogId(blogId:number):Observable<ListResponseModel<BlogImage>>{
    let newPath=this.apiURL+"blogImages/getimagesbyblogid?blogId="+blogId;
    return this.httpClient.get<ListResponseModel<BlogImage>>(newPath)
  }

  add(image: File,blogId:number):Observable<any> {

    console.log(image.name)
    console.log(blogId)
    const formData:FormData = new FormData();

    formData.append('Image', image);
    formData.append('BlogId',blogId.toString());

    let newPath=this.apiURL+'blogImages/add';
    return this.httpClient.post<ResponseModel>(newPath,formData,{
      reportProgress: true,
      responseType: 'json',
    });
    
  }

  update(image:BlogImage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"blogImages/update",image);
  }

  delete(image:BlogImage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"blogImages/delete",image);
  }
  
}