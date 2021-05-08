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
import { User } from 'src/app/models/user';
import { FuncsService } from 'src/app/services/funcs.service';
import { BlogComment } from 'src/app/models/blogComment';

@Component({
  selector: 'app-blog-detaill',
  templateUrl: './blog-detaill.component.html',
  styleUrls: ['./blog-detaill.component.css']
})
export class BlogDetaillComponent implements OnInit {

  blog: Blog;
  images: BlogImage[];
  imageUrl = environment.baseURL;
  user: User;

  commentAddForm: FormGroup;
  comments: BlogComment[];
  currentComment: BlogComment;

  commentUpdateForm: FormGroup;

  constructor(private blogImageService: BlogImageService,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private funcsService: FuncsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["blogId"]) {
        this.getBlogDetail(params["blogId"]);
        this.getImages(params["blogId"]);
        this.createCommentAddForm();
        this.getCommentsByBlogId(params["blogId"]);
      }
    })
  }

  getBlogDetail(blogId: number) {
    this.blogService.getById(blogId).subscribe(response => {
      this.blog = response.data;
    })
  }

  getImages(blogId: number) {
    this.blogImageService.getImagesByBlogId(blogId).subscribe(response => {
      this.images = response.data;
    })
  }

  getSliderClassName(index: Number) {
    if (index == 0) {
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  // comment

  getCommentsByBlogId(blogId: number) {
    this.commentService.getByBlogId(blogId).subscribe(response => {
      this.comments = response.data;
    })

  }

  createCommentAddForm() {
    this.commentAddForm = this.formBuilder.group({
      content: ["", Validators.required,Validators.maxLength(20)]
    })
  }


  add() {
    if (this.commentAddForm.valid) {
      let commentModel: BlogComment = Object.assign({}, this.commentAddForm.value)
      commentModel.userId = Number(this.funcsService.sessionStorageGetItem("id"));
      commentModel.blogId = this.blog.id;
      this.commentService.add(commentModel).subscribe(response => {
        this.toastrService.success("Comment added.")
        window.location.reload();
      }, responseError => {
        console.error(responseError.Message)
        this.toastrService.error("Max length 20!")
      })

    } else {
      this.toastrService.error("Form Error")
    }
  }

  delete(comment: BlogComment) {
    if (comment.userId == Number(this.funcsService.sessionStorageGetItem("id"))) {
      this.commentService.delete(comment).subscribe(response => {
        this.toastrService.success("Your comment deleted")
        window.location.reload()
      }, response => {
        this.toastrService.error("Error")
      })
    } else {
      this.toastrService.error("It's not your comment, sorry...")
    }
  }

  isUser(comment: BlogComment) {
    if (comment.userId == Number(this.funcsService.sessionStorageGetItem("id"))) {
      return true;
    }
    return false;
  }

}


