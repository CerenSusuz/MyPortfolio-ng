import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificateService } from 'src/app/services/certificate.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-certificate-add',
  templateUrl: './certificate-add.component.html',
  styleUrls: ['./certificate-add.component.css']
})
export class CertificateAddComponent implements OnInit {

  certificateAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private certificateService:CertificateService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createCertificateAddForm();
  }

  createCertificateAddForm(){
    this.certificateAddForm = this.formBuilder.group({
      title:["",Validators.required],
      receivedDate:["",Validators.required]
    })
  }

  add(){
    if(this.certificateAddForm.valid){      
      let certificateModel = Object.assign({},this.certificateAddForm.value)
      console.log(certificateModel)
      this.certificateService.add(certificateModel).subscribe(response=>{
        this.toastrService.success("OK admin")
        this.router.navigate(['/admin']);
      },responseError=>{
        this.toastrService.error('ERROR')
      })
    }
  }


}
