import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { passwordMatchValidator } from 'src/app/shared/genericFunctions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-assistant',
  templateUrl: './signup-assistant.component.html',
  styleUrls: ['./signup-assistant.component.css']
})
export class SignupAssistantComponent implements OnInit {

  signupAssistantForm: FormGroup;
  fileName: string = "Upload your CV (.pdf)";
  file: any;
  msgErr: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.signupAssistantForm = this.formBuilder.group({

      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      pwd: ["", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
      confirmPwd: ["", [Validators.required, passwordMatchValidator]],
      address: ["", [Validators.required]],
      birthdate: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      cv: ["", [Validators.required]]

    })
  }

  signupAssitant() {
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    this.signupAssistantForm.value.subsDate = formattedDate;
    this.signupAssistantForm.value.role = "assistant";
    this.signupAssistantForm.value.status = "not confirmed";

    this.userService.signupAssistant(this.signupAssistantForm.value, this.file).subscribe(
      (resp) => {
        if (resp.isAdded) {
          Swal.fire({
            title: "You've been subscribed successfully.",
            icon: 'success',
            text: 'Please wait for Us ! An admin will confirm you soon.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            showConfirmButton: false,
            timer: 4000
          });
          this.router.navigate(["signin"]);
        } else {
          this.msgErr="The email/Tel you entered already exist !"
        }
      }
    );

  }

  onSelectedFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    console.log("here file uploaded :", this.file);


    const reader = new FileReader();
    reader.onload = () => {
      reader.readAsDataURL(this.file);
      this.signupAssistantForm.patchValue({ cv: this.file });
      this.signupAssistantForm.updateValueAndValidity();
      
    };
    this.fileName = this.file.name;

    console.log("here form:",this.signupAssistantForm.value);
    console.log("here file in form:",this.signupAssistantForm.value.cv);
    
  }

}
