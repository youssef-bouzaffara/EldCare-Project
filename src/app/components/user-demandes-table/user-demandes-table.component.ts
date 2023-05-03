import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandesService } from 'src/app/services/demandes.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-demandes-table',
  templateUrl: './user-demandes-table.component.html',
  styleUrls: ['./user-demandes-table.component.css']
})
export class UserDemandesTableComponent implements OnInit {

  demandesTab: any = [];
  isEmpty: boolean =true;
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
            if (this.decodeToken.userId === dataResp.demandes[i].idSender) {

              let demandesInfo: any = {};
              let assistant: any = {};

              demandesInfo.id = dataResp.demandes[i]._id;
              demandesInfo.status = dataResp.demandes[i].status;

              this.userService.getProfileById(dataResp.demandes[i].idAssistant).subscribe(
                (response) => {
                  assistant = response.user;

                  demandesInfo.assistantName = assistant.firstName + " " + assistant.lastName;
                  demandesInfo.assistantEmail = assistant.email;
                  demandesInfo.assistantTel = assistant.tel;

                  this.demandesTab.push(demandesInfo);

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

  confirmDemande(id) {
    for (let i = 0; i < this.demandesTab.length; i++) {

      // Here just double check the status of the demande is 'accepted'
      if (this.demandesTab[i].id == id && this.demandesTab[i].status === "accepted") {
        let edits = {
          idDemande: id,
          status: "confirmed"
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
              this.demandesTab = [];
              this.demandesService.getAllDemandes().subscribe(
                (dataResp) => {

                  for (let i = 0; i < dataResp.demandes.length; i++) {

                    // For only displayin the demandes of the connected user
                    if (this.decodeToken.userId === dataResp.demandes[i].idSender) {

                      let demandesInfo: any = {};
                      let assistant: any = {};

                      demandesInfo.id = dataResp.demandes[i]._id;
                      demandesInfo.status = dataResp.demandes[i].status;

                      this.userService.getProfileById(dataResp.demandes[i].idAssistant).subscribe(
                        (response) => {
                          assistant = response.user;

                          demandesInfo.assistantName = assistant.firstName + " " + assistant.lastName;
                          demandesInfo.assistantEmail = assistant.email;
                          demandesInfo.assistantTel = assistant.tel;

                          this.demandesTab.push(demandesInfo);

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


  removeDemande(id) {

    let edits = {
      idDemande: id,
      status: "withdrawn"
    };

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
        this.demandesService.editDemandeById(edits).subscribe(
          (resp) => {
            if (resp.isEdited) {
              Swal.fire({
                icon: 'success',
                title: 'Nice!',
                text: resp.message,
              });
              // Here to reintialise the tab
              this.demandesTab = [];
              this.demandesService.getAllDemandes().subscribe(
                (dataResp) => {
                  
                  for (let i = 0; i < dataResp.demandes.length; i++) {
    
                    // For only displayin the demandes of the connected user
                    if (this.decodeToken.userId === dataResp.demandes[i].idSender) {
    
                      let demandesInfo: any = {};
                      let assistant: any = {};
    
                      demandesInfo.id = dataResp.demandes[i]._id;
                      demandesInfo.status = dataResp.demandes[i].status;
    
                      this.userService.getProfileById(dataResp.demandes[i].idAssistant).subscribe(
                        (response) => {
                          assistant = response.user;
    
                          demandesInfo.assistantName = assistant.firstName + " " + assistant.lastName;
                          demandesInfo.assistantEmail = assistant.email;
                          demandesInfo.assistantTel = assistant.tel;
    
                          this.demandesTab.push(demandesInfo);
    
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
      }
    })

    


  }


}
