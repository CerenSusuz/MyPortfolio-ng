import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subjectviablog',
  templateUrl: './subjectviablog.component.html',
  styleUrls: ['./subjectviablog.component.css']
})
export class SubjectviablogComponent implements OnInit {

  blogs:Blog[];

  constructor(
    private blogService:BlogService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["subjectId"]){
        this.getBlogBySubject(params["subjectId"]);
      }
    })
  }

  getBlogBySubject(subjectId:number){
    this.blogService.getBySubjectId(subjectId).subscribe(response=>{
      this.blogs=response.data;
    })
  }


  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
}
