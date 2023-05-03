import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAuthenticated = false;
  user: any;
  userRole: any;
  private authListenerSubs: Subscription;

  token: any;
  id: any;
  decodeToken: any;
  userAvatar: any;

  constructor(
    private userService : UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authListenerSubs= this.userService.getAuthStatusListener().subscribe(
      (isAuthenticated)=>{
        this.userIsAuthenticated=isAuthenticated
        this.user=this.userService.getName();
        if (this.userIsAuthenticated) {
          this.token=this.userService.getToken();
          this.decodeToken= jwt_decode(this.token);
    
          this.userService.getProfileById(this.decodeToken.userId).subscribe(
            (resp)=>{
              if (resp.isFinded) {
                this.userAvatar=resp.user.avatar;
                this.userRole=resp.user.role;
              } 
              else {
                alert("Error !!!");
                this.userService.logout();
              }
            }
          )
        }
        this.userService.avatarUrl$.subscribe((newUrl) => {
          if (newUrl) {
            this.userAvatar = newUrl;
          }
        });
      }
    )
    
    
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  navigateToSection(sectionId){
    this.router.navigate(["/"],{fragment: sectionId});
  }


  logout(){
    this.userService.logout();
  }

}
