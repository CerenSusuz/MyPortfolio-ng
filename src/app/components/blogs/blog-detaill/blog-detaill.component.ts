import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogImage } from 'src/app/models/blogImage';
import { BlogImageService } from 'src/app/services/blog-images.service';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-blog-detaill',
  templateUrl: './blog-detaill.component.html',
  styleUrls: ['./blog-detaill.component.css']
})
export class BlogDetaillComponent implements OnInit {

  blog:Blog;
  images:BlogImage[];
  imageUrl=environment.baseURL;

  commentAddForm : FormGroup;
  comments:Comment[];

  constructor(private blogImageService:BlogImageService,
    private blogService:BlogService,
    private activatedRoute:ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private commentService:CommentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["blogId"]){
        this.getBlogDetail(params["blogId"]);
        this.getImages(params["blogId"]);
        this.createCommentAddForm();
        this.getCommentsByBlogId(params["blogId"]);
      }
    })
  }

  getBlogDetail(blogId:number){
    this.blogService.getById(blogId).subscribe(response=>{
      this.blog=response.data;
    })
  }

  getImages(blogId:number){
  this.blogImageService.getImagesByBlogId(blogId).subscribe(response=>{
    this.images=response.data;
    })
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  // comment

  getCommentsByBlogId(blogId:number){
    this.commentService.getByBlogId(blogId).subscribe(response=>{
      this.comments=response.data;
      console.log(this.comments)
    })

  }

  createCommentAddForm() {
    this.commentAddForm = this.formBuilder.group({
      content: ["", Validators.required]
    })
  }

  add() {
    if (this.commentAddForm.valid) {
      let commentModel:Comment = Object.assign({}, this.commentAddForm.value)
      commentModel.userId = Number(sessionStorage.getItem("id"));
      commentModel.blogId = this.blog.id;
      this.commentService.add(commentModel).subscribe(response => {
        this.toastrService.success("Comment added.")
        window.location.reload();
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Validators Error")
          }       
        } 
      })
      
    }else{
      this.toastrService.error("Form Error")
    }
    }




  }


