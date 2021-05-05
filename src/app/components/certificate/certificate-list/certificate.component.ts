import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/models/certificate';
import { CertificateService } from 'src/app/services/certificate.service';


@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  certificates:Certificate[];
  constructor(private certificateService:CertificateService) { }

  ngOnInit(): void {
    this.getCertificates();
  }

  getCertificates(){
    this.certificateService.getCertificates().subscribe(response=>{
      this.certificates=response.data;
    })
  }



}
