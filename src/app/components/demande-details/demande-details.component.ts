import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandesService } from 'src/app/services/demandes.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent implements OnInit {

  id: any;
  userInfo : any = {};
  assistantInfo : any = {};
  demandeDate: string;
  demandeSubj: string;
  demandeStatus: string;
  token: any;
  decodeToken: any;
  connectedUser: string;

  constructor(
    private activatedRoute : ActivatedRoute,
    private userService: UserService,
    private demandesService: DemandesService,
    private router : Router
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.decodeToken = jwt_decode(this.token);
    this.userService.getProfileById(this.decodeToken.userId).subscribe(
      (resp)=>{ 
          this.connectedUser=resp.user.role;
      }
    )

    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.demandesService.getDemandeById(this.id).subscribe(
      (resp)=>{
        if (resp.isFinded) {
          this.demandeDate=resp.demande.demandeDate;
          this.demandeSubj=resp.demande.subject;
          this.demandeStatus=resp.demande.status;
          this.userService.getProfileById(resp.demande.idSender).subscribe(
            (response_1)=>{
              if (response_1.isFinded) {
                this.userInfo=response_1.user;
              }
              this.userService.getProfileById(resp.demande.idAssistant).subscribe(
                (response_2)=>{
                  if (response_2.isFinded) {
                    this.assistantInfo=response_2.user;
                  }
                   
                }
              )
            }
          )
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Somthing wrong is happening',
          })
        }
        
      }
    )
  }

  deleteDemande() {
    this.demandesService.deleteDemandeById(this.id).subscribe(
      (resp) => {
        if (resp.isDeleted) {
          Swal.fire({
            icon: 'success',
            title: resp.message,
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(["admin"]);
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

}
