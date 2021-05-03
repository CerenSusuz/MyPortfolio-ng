import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {

  projectUpdateForm:FormGroup;
  project:Project;
  
  constructor(
    private formBuilder:FormBuilder,
    private projectService:ProjectService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createProjectUpdateForm()
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getProject(params["id"])
      }
    })
  }

  createProjectUpdateForm(){
    this.projectUpdateForm = this.formBuilder.group({
      title:["",Validators.required],
      description:["",Validators.required],
      content:["",Validators.required],
      link:["",Validators.required],
    })
  }

  getProject(id:number){
    this.projectService.getProjectDetail(id).subscribe((response) => {
      this.project = response.data;
      this.projectUpdateForm.setValue({
        title:this.project.title,
        description:this.project.description,
        content:this.project.content,
        link:this.project.link
      })
    });
  }

  update(){
    if(this.projectUpdateForm.valid){      
      let projectModel = Object.assign({},this.projectUpdateForm.value)
      projectModel.id = this.project.id;
      this.projectService.update(projectModel).subscribe(response=>{
        this.toastr.success("UPDATE OK")
        this.router.navigate(['/admin']);
      },responseError=>{
        this.toastr.error(responseError.error)
      })
    }   

  }



}
