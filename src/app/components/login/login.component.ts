import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Claim } from 'src/app/models/claim';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm:FormGroup;
  user:User;
  claims:Claim[];
  imageURL=environment.baseURL;
  
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastr:ToastrService,
    private router:Router,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){

      let loginModel:LoginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        console.log(response);
        sessionStorage.setItem("token",response.data.token);
        console.info(response.data.claims)
        this.toastr.info(response.message)
        this.router.navigate(['/homepage'])
        this.getUser(loginModel.email);
      },responseError=>{
        console.log(responseError)
        this.toastr.error(responseError.error)
      })
    }else{
      this.toastr.warning("ERROR");
    }
  }

  getUser(email:string){
    this.userService.getByEmail(email).subscribe((response) => {
      this.user = response.data;
      console.info(this.user)
      sessionStorage.setItem("fullName", this.user.firstName + " " + this.user.lastName);
      sessionStorage.setItem("id",this.user.id.toString())
      sessionStorage.setItem("email",this.user.email)
      this.userService.getClaim(this.user).subscribe((response=>{
        this.claims=response.data;
        sessionStorage.setItem("claim",this.claims[0].name)
      }))
    });
}



}
