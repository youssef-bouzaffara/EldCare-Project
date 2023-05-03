import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DemandesService } from 'src/app/services/demandes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-assistant',
  templateUrl: './contact-assistant.component.html',
  styleUrls: ['./contact-assistant.component.css']
})
export class ContactAssistantComponent implements OnInit {

  contactAssistantForm: FormGroup;
  profile: any = {};
  token: any;
  decodeToken: any;
  id: any;
  assistant: string;
  demande: any = {};
  isSubject: boolean = true;


  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private demandesServices: DemandesService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem("token");
    if (this.token == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please Login Before',
        showConfirmButton: false,
        timer: 2500
      })
      this.router.navigate(["signin"]);
    } else {
      this.id = this.activatedRoute.snapshot.paramMap.get("id");
      this.decodeToken = jwt_decode(this.token);
      this.userService.getProfileById(this.decodeToken.userId).subscribe(
        (resp) => {
          this.profile = resp.user;
          this.userService.getProfileById(this.id).subscribe(
            (response) => {
              this.assistant = response.user;
            }
          );
        }
      );
    }


  }

  // send demande to assistant
  send() {
    if (this.demande.subject) {
      this.isSubject = true;
      const now = new Date();
      const formattedDate = now.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      this.demande = {
        demandeDate: formattedDate,
        telSender: this.profile.tel,
        firstNameSender: this.profile.firstName,
        lastNameSender: this.profile.lastName,
        idAssistant: this.id,
        subject: this.demande.subject
      }
      this.demandesServices.addDemande(this.demande).subscribe(
        (resp) => {
          if (resp.isAdded) {
            // sweet alert success :
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: resp.message,
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate([""]);
          } else {
            // sweet alert Error :
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: resp.message,
            });
          }
        }
      );

    } else {
      this.isSubject = false;
    }
  }

}
