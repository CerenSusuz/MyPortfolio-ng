import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogComment } from 'src/app/models/blogComment';
import { CommentService } from 'src/app/services/comment.service';
import { FuncsService } from 'src/app/services/funcs.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  commentUpdateForm:FormGroup;
  comment:BlogComment;

  constructor(private formBuilder:FormBuilder,
    private commentService:CommentService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private funcsService:FuncsService) { }

  ngOnInit(): void {
    this.createCommentUpdateForm()
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getComment(params["id"])
      }
    })
  }

  createCommentUpdateForm() {
    this.commentUpdateForm = this.formBuilder.group({
      content: ["", Validators.required]
    })
  }

  getComment(id:number){
    this.commentService.getById(id).subscribe(response=>{
      this.comment=response.data;
      this.commentUpdateForm.setValue({
        content:this.comment.content,
      })
    })
  }

  update() {
    if (this.commentUpdateForm.valid ) {
      let commentModel: BlogComment = Object.assign({}, this.commentUpdateForm.value)
      commentModel.blogId=this.comment.blogId;
      commentModel.id=this.comment.id,
      commentModel.userId = Number(this.funcsService.sessionStorageGetItem("id"));
        this.commentService.update(commentModel).subscribe(response => {
          this.toastrService.success("Comment updated.")
          this.router.navigate(['/blogs']);
        }, responseError => {
          this.toastrService.error(responseError.error.Message)
        })
      
    } else {
      this.toastrService.error("Form Error")
    }
  }




}
