import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  editPwdForm: FormGroup;
  err: boolean = false;
  msgErr: string;
  token: any;
  decodeToken: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    this.token = localStorage.getItem("token");
    this.decodeToken = jwt_decode(this.token);

    this.editPwdForm = this.formBuilder.group({
      id: [this.decodeToken.userId],
      email: ["", [Validators.required, Validators.email]],
      oldPwd: ["", [Validators.required]],
      newPwd: ["", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]]
    })



  }

  editPwd() {
    this.userService.changePwd(this.editPwdForm.value).subscribe(
      (resp) => {
        console.log("here response :", resp);
        if (resp.isChanged) {
          this.err = false;
          Swal.fire({
            icon: 'success',
            title: resp.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate([""]);
        } else {
          this.err = true;
          this.msgErr = resp.message;
        }

      }
    );

  }

}
