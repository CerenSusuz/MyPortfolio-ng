import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Certificate } from 'src/app/models/certificate';
import { CertificateImage } from 'src/app/models/certificateImage';
import { CertificateImageService } from 'src/app/services/certificate-images.service';
import { CertificateService } from 'src/app/services/certificate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.css']
})
export class CertificateDetailComponent implements OnInit {

  certificate:Certificate;
  images:CertificateImage[];
  imageUrl = environment.baseURL;

  constructor(private certificateService:CertificateService,
    private certificateImageService:CertificateImageService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["certificateId"]){
        this.getCertificateDetail(params["certificateId"]);
        this.getImages(params["certificateId"]);
      }
    })
  }
  getCertificateDetail(certificateId:number){
    this.certificateService.getCertificate(certificateId).subscribe(response=>{
      this.certificate=response.data;
      console.log(this.certificate);
    })
  }

  getImages(certificateId:number){
    this.certificateImageService.getImagesByCertificateId(certificateId).subscribe(response=>{
      this.images=response.data;
      console.log(response);
    })
  }






}
