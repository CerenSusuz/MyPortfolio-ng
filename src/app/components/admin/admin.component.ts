import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Certificate } from 'src/app/models/certificate';
import { Project } from 'src/app/models/project';
import { BlogService } from 'src/app/services/blog.service';
import { CertificateService } from 'src/app/services/certificate.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  projects:Project[];
  currentProject:Project;

  blogs:Blog[];
  currentBlog:Blog;

  certificates:Certificate[];
  currentCertificate:Certificate;


  constructor(private projectService:ProjectService,
    private blogService:BlogService,
    private certificateService:CertificateService
    ) { }

  ngOnInit(): void {
    this.getProjects();
    this.getBlogs();
    this.getCertificates()
  }

  getProjects(){
    this.projectService.getProjects().subscribe(response=>{
     this.projects=response.data;
     console.log(this.projects)
    })
  }

  setCurrentProject(project:Project){
    this.currentProject=project;
  }

  getProjectClass(project:Project){
    if(project==this.currentProject){
      return "table-info cursorPointer"
    }else{
      return "cursorPointer"
    }
  }

  getBlogs(){
    this.blogService.getAll().subscribe(response=>{
     this.blogs=response.data;
     console.log(this.blogs)
    })
  }

  setCurrentBlog(blog:Blog){
    this.currentBlog=blog;
  }

  getBlogClass(blog:Blog){
    if(blog==this.currentBlog){
      return "table-info cursorPointer"
    }else{
      return "cursorPointer"
    }
  }

  getCertificates(){
    this.certificateService.getCertificates().subscribe(response=>{
     this.certificates=response.data;
     console.log(this.certificates)
    })
  }

  setCurrentCertificate(certificate:Certificate){
    this.currentCertificate=certificate;
  }

  getCertificateClass(certificate:Certificate){
    if(certificate==this.currentCertificate){
      return "table-info cursorPointer"
    }else{
      return "cursorPointer"
    }
  }




}
