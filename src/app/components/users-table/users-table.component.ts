import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  @Input() roleWanted : string
  usersTab: any = [];
  isEmpty: boolean = false;

  constructor(
    private userService: UserService,
    private router : Router) { }

  ngOnInit() {
    this.userService.getAllUsersByRole({ role: this.roleWanted }).subscribe(
      (resp) => {
        this.usersTab = resp.users;
        if (this.usersTab.length == 0) {
          this.isEmpty = true;
        }

      }
    );
  }

  confirmUser(idUser) {

    let idObj = { id: idUser };

    this.userService.confirmProfileById(idObj).subscribe(
      (resp)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: resp.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.userService.getAllUsersByRole({role: this.roleWanted}).subscribe(
          (data)=>{
            this.usersTab= data.users;
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
        this.userService.getAllUsersByRole({role: this.roleWanted}).subscribe(
          (data)=>{
            this.usersTab= data.users;
            if (this.usersTab.length == 0) {
              this.isEmpty = true;
            }
          }
        )
      }
    );
  }

  displayUser(id){
    this.router.navigate([`userDetails/${id}`]);
  }

}
