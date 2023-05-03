import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assistant-datails',
  templateUrl: './assistant-datails.component.html',
  styleUrls: ['./assistant-datails.component.css']
})
export class AssistantDatailsComponent implements OnInit {

  id : any;
  assistantInfo : any = {};

  constructor(
    private activatedRoute : ActivatedRoute,
    private userService: UserService,
    private router : Router) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getProfileById(this.id).subscribe(
      (resp)=>{
        if (resp.isFinded) {
          this.assistantInfo= resp.user;
          console.log("here Assistant Info :",this.assistantInfo);
          
        } else {
          alert("ERROR in BL!");
        }
        
      }
    )
  }

  confirmAssistant(idUser) {

    let idObj = { id: idUser };

    this.userService.confirmProfileById(idObj).subscribe(
      (resp)=>{
        this.userService.getProfileById(this.id).subscribe(
          (resp)=>{
              this.assistantInfo= resp.user;
              console.log("here user Info :",this.assistantInfo);
          }
        )
      }
    )

  }


  deleteAssistant(idUser){
    this.userService.deleteProfileById(idUser).subscribe(
      (resp)=>{
        alert(resp.message);
        this.router.navigate(["admin"]);
      }
    );
  }

}
