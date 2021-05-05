import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuncsService } from '../services/funcs.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private funcsService:FuncsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.funcsService.sessionStorageGetItem("token");
    let newRequest:HttpRequest<any>;
    newRequest = request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token)
    });
    return next.handle(newRequest);
  }
    
  }
