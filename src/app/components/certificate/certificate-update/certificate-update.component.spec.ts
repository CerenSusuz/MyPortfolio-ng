import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateUpdateComponent } from './certificate-update.component';

describe('CertificateUpdateComponent', () => {
  let component: CertificateUpdateComponent;
  let fixture: ComponentFixture<CertificateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
