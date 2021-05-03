import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiURL = environment.apiURL;

  constructor(private httpClient:HttpClient) { }

  add(comment:Comment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"comments/add",comment);
  }

  update(comment:Comment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"comments/update",comment);
  }

  delete(comment:Comment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"comments/delete",comment);
  }
  
  getComments():Observable<ListResponseModel<Comment>>{
    let newPath=this.apiURL+"comments/getcommentdetails";
    return this.httpClient.get<ListResponseModel<Comment>>(newPath);
  }

  getCommentDetails(commentId:number):Observable<ListResponseModel<Comment>>{
    let newPath=this.apiURL+"comments/getcommentdetailbyid?id="+commentId;
    return this.httpClient.get<ListResponseModel<Comment>>(newPath);
  }

  getById(commentId:number):Observable<ItemResponseModel<Comment>>{
    let newPath = this.apiURL + 'comments/getbyid?id='+commentId;
    return this.httpClient.get<ItemResponseModel<Comment>>(newPath)
  }

  getByBlogId(blogId:number):Observable<ListResponseModel<Comment>>{
    let newPath = this.apiURL + 'comments/getcommentsbyblogid?id='+blogId;
    return this.httpClient.get<ListResponseModel<Comment>>(newPath)
  }

  getByUserId(userId:number):Observable<ListResponseModel<Comment>>{
    let newPath = this.apiURL + 'comments/getcommentsbyuserid?id='+userId;
    return this.httpClient.get<ListResponseModel<Comment>>(newPath)
  }
}
