import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  editProfileForm:FormGroup
  password:FormControl
  user:User;

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: Byte[];
  passwordSalt: Byte[];
  status: boolean;

  constructor(private userService:UserService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.createProfileAddForm();
    this.getUser();
  }

  createProfileAddForm(){
    this.editProfileForm=this.formBuilder.group({
      id: [this.id, Validators.required],
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      email: [this.email, Validators.required],
      passwordHash: [this.passwordHash, Validators.required],
      passwordSalt: [this.passwordSalt, Validators.required],
      status: [this.status, Validators.required],
    })
  }

  getUser(){
        this.userService.getByEmail(sessionStorage.getItem('email')!).subscribe(response=>{
            this.user = response.data;
            this.id = this.user.id;
            this.firstName = this.user.firstName;
            this.lastName = this.user.lastName;
            this.email = this.user.email;
            this.passwordHash = this.user.passwordHash;
            this.passwordSalt = this.user.passwordSalt;
            this.status = this.user.status;
            this.createProfileAddForm()
        },responseError=>{
          this.toastrService.error(responseError.error);
        })
      
  }

  editProfile(){
    if(this.editProfileForm.valid){
      let profileModel = Object.assign({},this.editProfileForm.value)
      this.userService.update(profileModel).subscribe(response=>{
        this.toastrService.success("Login AGAIN please");
        this.router.navigate(["/login"]);
        this.authService.logOut();
      },responseError=>{
       this.toastrService.error(responseError.error);
      });
    }else{
      this.toastrService.error("ERROR")
    }
  }

  deleteAccount(){
    if(this.editProfileForm.valid){
      let profileModel = Object.assign({},this.editProfileForm.value)
      profileModel.id=this.user.id;
      profileModel.firstName=this.user.firstName;
      profileModel.lastName=this.user.lastName;
      this.userService.delete(profileModel).subscribe(response=>{
        this.authService.logOut();
        this.router.navigate(["/register"]);
      },responseError=>{
        this.toastrService.error(responseError.error);
       });
    }else{
      this.toastrService.error("Complete the form.","ERROR")
    }
  }

  checkForm(){
    if(this.editProfileForm.valid){
      let profileModel = Object.assign({},this.editProfileForm.value)
      profileModel.id=this.user.id;
      profileModel.firstName=this.user.firstName;
      profileModel.lastName=this.user.lastName;
    }else{
      this.toastrService.error("Complete the form.","ERROR")
    }
  }

  exit(){
    window.location.reload();
  }

}
