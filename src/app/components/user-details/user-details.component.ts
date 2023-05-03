import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id : any;
  userInfo : any = {};

  constructor(
    private activatedRoute : ActivatedRoute,
    private userService: UserService,
    private router : Router) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getProfileById(this.id).subscribe(
      (resp)=>{
        if (resp.isFinded) {
          this.userInfo= resp.user;
          console.log("here user Info :",this.userInfo);
          
        } else {
          alert("ERROR in BL!");
        }
        
      }
    )
  }

  confirmUser(idUser) {

    let idObj = { id: idUser };

    this.userService.confirmProfileById(idObj).subscribe(
      (resp)=>{
        this.userService.getProfileById(this.id).subscribe(
          (resp)=>{
              this.userInfo= resp.user;
              console.log("here user Info :",this.userInfo);
          }
        )
      }
    )

  }


  deleteUser(idUser){
    this.userService.deleteProfileById(idUser).subscribe(
      (resp)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: resp.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(["admin"]);
      }
    );
  }

}
