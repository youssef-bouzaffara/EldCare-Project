import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userType: string = 'simple';
  isSignupAdminPath: Boolean = false;

  constructor(
    private router : Router
  ) { }

  ngOnInit() {

    let thePath = this.router.url ;
    console.log("here actual path :",thePath);
    

    if (thePath == "/signupAdmin") {

      this.isSignupAdminPath = true;
      
    }


  }

  setUserType(type: string) {
    this.userType = type;
  }



}
