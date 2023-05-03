import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistant-box',
  templateUrl: './assistant-box.component.html',
  styleUrls: ['./assistant-box.component.css']
})
export class AssistantBoxComponent implements OnInit {

 
  @Input() assistant: any;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  displayAssistant(id){
    this.router.navigate([`assistantInfo/${id}`]);
  }
}
