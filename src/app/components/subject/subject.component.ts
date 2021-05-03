import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjects:Subject[];
  constructor(private subjectService:SubjectService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(){
    this.subjectService.getSubjects().subscribe(response=>{
      this.subjects=response.data;
    })
  }

}
