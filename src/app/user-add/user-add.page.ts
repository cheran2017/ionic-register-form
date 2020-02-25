import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ReactiveFormsModule,FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { ToastController } from '@ionic/angular';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
   
})
export class UserAddPage implements OnInit {
  
  private addUserForm: FormGroup;
  name		        : 'cheran1';
  rmn		          : '917904047659';
  email		        : 'test1@gmail.com';
  gender	        : 'male';
  age_group	      : 27;
  profession      : 'Software Engineer';
  dob		          : '15-06-1993';
  sponsor_number  : 918903285003;
  sponsor_name    : 'Ashwin';
  district		    : 'Salem';
  isLoadingResults = false;
  toast: any;
  matcher = new MyErrorStateMatcher();
  constructor(private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name            : [null, Validators.required],
      rmn		          : [null, Validators.required],
      email		        : [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      gender	        : [null, Validators.required],
      age_group	      : [null, Validators.required],
      profession      : [null, Validators.required],
      dob		          : [null, Validators.required],
      sponsor_number  : [null, Validators.required],
      sponsor_name    : [null, Validators.required],
      district		    : [null, Validators.required],
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addUser(this.addUserForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          // console.log("========> I am from user add page===========>Add userForm value",this.addUserForm.value);
          console.log("========> I am from user add page===========>",res.status);
          if(res.status == true ) {
            this.toast = this.toastController.create({
              message: 'User Saved',
              duration: 2000
            }).then((toastData)=>{
              console.log(toastData);
              toastData.present();
            });
          } else {
            this.toast = this.toastController.create({
              message: 'User Failed To Save',
              duration: 2000
            }).then((toastData)=>{
              console.log(toastData);
              toastData.present();
            });
          }
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
