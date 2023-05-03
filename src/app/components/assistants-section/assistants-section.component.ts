import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assistants-section',
  templateUrl: './assistants-section.component.html',
  styleUrls: ['./assistants-section.component.css']
})
export class AssistantsSectionComponent implements OnInit {
  assistantsTable: any = [];
  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsersByRole({role:"assistant"}).subscribe(
      (resp)=>{
        this.assistantsTable=resp.users.filter((user)=>{
          return(user.status === 'confirmed');
        }).slice(0,6);
      }
    )

  }

}
