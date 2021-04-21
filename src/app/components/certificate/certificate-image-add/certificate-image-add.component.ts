import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificate } from 'src/app/models/certificate';
import { CertificateImage } from 'src/app/models/certificateImage';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { CertificateService } from 'src/app/services/certificate.service';
import { CertificateImageService } from 'src/app/services/certificate-images.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-certificate-image-add',
  templateUrl: './certificate-image-add.component.html',
  styleUrls: ['./certificate-image-add.component.css']
})
export class CertificateImageAddComponent implements OnInit {

  certificate:Certificate;
  images:CertificateImage[];
  imageUrl=environment.baseURL;
  selectedFile: ImageSnippet;

  constructor(private activatedRoute:ActivatedRoute,
    private certificateService:CertificateService,
    private imageService: CertificateImageService,
    private toastr: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["id"]){
        this.getCertificateDetails(params["id"]);
        this.getCertificateImagesByCertificateId(params["id"]);
      }
    })
  }

  getCertificateDetails(id:number){
    this.certificateService.getCertificate(id).subscribe(response => {
      this.certificate = response.data;
    })
  }

  getCertificateImagesByCertificateId(id:number){
    this.imageService.getImagesByCertificateId(id).subscribe(response=>{
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
      console.log(this.certificate.id)
  
      reader.addEventListener('load', (event: any) => {
  
        this.selectedFile = new ImageSnippet(event.target.result, file);
        this.selectedFile.pending = true;
        this.imageService.add(this.selectedFile.file,this.certificate.id).subscribe((response) => {
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
