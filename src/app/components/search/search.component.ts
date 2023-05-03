import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  assistantSearchForm: FormGroup;
  searchObj : any = {};
  assistantFinded: boolean;
  init: boolean;
  assistantsTable: any = [];

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
    this.init= true;
  }
  search(){
    
    this.userService.searchAssistant(this.searchObj).subscribe(
      (resp)=>{
        if (!resp.isFinded) {
          this.assistantFinded= false;
          this.init= false;
        } else {
          this.init= false;
          this.assistantFinded= true;
          this.assistantsTable= resp.assistants
        }
      }
    )
    
  }

}
