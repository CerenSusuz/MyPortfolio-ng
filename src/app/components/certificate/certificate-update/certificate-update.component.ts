import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificate } from 'src/app/models/certificate';
import { ToastrService } from 'ngx-toastr';
import { CertificateService } from 'src/app/services/certificate.service';


@Component({
  selector: 'app-certificate-update',
  templateUrl: './certificate-update.component.html',
  styleUrls: ['./certificate-update.component.css']
})
export class CertificateUpdateComponent implements OnInit {

  certificateUpdateForm:FormGroup;
  certificate:Certificate;

  constructor(private formBuilder:FormBuilder,
    private certificateService:CertificateService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.createCertificateUpdateForm()
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCertificate(params["id"])
      }
    })
  }

  createCertificateUpdateForm(){
    this.certificateUpdateForm = this.formBuilder.group({
      title:["",Validators.required],
      receivedDate:["",Validators.required]
    })
  }

  getCertificate(id:number) {
    this.certificateService.getCertificate(id).subscribe((response) => {
      this.certificate = response.data;
      this.certificateUpdateForm.setValue({
        title:this.certificate.title,
        receivedDate:this.certificate.receivedDate
      })
    });
  }

  update(){
    if(this.certificateUpdateForm.valid){      
      let certificateModel = Object.assign({},this.certificateUpdateForm.value)
      certificateModel.id = this.certificate.id;
      this.certificateService.update(certificateModel).subscribe(response=>{
        this.toastr.success("UPDATE OK")
        this.router.navigate(['/admin']);
      },responseError=>{
        this.toastr.error(responseError.error)
      })
    }  

  }



}
