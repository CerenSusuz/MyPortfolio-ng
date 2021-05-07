import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogAddComponent } from './components/blogs/blog-add/blog-add.component';
import { BlogDetaillComponent } from './components/blogs/blog-detaill/blog-detaill.component';
import { BlogImageAddComponent } from './components/blogs/blog-image-add/blog-image-add.component';
import { BlogsComponent } from './components/blogs/blog-list/blogs.component';
import { BlogUpdateComponent } from './components/blogs/blog-update/blog-update.component';
import { CertificateAddComponent } from './components/certificate/certificate-add/certificate-add.component';
import { CertificateDetailComponent } from './components/certificate/certificate-detail/certificate-detail.component';
import { CertificateImageAddComponent } from './components/certificate/certificate-image-add/certificate-image-add.component';
import { CertificateUpdateComponent } from './components/certificate/certificate-update/certificate-update.component';
import { CommentEditComponent } from './components/comment-edit/comment-edit.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { PictureAddComponent } from './components/picture/picture-add/picture-add.component';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { ProjectUpdateComponent } from './components/projects/project-update/project-update.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SubjectviablogComponent } from './components/subject/subjectviablog/subjectviablog.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomepageComponent},
  {path:"homepage",pathMatch:"full",component:HomepageComponent},
  {path:"aboutMe",component:AboutMeComponent},
  {path:"login",component:LoginComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"admin",component:AdminComponent},
  {path:"user/edit",component:EditInfoComponent, canActivate:[LoginGuard]},

  {path:"certificates/details/:certificateId",component:CertificateDetailComponent, canActivate:[LoginGuard]},
  {path:"certificate/update/:id",component:CertificateUpdateComponent},
  {path:"certificate/add",component:CertificateAddComponent},
  {path:"certificate/addImage/:id",component:CertificateImageAddComponent},

  {path:"blogs/details/:blogId",component:BlogDetaillComponent, canActivate:[LoginGuard]},
  {path:"blog/add",component:BlogAddComponent,canActivate:[LoginGuard]},
  {path:"blog/update/:id",component:BlogUpdateComponent},
  {path:"blog/addImage/:id",component:BlogImageAddComponent},
  {path:"blogs",component:BlogsComponent, canActivate:[LoginGuard]},
  {path:"blogsofsubjects/:subjectId",component:SubjectviablogComponent},

  {path:"project/add",component:ProjectAddComponent},
  {path:"project/update/:id",component:ProjectUpdateComponent},

  {path:"picture/add",component:PictureAddComponent},
  
  {path:"comment/update/:id",component:CommentEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
