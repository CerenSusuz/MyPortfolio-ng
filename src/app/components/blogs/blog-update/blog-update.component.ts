import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.css']
})
export class BlogUpdateComponent implements OnInit {

  blogUpdateForm:FormGroup;
  blog:Blog;

  constructor(private formBuilder:FormBuilder,
    private blogService:BlogService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createBlogUpdateForm()
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getBlog(params["id"])
      }
    })
  }

  createBlogUpdateForm(){
    this.blogUpdateForm = this.formBuilder.group({
      title:["",Validators.required],
      content:["",Validators.required],
      description:["",Validators.required]
    })
  }

  getBlog(id:number) {
    this.blogService.getById(id).subscribe((response) => {
      this.blog = response.data;
      this.blogUpdateForm.setValue({
        title:this.blog.title,
        description:this.blog.description,
        content:this.blog.content
      })
    });
  }

  update(){
    if(this.blogUpdateForm.valid){      
      let blogModel = Object.assign({},this.blogUpdateForm.value)
      console.log(this.blog)
      blogModel.id = this.blog.id;
      this.blogService.update(blogModel).subscribe(response=>{
        this.toastr.success("UPDATE OK")
        this.router.navigate(['/admin']);
      },responseError=>{
        this.toastr.error(responseError.error)
      })
    }    

  }
}
