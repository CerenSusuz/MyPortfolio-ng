import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogDetaillComponent } from './components/blogs/blog-detaill/blog-detaill.component';
import { CertificateDetailComponent } from './components/certificate/certificate-detail/certificate-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
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
  {path:"certificates/details/:certificateId",component:CertificateDetailComponent},
  {path:"blogs/details/:blogId",component:BlogDetaillComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
