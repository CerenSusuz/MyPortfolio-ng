import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogImage } from 'src/app/models/blogImage';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';
import { BlogImageService } from 'src/app/services/blog-images.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-blog-image-add',
  templateUrl: './blog-image-add.component.html',
  styleUrls: ['./blog-image-add.component.css']
})

export class BlogImageAddComponent implements OnInit {

  blog:Blog;
  images:BlogImage[];
  imageUrl = environment.baseURL;
  selectedFile: ImageSnippet;

  constructor(private activatedRoute:ActivatedRoute,
    private blogService:BlogService,
    private imageService: BlogImageService,
    private toastr: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["id"]){
        this.getBlogDetails(params["id"]);
        this.getBlogImagesByBlogId(params["id"]);
      }
    })
  }

  getBlogDetails(id:number)
  {
    this.blogService.getById(id).subscribe(response => {
      this.blog = response.data;
    })
  }

  getBlogImagesByBlogId(id:number){
    this.imageService.getImagesByBlogId(id).subscribe(response=>{
     this.images=response.data;
    })
     
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();
  
      reader.addEventListener('load', (event: any) => {
  
        this.selectedFile = new ImageSnippet(event.target.result, file);
        this.selectedFile.pending = true;
        this.imageService.add(this.selectedFile.file,this.blog.id).subscribe((response) => {
            this.onSuccess();
            window.location.reload()     
          },error => {
            this.onError();
            this.toastr.error(error.error.message)
            setTimeout(function(){
              alert("You are redirected back to the operations page");       
             }, 100);
             this.router.navigate(['/admin']);
            
          })
      });
      reader.readAsDataURL(file);
    }
}
