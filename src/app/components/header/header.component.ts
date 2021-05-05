import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FuncsService } from 'src/app/services/funcs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private router:Router,
    private funcsService:FuncsService) { }

  ngOnInit(): void {
    
  }

  isLogOK(){
    if(this.funcsService.sessionStorageGetItem("token")){
      return true;
    } else {
      return false;
    }
  }

  getUser(){
    return this.funcsService.sessionStorageGetItem('fullName');
    }

  logout(){
    this.authService.logOut();
    this.toastr.info("Log OUT OK");
    this.router.navigate(['/homepage']);
  }

  isAdmin(){
    if(this.funcsService.sessionStorageGetItem("claim")==="admin"){
      return true;
    }else{
      return false;
    }
  }  
  
}
