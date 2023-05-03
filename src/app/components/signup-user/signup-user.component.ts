import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { passwordMatchValidator } from 'src/app/shared/genericFunctions'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit {

  signupUserForm: FormGroup;
  photoPreview: any;
  msgErr: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.signupUserForm = this.formBuilder.group({

      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      pwd: ["", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
      confirmPwd: ["", [Validators.required, passwordMatchValidator]],
      address: ["", [Validators.required]],
      photo: [""]

    })


  }

  signupUser() {
    if (this.router.url == "/subscription") {
      const now = new Date();
      const formattedDate = now.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      this.signupUserForm.value.subsDate = formattedDate;
      this.signupUserForm.value.role = "user";
      this.signupUserForm.value.status = "not confirmed";
      
      this.userService.signupUser(this.signupUserForm.value, this.signupUserForm.value.photo).subscribe(
        (resp) => {
          if (resp.isAdded) {
            Swal.fire({
              title: "You've been subscribed successfully.",
              icon: 'success',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              showConfirmButton: false,
              timer: 2500
            });
            this.router.navigate(["signin"]);
          } else {
            Swal.fire({
              icon: 'error',
              title: "we're sorry,",
              text: resp.message,
            });
            this.msgErr="Email/Tel you entered already exists !"
          }
        }
      );
    } else {
      const now = new Date();
      const formattedDate = now.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      this.signupUserForm.value.subsDate = formattedDate;
      this.signupUserForm.value.role = "admin";
      this.userService.signupAdmin(this.signupUserForm.value, this.signupUserForm.value.photo).subscribe(
        (resp) => {
          if (resp.isAdded) {
            Swal.fire({
              title: "You've been subscribed successfully.",
              icon: 'success',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              showConfirmButton: false,
              timer: 2500
            });
            this.router.navigate(["signin"]);
          } else {
            Swal.fire({
              icon: 'error',
              title: "we're sorry,",
              text: resp.message,
            });
            this.msgErr="Email/Tel you entered already exists !"
          }
        }
      );
    }


  }

  onSelectedImg(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.signupUserForm.patchValue({ photo: file });
    this.signupUserForm.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

}
