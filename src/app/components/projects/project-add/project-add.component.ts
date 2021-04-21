import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  projectAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private projectService:ProjectService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createprojectAddForm();
  }

  createprojectAddForm(){
    this.projectAddForm = this.formBuilder.group({
      title:["",Validators.required],
      description:["",Validators.required],
      content:["",Validators.required],
      link:["",Validators.required],
    })
  }

  add(){
    if(this.projectAddForm.valid){      
      let projectModel = Object.assign({},this.projectAddForm.value)
      console.log(projectModel)
      this.projectService.add(projectModel).subscribe(response=>{
        this.toastrService.success("OK admin")
        this.router.navigate(['/admin']);
      },responseError=>{
        this.toastrService.error("Error")
      })
    }
  }

}
