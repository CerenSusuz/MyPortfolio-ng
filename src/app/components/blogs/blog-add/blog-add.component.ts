import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/models/subject';
import { BlogService } from 'src/app/services/blog.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {

  blogAddForm: FormGroup;
  subjects:Subject[];

  constructor(private formBuilder: FormBuilder,
    private blogService: BlogService,
    private toastrService: ToastrService,
    private router: Router,
    private subjectService:SubjectService
  ) { }

  ngOnInit(): void {
    this.createBlogAddForm();
    this.getSubjects();
  }

  getSubjects(){
    this.subjectService.getSubjects().subscribe(response=>{
      this.subjects=response.data;
    })

  }

  createBlogAddForm() {
    this.blogAddForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      description: ["", Validators.required],
      subjectId:["",Validators.required]
    })
  }


  add() {
    if (this.blogAddForm.valid) {
      let blogModel = Object.assign({}, this.blogAddForm.value)
      console.log(blogModel)
      this.blogService.add(blogModel).subscribe(response => {
        this.toastrService.success("OK admin")
        this.router.navigate(['/admin']);
      }, responseError => {
        this.toastrService.error('ERROR')
      })
    }
  }

}
