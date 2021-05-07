import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FuncsService } from 'src/app/services/funcs.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordUpdateForm:FormGroup;
  currentUserId:number;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private funcsService:FuncsService
  ) { }

  ngOnInit(): void {
    this.createPasswordUpdateForm();
    this.getUserId();
  }

  createPasswordUpdateForm(){
    this.passwordUpdateForm = this.formBuilder.group({
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required]
    })
  }

  getUserId(){
     this.currentUserId = parseInt(this.funcsService.sessionStorageGetItem("id")!);
  }

  changePassword(){
    if (this.passwordUpdateForm.valid){
      let passwordModel = Object.assign({userId:this.currentUserId},this.passwordUpdateForm.value);
      this.authService.changePassword(passwordModel).subscribe(response => {
        this.toastrService.success(response.message,"OK");
        this.authService.logOut();
        this.router.navigate(["/homepage"]);
      },responseError => {
        this.toastrService.error(responseError.error.message,"Error");
      })
    }else{
      this.toastrService.error("Missing form information","Error")
    }
  }

}