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
    EditInfoComponent
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
