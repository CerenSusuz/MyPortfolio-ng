import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private certificateService:CertificateService,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.getProjects();
    this.getBlogs();
    this.getCertificates()
  }

  getProjects(){
    this.projectService.getProjects().subscribe(response=>{
     this.projects=response.data;
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

  deleteBlog(blog:Blog){
    let blogModel:Blog={
      id:blog.id,
      isActive:blog.isActive,
      createdAt:blog.createdAt,
      title:blog.title,
      content:blog.content,
      description:blog.description,
      publishedDate:blog.publishedDate
    }
    this.blogService.delete(blogModel).subscribe(response=>{
      this.toastrService.success("DELETE OK")
      window.location.reload()
    },responseError=>{
      this.toastrService.error("ERRROR")
    })
  }

  deleteProject(project:Project){
    let projectModel:Project={
      id:project.id,
      isActive:project.isActive,
      createdAt:project.createdAt,
      title:project.title,
      content:project.content,
      description:project.description,
      link:project.link
    }
    this.projectService.delete(projectModel).subscribe(response=>{
      this.toastrService.success("DELETE OK")
      window.location.reload()
    },responseError=>{
      this.toastrService.error("ERRROR")
    })
  }

  deleteCertificate(certificate:Certificate){
    let certificateModel:Certificate={
      id:certificate.id,
      isActive:certificate.isActive,
      createdAt:certificate.createdAt,
      title:certificate.title,
      receivedDate:certificate.receivedDate
    }
    this.certificateService.delete(certificateModel).subscribe(response=>{
      this.toastrService.success("DELETE OK")
      window.location.reload()
    },responseError=>{
      this.toastrService.error("ERRROR")
    })
  }


}
