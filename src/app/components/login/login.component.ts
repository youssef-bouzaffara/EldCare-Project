import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup
  loginInfo:any ={};
  isAuth: boolean;

  constructor(
    private userService : UserService,
    private router : Router) { }

  ngOnInit() {
  }

  login(){
    
    if (this.loginInfo.pwd && (this.loginInfo.email || this.loginInfo.tel)) {

      this.userService.signin(this.loginInfo).subscribe((observable) => {
        if (observable) {
          this.isAuth = true;
          
        } else {
          this.isAuth = false;

        }
      });
      
      
     
    }
  }

}
