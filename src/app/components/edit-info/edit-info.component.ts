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
  email:string;
  user:User;

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
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required]
    })
  }

  getUser(){
        this.userService.getByEmail(sessionStorage.getItem('email')!).subscribe(response=>{
            this.user = response.data;
             this.editProfileForm.setValue({
              firstName:this.user.firstName,
              lastName:this.user.lastName,
              email:this.user.email
            })
        },responseError=>{
          this.toastrService.error(responseError.error);
        })
      
  }

  getName(){
    return sessionStorage.getItem('fullName');
  }

  editProfile(){
    if(this.editProfileForm.valid){
      let profileModel = Object.assign({},this.editProfileForm.value)
      profileModel.id=this.user.id;
      profileModel.firstName=this.user.firstName;
      profileModel.lastName=this.user.lastName;
      this.userService.update(profileModel).subscribe(response=>{
        this.toastrService.success("Login AGAIN please");
        this.router.navigate(["/homepage"]);
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
        this.router.navigate(["/homepage"]);
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
      console.log(this.user)
      profileModel.id=this.user.id;
      profileModel.firstName=this.user.firstName;
      profileModel.lastName=this.user.lastName;
      profileModel.password=this.user.password;
      console.log(profileModel)
    }else{
      this.toastrService.error("Complete the form.","ERROR")
    }
  }

  exit(){
    window.location.reload();
  }

}
