import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assistants-table',
  templateUrl: './assistants-table.component.html',
  styleUrls: ['./assistants-table.component.css']
})
export class AssistantsTableComponent implements OnInit {


  assistantsTab: any = [];
  isEmpty: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getAllUsersByRole({ role: "assistant" }).subscribe(
      (resp) => {
        this.assistantsTab = resp.users;
    
        if (this.assistantsTab.length == 0) {
          this.isEmpty = true;
        }

      }
    );


  }

  confirmAssistant(idUser) {

    let idObj = { id: idUser };

    this.userService.confirmProfileById(idObj).subscribe(
      (resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: resp.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.userService.getAllUsersByRole({ role: "assistant" }).subscribe(
          (data) => {
            this.assistantsTab = data.users;
            
          }
        )
      }
    )

  }

  deleteAssistant(idUser) {
    this.userService.deleteProfileById(idUser).subscribe(
      (resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: resp.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.userService.getAllUsersByRole({ role: "assistant" }).subscribe(
          (data) => {
            this.assistantsTab = data.users;
            if (this.assistantsTab.length == 0) {
              this.isEmpty = true;
            }
          }
        )
      }
    );
  }

  displayAssistant(id) {
    this.router.navigate([`assistantDetails/${id}`]);
  }


}
