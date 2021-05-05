import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { Router } from '@angular/router';
import { ResponseModel } from '../models/responseModel';
import { PasswordChange } from '../models/passwordChange';
import { FuncsService } from './funcs.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL + 'auth/';

  constructor(private httpClient: HttpClient,
    private router: Router,
    private funcsService:FuncsService) {  }

  login(user: LoginModel): Observable<ItemResponseModel<TokenModel>> {
    let newPath = this.apiURL + 'login';
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath, user);
  }

  isAuthenticated() {
    return this.funcsService.sessionStorageGetItem("token");
  }

  register(registerModel: RegisterModel): Observable<ItemResponseModel<TokenModel>> {
    let newPath = this.apiURL + 'register';
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath, registerModel);
  }

  logOut() {
    this.funcsService.sessionStorageRemoveItem("token");
    this.funcsService.sessionStorageRemoveItem("fullName");
    this.funcsService.sessionStorageRemoveItem("email");
    this.funcsService.sessionStorageRemoveItem("id");
    this.funcsService.sessionStorageRemoveItem("claim");
  }

  changePassword(passwordChangeModel:PasswordChange):Observable<ResponseModel>{
    let newPath = this.apiURL + "changepassword";
    return this.httpClient.post<ResponseModel>(newPath,passwordChangeModel);
  }


}