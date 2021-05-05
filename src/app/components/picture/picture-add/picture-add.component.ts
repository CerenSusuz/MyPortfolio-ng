import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from 'src/app/models/picture';
import { PictureService } from 'src/app/services/picture.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-picture-add',
  templateUrl: './picture-add.component.html',
  styleUrls: ['./picture-add.component.css']
})
export class PictureAddComponent implements OnInit {

  images:Picture[];
  imageUrl = environment.baseURL;
  selectedFile: ImageSnippet;

  constructor(private activatedRoute:ActivatedRoute,
    private pictureService:PictureService,
    private toastr: ToastrService,
    private router:Router) { }

  ngOnInit(): void {

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
        this.pictureService.add(this.selectedFile.file).subscribe((response) => {
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
