import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandesService } from 'src/app/services/demandes.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demandes-table',
  templateUrl: './demandes-table.component.html',
  styleUrls: ['./demandes-table.component.css']
})
export class DemandesTableComponent implements OnInit {

  demandesTab: any = [];
  isEmpty: boolean;
  client: any = {};
  assistant: any = {};

  constructor(
    private demandesService: DemandesService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.demandesService.getAllDemandes().subscribe(
      (dataResp) => {
        if (dataResp.demandes.length) {

          for (let i = 0; i < dataResp.demandes.length; i++) {

            let demandesInfo: any = {};

            demandesInfo.id = dataResp.demandes[i]._id;
            demandesInfo.status = dataResp.demandes[i].status;

            this.userService.getProfileById(dataResp.demandes[i].idSender).subscribe(
              (resp) => {

                demandesInfo.demanderName = resp.user.firstName + " " + resp.user.lastName;
                demandesInfo.demanderEmail = resp.user.email;
                this.userService.getProfileById(dataResp.demandes[i].idAssistant).subscribe(
                  (response) => {
                    this.assistant = response.user;


                    demandesInfo.assistantName = this.assistant.firstName + " " + this.assistant.lastName;
                    demandesInfo.assistantEmail = this.assistant.email;



                  }
                );
              }
            );


            this.demandesTab.push(demandesInfo);

          }

        }
        else {
          this.isEmpty = true;
        }
      }
    )
  }

  displayDemande(id) {
    this.router.navigate([`demandeDetails/${id}`]);
  }

  deleteDemande(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value === true) {
        this.demandesService.deleteDemandeById(id).subscribe(
          (resp) => {
            if (resp.isDeleted) {
              Swal.fire({
                icon: 'success',
                title: resp.message,
                showConfirmButton: false,
                timer: 2000
              });

              // Here to reintialise tab:
              this.demandesTab = [];
              this.demandesService.getAllDemandes().subscribe(
                (dataResp) => {
                  if (dataResp.demandes.length) {

                    for (let i = 0; i < dataResp.demandes.length; i++) {

                      let demandesInfo: any = {};

                      demandesInfo.id = dataResp.demandes[i]._id;
                      demandesInfo.status = dataResp.demandes[i].status;

                      this.userService.getProfileById(dataResp.demandes[i].idSender).subscribe(
                        (resp) => {

                          demandesInfo.demanderName = resp.user.firstName + " " + resp.user.lastName;
                          demandesInfo.demanderEmail = resp.user.email;
                          this.userService.getProfileById(dataResp.demandes[i].idAssistant).subscribe(
                            (response) => {
                              this.assistant = response.user;


                              demandesInfo.assistantName = this.assistant.firstName + " " + this.assistant.lastName;
                              demandesInfo.assistantEmail = this.assistant.email;



                            }
                          );
                        }
                      );


                      this.demandesTab.push(demandesInfo);

                    }

                  }
                  else {
                    this.isEmpty = true;
                  }
                }
              )


            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resp.message,
              })
            }
          }
        )
      }
    })

  }

}
