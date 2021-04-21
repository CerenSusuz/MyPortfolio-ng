import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogImage } from 'src/app/models/blogImage';
import { BlogImageService } from 'src/app/services/blog-images.service';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-detaill',
  templateUrl: './blog-detaill.component.html',
  styleUrls: ['./blog-detaill.component.css']
})
export class BlogDetaillComponent implements OnInit {

  blog:Blog;
  images:BlogImage[];
  imageUrl=environment.baseURL;
  constructor(private blogImageService:BlogImageService,
    private blogService:BlogService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["blogId"]){
        this.getBlogDetail(params["blogId"]);
        this.getImages(params["blogId"]);
      }
    })
  }

  getBlogDetail(blogId:number){
    this.blogService.getById(blogId).subscribe(response=>{
      this.blog=response.data;
      console.log(this.blog)
    })
  }

  getImages(blogId:number){
  this.blogImageService.getImagesByBlogId(blogId).subscribe(response=>{
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
}
