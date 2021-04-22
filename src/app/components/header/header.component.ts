import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    
  }

  isLogOK(){
    if(sessionStorage.getItem("token")){
      return true;
    } else {
      return false;
    }
  }

  getUser(){
    return sessionStorage.getItem('fullName');
    }

  logout(){
    this.authService.logOut();
    this.toastr.info("Log OUT OK");
    this.router.navigate(['/homepage']);
  }

  isAdmin(){
    if(sessionStorage.getItem("email")==="ceren199704@hotmail.com"){
      return true;
    }else{
      return false;
    }
  }  
  
}
