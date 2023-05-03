import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Injectable({
  providedIn: 'root',
})
export class UserService {


  userUrl: string = "http://localhost:3001/users"

  public token: string;
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;
  private name: string;



  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }


  getToken() {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  isUserAuth() {
    return this.isUserAuthenticated;
  }
  getName() {
    return this.name;
  }


  // signin(obj) {

  //   this.httpClient.post<{ user: any, message: string }>(this.userUrl + "/signin", obj).subscribe(
  //     (resp)=>{
  //       localStorage.removeItem("isUserAuth");
  //       if (resp.user) {

  //         this.token = resp.user.jwt;
  //         localStorage.setItem("token",this.token);
  //         this.isUserAuthenticated= true;
  //         localStorage.setItem("isUserAuth","true");
  //         this.name= resp.user.firstName;
  //         localStorage.setItem("name",this.name);
  //         this.authStatusListener.next(true);

  //         (resp.user.role == "admin")?
  //         this.router.navigate(["admin"]):
  //         this.router.navigate([""])

  //       } else {   
  //         localStorage.setItem("isUserAuth","false");
  //         console.log("hello");

  //       }
  //     }
  //   );

  // }




  signin(obj): Observable<boolean> {
    // Ici j'ai utilisé cette structure "Observable" pour permettre au component 
    // de récupérer un observable afin de résoudre le problèmes de l'asynchronisme 
    // et du memory leaking.
    return this.httpClient.post<{ user: any, message: string }>(this.userUrl + "/signin", obj)
      .pipe(
        map((resp) => {

          if (resp.user) {
            this.token = resp.user.jwt;
            localStorage.setItem("token", this.token);
            this.isUserAuthenticated = true;
            localStorage.setItem("isUserAuth", "true");
            this.name = resp.user.firstName + " " + resp.user.lastName.toUpperCase();
            localStorage.setItem("name", this.name);
            this.authStatusListener.next(true);




            (resp.user.role == "admin") ?
              this.router.navigate(["admin"]) :
              this.router.navigate([""]);

            Swal.fire({
              title: `Hello ${this.name} !`,
              showConfirmButton: false,
              timer: 4000,
              position: 'top',
              backdrop: `
                  rgba(0,0,123,0.4)
                  url("assets/images/icons/welcome-gif.gif")
                  bottom
                  no-repeat
                `,
              width: 600,
              padding: '3em'
              
            })

            return true;

          } else {
            localStorage.setItem("isUserAuth", "false");
            return false;
          }
        })
      );
  }


  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("isUserAuth");
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    Swal.fire({
      title: 'See You soon.',
      width: 600,
      padding: '3em',
      showConfirmButton: false,
      timer:2000,
      backdrop: `
        rgba(0,0,123,0.4)
        url("assets/images/icons/bye-bye.gif")
        left top
        no-repeat
      `
    })
    this.router.navigate(['signin']);
  }


  signupAdmin(admin, img: File) {
    let formData = new FormData();

    formData.append("firstName", admin.firstName);
    formData.append("lastName", admin.lastName);
    formData.append("email", admin.email);
    formData.append("tel", admin.tel);
    formData.append("pwd", admin.pwd);
    formData.append("address", admin.address);
    formData.append("role", admin.role);
    formData.append("subsDate", admin.subsDate);
    formData.append("photo", img);

    return this.httpClient.post<{ message: string, isAdded: boolean }>(this.userUrl + "/adminSubscription", formData);

  }

  signupUser(user, img: File) {
    let formData = new FormData();

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("tel", user.tel);
    formData.append("pwd", user.pwd);
    formData.append("address", user.address);
    formData.append("role", user.role);
    formData.append("subsDate", user.subsDate);
    formData.append("status", user.status);
    formData.append("photo", img);

    return this.httpClient.post<{ message: string, isAdded: boolean }>(this.userUrl + "/userSubscription", formData);

  }

  signupAssistant(assistant, cv: File) {
    let formData = new FormData;

    formData.append("firstName", assistant.firstName);
    formData.append("lastName", assistant.lastName);
    formData.append("email", assistant.email);
    formData.append("tel", assistant.tel);
    formData.append("pwd", assistant.pwd);
    formData.append("address", assistant.address);
    formData.append("birthdate", assistant.birthdate);
    formData.append("gender", assistant.gender);
    formData.append("role", assistant.role);
    formData.append("subsDate", assistant.subsDate);
    formData.append("status", assistant.status);
    formData.append("cv", cv);


    return this.httpClient.post<{ message: string, isAdded: boolean }>(this.userUrl + "/assistantSubscription", formData);

  }

  editProfile(newProfile) {

    return this.httpClient.put<{ message: string, isEdited: boolean }>(this.userUrl + "/editProfile", newProfile);

  }

  changePwd(obj) {
    return this.httpClient.put<{ message: string, isChanged: boolean }>(this.userUrl + "/editProfile/changerPwd", obj);
  }

  getAllUsersByRole(obj) {
    return this.httpClient.post<{ users: any, message: string }>(this.userUrl + "/allUsersByRole", obj);
  }

  getProfileById(id) {
    return this.httpClient.get<{ user: any, isFinded: boolean }>(`${this.userUrl}/getProfileById/${id}`);
  }

  confirmProfileById(idObj) {
    return this.httpClient.put<{ message: string }>(this.userUrl + "/confirmProfileById", idObj)
  }

  deleteProfileById(id) {
    return this.httpClient.delete<{ message: string }>(this.userUrl + `/deleteProfileById/${id}`);
  }

  searchAssistant(obj) {
    return this.httpClient.post<{ assistants: any, isFinded: boolean }>(this.userUrl + "/searchAssistant", obj);
  }



  // For updating avatar in header:

  private avatarUrlSubject = new BehaviorSubject<string>(null);
  public avatarUrl$ = this.avatarUrlSubject.asObservable();

  updateAvatarUrl(newUrl: string) {
    this.avatarUrlSubject.next(newUrl);
  }



}
