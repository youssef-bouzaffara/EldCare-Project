import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandesService } from 'src/app/services/demandes.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assistant-requests-table',
  templateUrl: './assistant-requests-table.component.html',
  styleUrls: ['./assistant-requests-table.component.css']
})
export class AssistantRequestsTableComponent implements OnInit {

  requestsTab: any = [];
  isEmpty: boolean = true;
  token: any;
  decodeToken: any;

  constructor(
    private demandesService: DemandesService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    this.demandesService.getAllDemandes().subscribe(
      (dataResp) => {
        if (dataResp.demandes.length) {

          this.token = localStorage.getItem("token");
          this.decodeToken = jwt_decode(this.token);

          for (let i = 0; i < dataResp.demandes.length; i++) {

            // For only displayin the demandes of the connected user
            if (this.decodeToken.userId === dataResp.demandes[i].idAssistant) {

              let requestInfo: any = {};
              let client: any = {};

              requestInfo.id = dataResp.demandes[i]._id;
              requestInfo.status = dataResp.demandes[i].status;

              this.userService.getProfileById(dataResp.demandes[i].idSender).subscribe(
                (response) => {
                  client = response.user;

                  requestInfo.clientFirstName = client.firstName;
                  requestInfo.clientLastName = client.lastName;
                  requestInfo.clientEmail = client.email;
                  requestInfo.clientTel = client.tel;

                  this.requestsTab.push(requestInfo);

                  this.isEmpty = false;


                }
              );

            }


          }


        }
        else {
          this.isEmpty = true;
        }

      }
    );



  }

  displayDemande(id) {
    this.router.navigate([`demandeDetails/${id}`]);
  }

  acceptDemande(id) {
    for (let i = 0; i < this.requestsTab.length; i++) {

      // Here just double check the status of the demande is 'accepted'
      if (this.requestsTab[i].id == id && this.requestsTab[i].status === "on hold") {
        let edits = {
          idDemande: id,
          status: "accepted"
        }
        this.demandesService.editDemandeById(edits).subscribe(
          (resp) => {

            if (resp.isEdited) {
              Swal.fire({
                icon: 'success',
                title: 'Nice!',
                text: resp.message,
              });

              // Here to reintialise the tab
              this.requestsTab = [];
              this.demandesService.getAllDemandes().subscribe(
                (dataResp) => {

                  for (let i = 0; i < dataResp.demandes.length; i++) {

                    // For only displayin the demandes of the connected user
                    if (this.decodeToken.userId === dataResp.demandes[i].idAssistant) {

                      let requestInfo: any = {};
                      let client: any = {};

                      requestInfo.id = dataResp.demandes[i]._id;
                      requestInfo.status = dataResp.demandes[i].status;

                      this.userService.getProfileById(dataResp.demandes[i].idSender).subscribe(
                        (response) => {
                          client = response.user;

                          requestInfo.clientFirstName = client.firstName;
                          requestInfo.clientLastName = client.lastName;
                          requestInfo.clientEmail = client.email;
                          requestInfo.clientTel = client.tel;

                          this.requestsTab.push(requestInfo);

                        }
                      );

                    }

                  }

                }
              );

            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resp.message,
              })
            }

          }
        )
        break;
      }

    }


  }


  declineDemande(id) {

    let edits = {
      idDemande: id,
      status: "declined"
    };

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, decline!'
    }).then((result) => {

      if (result.value === true) {
        this.demandesService.editDemandeById(edits).subscribe(
          (resp) => {
            if (resp.isEdited) {
              Swal.fire({
                icon: 'success',
                title: 'Nice!',
                text: resp.message,
              });
              // Here to reintialise the tab
              this.requestsTab = [];
              this.demandesService.getAllDemandes().subscribe(
                (dataResp) => {
    
                  for (let i = 0; i < dataResp.demandes.length; i++) {
    
                    // For only displayin the demandes of the connected user
                    if (this.decodeToken.userId === dataResp.demandes[i].idAssistant) {
    
                      let requestInfo: any = {};
                      let client: any = {};
    
                      requestInfo.id = dataResp.demandes[i]._id;
                      requestInfo.status = dataResp.demandes[i].status;
    
                      this.userService.getProfileById(dataResp.demandes[i].idSender).subscribe(
                        (response) => {
                          client = response.user;
    
                          requestInfo.clientFirstName = client.firstName;
                          requestInfo.clientLastName = client.lastName;
                          requestInfo.clientEmail = client.email;
                          requestInfo.clientTel = client.tel;
    
                          this.requestsTab.push(requestInfo);
    
                        }
                      );
    
                    }
    
                  }
    
                }
              );
    
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resp.message,
              })
            }
    
    
          }
        )
      };
      
    })


   


  }


}


