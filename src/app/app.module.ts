import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { ToastrModule } from 'ngx-toastr';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BlogsComponent } from './components/blogs/blog-list/blogs.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CertificateComponent } from './components/certificate/certificate-list/certificate.component';
import { BlogDetaillComponent } from './components/blogs/blog-detaill/blog-detaill.component';
import { AdminComponent } from './components/admin/admin.component';
import { CertificateDetailComponent } from './components/certificate/certificate-detail/certificate-detail.component';
import { EditInfoComponent } from './components/edit-info/edit-info.component';
import { BlogAddComponent } from './components/blogs/blog-add/blog-add.component';
import { BlogUpdateComponent } from './components/blogs/blog-update/blog-update.component';
import { BlogImageAddComponent } from './components/blogs/blog-image-add/blog-image-add.component';
import { CertificateUpdateComponent } from './components/certificate/certificate-update/certificate-update.component';
import { CertificateAddComponent } from './components/certificate/certificate-add/certificate-add.component';
import { ProjectAddComponent } from './components/projects/project-add/project-add.component';
import { ProjectUpdateComponent } from './components/projects/project-update/project-update.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    AboutMeComponent,
    ContactComponent,
    LoginComponent,
    SignUpComponent,
    BlogsComponent,
    ProjectsComponent,
    CertificateComponent,
    BlogDetaillComponent,
    AdminComponent,
    CertificateDetailComponent,
    EditInfoComponent,
    BlogAddComponent,
    BlogUpdateComponent,
    BlogImageAddComponent,
    CertificateUpdateComponent,
    CertificateAddComponent,
    ProjectAddComponent,
    ProjectUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
