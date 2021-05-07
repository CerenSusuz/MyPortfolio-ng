import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/models/blog';
import { BlogComment } from 'src/app/models/blogComment';
import { BlogImage } from 'src/app/models/blogImage';
import { Certificate } from 'src/app/models/certificate';
import { CertificateImage } from 'src/app/models/certificateImage';
import { Picture } from 'src/app/models/picture';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { BlogImageService } from 'src/app/services/blog-images.service';
import { BlogService } from 'src/app/services/blog.service';
import { CertificateImageService } from 'src/app/services/certificate-images.service';
import { CertificateService } from 'src/app/services/certificate.service';
import { CommentService } from 'src/app/services/comment.service';
import { PictureService } from 'src/app/services/picture.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  projects: Project[];
  currentProject: Project;

  blogs: Blog[];
  currentBlog: Blog;
  blogImages: BlogImage[];
  currentBlogImage: BlogImage;

  certificates: Certificate[];
  currentCertificate: Certificate;
  certificateImages: CertificateImage[];
  currentCertificateImage: CertificateImage;

  pictures: Picture[];
  currentPicture: Picture;

  comments: BlogComment[];
  currentComment: BlogComment;

  users: User[];
  currentUser: User;

  imageUrl = environment.baseURL;

  constructor(private projectService: ProjectService,
    private blogService: BlogService,
    private certificateService: CertificateService,
    private toastrService: ToastrService,
    private blogImagesService: BlogImageService,
    private certificateImageService: CertificateImageService,
    private commentService: CommentService,
    private pictureService: PictureService,
    private userService: UserService


  ) { }

  ngOnInit(): void {
    this.getProjects();
    this.getBlogs();
    this.getCertificates();
    this.getBlogImages();
    this.getCertificateImages();
    this.getComments();
    this.getPictures();
    this.getUsers();
  }

  //Blog Images

  getBlogImages() {
    this.blogImagesService.getAll().subscribe(response => {
      this.blogImages = response.data;
    })
  }

  setCurrentBlogImage(blogImage: BlogImage) {
    this.currentBlogImage = blogImage;
  }

  getBlogImageClass(blogImage: BlogImage) {
    if (blogImage == this.currentBlogImage) {
      return "table-info cursorPointer"
    } else {
      return "cursorPointer"
    }
  }

  deleteBlogImage(blogImage: BlogImage) {
    let blogImageModel: BlogImage = {
      id: blogImage.id,
      isActive: blogImage.isActive,
      createdAt: blogImage.createdAt,
      blogId: blogImage.blogId,
      imagePath: blogImage.imagePath,
    }
    this.blogImagesService.delete(blogImageModel).subscribe(response => {
      this.toastrService.success("DELETE OK")
      window.location.reload()
    }, responseError => {
      this.toastrService.error("ERRROR")
    })
  }

  // Pictures

  getPictures() {
    this.pictureService.getAll().subscribe(response => {
      this.pictures = response.data;
    })
  }

  setCurrentPicture(picture: Picture) {
    this.currentPicture = picture;
  }

  getPictureClass(picture: Picture) {
    if (picture == this.currentPicture) {
      return "table-info cursorPointer"
    } else {
      return "cursorPointer"
    }
  }

  deletePicture(picture: Picture) {
    let pictureModel: Picture = {
      id: picture.id,
      isActive: picture.isActive,
      createdAt: picture.createdAt,
      imagePath: picture.imagePath,
    }
    this.pictureService.delete(pictureModel).subscribe(response => {
      this.toastrService.success("DELETE OK")
      window.location.reload()
    }, responseError => {
      this.toastrService.error("ERRROR")
    })
  }

  //Certificate Images

  getCertificateImages() {
    this.certificateImageService.getAll().subscribe(response => {
      this.certificateImages = response.data;
    })
  }

  setCurrentCertificateImage(certificateImage: CertificateImage) {
    this.currentCertificateImage = certificateImage;
  }

  getCertificateImageClass(certificateImage: CertificateImage) {
    if (certificateImage == this.currentCertificateImage) {
      return "table-info cursorPointer"
    } else {
      return "cursorPointer"
    }
  }

  deleteCertificateImage(certificateImage: CertificateImage) {
    let certificateImageModel: CertificateImage = {
      id: certificateImage.id,
      isActive: certificateImage.isActive,
      createdAt: certificateImage.createdAt,
      certificateId: certificateImage.certificateId,
      imagePath: certificateImage.imagePath
    }
    this.certificateImageService.delete(certificateImageModel).subscribe(response => {
      this.toastrService.success("DELETE OK")
      window.location.reload()
    }, responseError => {
      this.toastrService.error("ERRROR")
    })
  }

  //Projects

  getProjects() {
    this.projectService.getProjects().subscribe(response => {
      this.projects = response.data;
    })
  }

  setCurrentProject(project: Project) {
    this.currentProject = project;
  }

  getProjectClass(project: Project) {
    if (project == this.currentProject) {
      return "table-info cursorPointer"
    } else {
      return "cursorPointer"
    }
  }

  deleteProject(project: Project) {
    let projectModel: Project = {
      id: project.id,
      isActive: project.isActive,
      createdAt: project.createdAt,
      title: project.title,
      content: project.content,
      description: project.description,
      link: project.link
    }
    this.projectService.delete(projectModel).subscribe(response => {
      this.toastrService.success("DELETE OK")
      window.location.reload()
    }, responseError => {
      this.toastrService.error("ERRROR")
    })
  }

  //Blogs

  getBlogs() {
    this.blogService.getAll().subscribe(response => {
      this.blogs = response.data;
    })
  }

  setCurrentBlog(blog: Blog) {
    this.currentBlog = blog;
  }

  getBlogClass(blog: Blog) {
    if (blog == this.currentBlog) {
      return "table-info cursorPointer"
    } else {
      return "cursorPointer"
    }
  }

  deleteBlog(blog: Blog) {
    let blogModel: Blog = {
      id: blog.id,
      isActive: blog.isActive,
      createdAt: blog.createdAt,
      title: blog.title,
      content: blog.content,
      description: blog.description,
      publishedDate: blog.publishedDate,
      subjectId: blog.subjectId
    }
    this.blogService.delete(blogModel).subscribe(response => {
      this.toastrService.success("DELETE OK")
      window.location.reload()
    }, responseError => {
      this.toastrService.error("ERRROR")
    })
  }

  // Certificates

  getCertificates() {
    this.certificateService.getCertificates().subscribe(response => {
      this.certificates = response.data;
    })
  }

  setCurrentCertificate(certificate: Certificate) {
    this.currentCertificate = certificate;
  }

  getCertificateClass(certificate: Certificate) {
    if (certificate == this.currentCertificate) {
      return "table-info cursorPointer"
    } else {
      return "cursorPointer"
    }
  }

  deleteCertificate(certificate: Certificate) {
    let certificateModel: Certificate = {
      id: certificate.id,
      isActive: certificate.isActive,
      createdAt: certificate.createdAt,
      title: certificate.title,
      receivedDate: certificate.receivedDate
    }
    this.certificateService.delete(certificateModel).subscribe(response => {
      this.toastrService.success("DELETE OK")
      window.location.reload()
    }, responseError => {
      this.toastrService.error("ERRROR")
    })
  }

  //Comments

  getComments() {
    this.commentService.getComments().subscribe(response => {
      this.comments = response.data;
    })
  }

  setCurrentComment(comment: BlogComment) {
    this.currentComment = comment;
  }

  getCommentClass(comment: BlogComment) {
    if (comment == this.currentComment) {
      return "table-info cursorPointer"
    } else {
      return "cursorPointer"
    }
  }

  deleteComment(comment: BlogComment) {
    let commentModel: BlogComment = {
      id: comment.id,
      blogId: comment.blogId,
      blog: comment.blog,
      user: comment.user,
      userId: comment.userId,
      writtenDate: comment.writtenDate,
      content: comment.content
    }
    this.commentService.delete(commentModel).subscribe(response => {
      this.toastrService.success("DELETE OK")
      window.location.reload()
    }, responseError => {
      this.toastrService.error("ERRROR")
    })
  }

  //Users

  getUsers() {
    this.userService.getAll().subscribe(response => {
      this.users = response.data;
    })
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getUserClass(user: User) {
    if (user == this.currentUser) {
      return "table-info cursorPointer"
    } else {
      return "cursorPointer"
    }
  }

  deleteUser(user: User) {
    let userModel: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passwordSalt: user.passwordSalt,
      passwordHash: user.passwordHash,
      status: user.status
    }
    this.userService.delete(userModel).subscribe(response => {
      this.toastrService.success("User Deleted")
      window.location.reload()
    }, responseError => {
      this.toastrService.error("User Deleted ERRROR")
    })
  }



}
