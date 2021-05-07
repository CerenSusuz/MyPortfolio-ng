import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogComment } from '../models/blogComment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiURL = environment.apiURL;

  constructor(private httpClient:HttpClient) { }

  add(comment:BlogComment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"comments/add",comment);
  }

  update(comment:BlogComment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"comments/update",comment);
  }

  delete(comment:BlogComment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"comments/delete",comment);
  }
  
  getComments():Observable<ListResponseModel<BlogComment>>{
    let newPath=this.apiURL+"comments/getcommentdetails";
    return this.httpClient.get<ListResponseModel<BlogComment>>(newPath);
  }

  getAll():Observable<ListResponseModel<BlogComment>>{
    let newPath=this.apiURL+"comments/getall";
    return this.httpClient.get<ListResponseModel<BlogComment>>(newPath);
  }

  getCommentDetails(commentId:number):Observable<ListResponseModel<BlogComment>>{
    let newPath=this.apiURL+"comments/getcommentdetailbyid?id="+commentId;
    return this.httpClient.get<ListResponseModel<BlogComment>>(newPath);
  }

  getById(commentId:number):Observable<ItemResponseModel<BlogComment>>{
    let newPath = this.apiURL + 'comments/getbyid?id='+commentId;
    return this.httpClient.get<ItemResponseModel<BlogComment>>(newPath)
  }

  getByBlogId(blogId:number):Observable<ListResponseModel<BlogComment>>{
    let newPath = this.apiURL + 'comments/getcommentsbyblogid?id='+blogId;
    return this.httpClient.get<ListResponseModel<BlogComment>>(newPath)
  }

  getByUserId(userId:number):Observable<ListResponseModel<BlogComment>>{
    let newPath = this.apiURL + 'comments/getcommentsbyuserid?id='+userId;
    return this.httpClient.get<ListResponseModel<BlogComment>>(newPath)
  }
}
