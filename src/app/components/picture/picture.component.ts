import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/models/picture';
import { PictureService } from 'src/app/services/picture.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  pictures:Picture[];
  imageUrl = environment.baseURL;
  
  constructor(private pictureService:PictureService) { }

  ngOnInit(): void {
    this.getPictures();
  }

  getPictures(){
    this.pictureService.getAll().subscribe(response=>{
      this.pictures=response.data;
    })
  }

}
