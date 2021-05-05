import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.css']
})
export class CommentUpdateComponent implements OnInit {

  commentUpdateForm:FormGroup;
  comment:Comment;

  constructor(private formBuilder:FormBuilder,
    private commentService:CommentService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
  }

}
