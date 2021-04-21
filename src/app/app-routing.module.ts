import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogAddComponent } from './components/blogs/blog-add/blog-add.component';
import { BlogDetaillComponent } from './components/blogs/blog-detaill/blog-detaill.component';
import { BlogUpdateComponent } from './components/blogs/blog-update/blog-update.component';
import { CertificateAddComponent } from './components/certificate/certificate-add/certificate-add.component';
import { CertificateDetailComponent } from './components/certificate/certificate-detail/certificate-detail.component';
import { CertificateUpdateComponent } from './components/certificate/certificate-update/certificate-update.component';
import { ContactComponent } from './components/contact/contact.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { ProjectUpdateComponent } from './components/projects/project-update/project-update.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomepageComponent},
  {path:"homepage",pathMatch:"full",component:HomepageComponent},
  {path:"aboutMe",component:AboutMeComponent},
  {path:"contact",component:ContactComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:SignUpComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"admin",component:AdminComponent},
  {path:"user/edit",component:EditInfoComponent},

  {path:"certificates/details/:certificateId",component:CertificateDetailComponent},
  {path:"certificate/update/:id",component:CertificateUpdateComponent},
  {path:"certificate/add",component:CertificateAddComponent},

  {path:"blogs/details/:blogId",component:BlogDetaillComponent},
  {path:"blog/add",component:BlogAddComponent},
  {path:"blog/update/:id",component:BlogUpdateComponent},

  {path:"project/add",component:ProjectAddComponent},
  {path:"project/update/:id",component:ProjectUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
