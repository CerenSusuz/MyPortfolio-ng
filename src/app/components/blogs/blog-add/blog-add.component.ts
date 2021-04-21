import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {

  blogAddForm:FormGroup;
  constructor( private formBuilder:FormBuilder,
    private blogService:BlogService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createBlogAddForm();
  }


  createBlogAddForm(){
    this.blogAddForm = this.formBuilder.group({
      title:["",Validators.required],
      content:["",Validators.required],
      description:["",Validators.required]
    })
  }


  add(){
    if(this.blogAddForm.valid){      
      let blogModel = Object.assign({},this.blogAddForm.value)
      console.log(blogModel)
      this.blogService.add(blogModel).subscribe(response=>{
        this.toastrService.success("OK")
        this.router.navigate(['/admin']);
      },responseError=>{
        this.toastrService.info("Good Job admin")
      })
    }else{
      this.toastrService.error('ERROR')
    }
  }

}
