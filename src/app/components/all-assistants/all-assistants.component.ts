import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-assistants',
  templateUrl: './all-assistants.component.html',
  styleUrls: ['./all-assistants.component.css']
})
export class AllAssistantsComponent implements OnInit {
  assistantsTable: any = [];
  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsersByRole({role:"assistant"}).subscribe(
      (resp)=>{
        this.assistantsTable=resp.users.filter((user)=>{
          return(user.status === 'confirmed');
        });
      }
    )

  }

}
