import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  profile: any = {};
  token: any;
  decodeToken: any;
  isAssistant: boolean;
  cvUrl: any;


  editProfileForm: FormGroup;
  editInfo: any = {};
  editInfoForFiles: any = {};
  editActivated: boolean;
  photoPreview: any;
  cvFileName: string = "Update my CV";

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.editActivated = false;
    this.token = localStorage.getItem("token");
    this.decodeToken = jwt_decode(this.token);
    this.userService.getProfileById(this.decodeToken.userId).subscribe(
      (resp) => {

        this.profile = resp.user;
        this.editInfo = resp.user;
        console.log("here profile from BE:", this.profile);
        this.photoPreview = this.profile.avatar;
        this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.profile.cv);

        if (this.profile.role == "assistant") {
          this.isAssistant = true;
        } else {
          this.isAssistant = false;
        }

      }
    );
  }

  confirmEditedInfo() {
    console.log("here editInfo :", this.editInfo);
    const formData: FormData = new FormData();


    formData.append("id", this.editInfo._id);
    formData.append("firstName", this.editInfo.firstName);
    formData.append("lastName", this.editInfo.lastName);
    formData.append("email", this.editInfo.email);
    formData.append("pwd", this.editInfo.pwd);
    formData.append("tel", this.editInfo.tel);
    formData.append("address", this.editInfo.address);
    formData.append("role", this.editInfo.role);
    formData.append("status", this.editInfo.status);

    if (this.isAssistant) {
      formData.append("gender", this.editInfo.gender);
      formData.append("birthdate", this.editInfo.birthdate);
    };

    if (this.editInfoForFiles.avatar) {
      formData.append("photo", this.editInfoForFiles.avatar, this.editInfoForFiles.avatar.name);
    };

    if (this.editInfoForFiles.cv) {
      formData.append("cv", this.editInfoForFiles.cv, this.editInfoForFiles.cv.name);
    };



    this.userService.editProfile(formData).subscribe(
      (resp) => {

        if (resp.isEdited) {
          this.editActivated = false;

          Swal.fire({
            icon: 'success',
            title: resp.message,
            showConfirmButton: false,
            timer: 1500
          });

          this.userService.getProfileById(this.decodeToken.userId).subscribe(
            (resp) => {
              this.profile = resp.user;
              this.photoPreview = this.profile.avatar;
              this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.profile.cv);

              // Updating avatar in header
              this.userService.updateAvatarUrl(this.photoPreview);
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: "we're sorry,",
            text: resp.message,
          });
        }


      }
    )

  }

  editProfile() {
    this.editActivated = true;
    this.editInfo.pwd = null;
  }




  cancelEditProfile() {
    this.editActivated = false;
    this.userService.getProfileById(this.decodeToken.userId).subscribe(
      (resp) => {
        this.profile = resp.user;
        this.editInfo = resp.user;
        this.photoPreview = this.profile.avatar;
        this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.profile.cv);
      }
    );
  }

  onSelectedFile(event: Event, fieldName: string) {
    const file = (event.target as HTMLInputElement).files[0];


    const reader = new FileReader();

    if (fieldName == 'avatar') {
      reader.onload = () => {
        this.photoPreview = reader.result as string
      };
      reader.readAsDataURL(file);




    }

    if (fieldName == 'cv') {
      reader.onload = () => {
        reader.readAsDataURL(file);
      };
      this.cvFileName = file.name;
      this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));

    }
    this.editInfoForFiles[fieldName] = file;

  }



}
