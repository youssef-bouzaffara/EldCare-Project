import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';





@Component({
  selector: 'app-assistant-info',
  templateUrl: './assistant-info.component.html',
  styleUrls: ['./assistant-info.component.css']
})
export class AssistantInfoComponent implements OnInit {

  id: any;
  assistant: any = {};
  cvUrl: any;
  img: any;
  showButton: boolean = false;


  private map: L.Map;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private http: HttpClient


  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getProfileById(this.id).subscribe(
      (resp) => {
        if (resp.isFinded) {
          this.assistant = resp.user;
          this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.assistant.cv);
          console.log("here Assistant Info :", this.assistant);

          this.initMap();

        } else {
          alert("ERROR in BL!");
        }

      }
    );
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  contactAssistant() {
    this.router.navigate([`contactAssistant/${this.assistant._id}`])
  }



  private initMap(): void {

    let lat: any
    let lng: any

    const url = 'https://nominatim.openstreetmap.org/search/' + this.assistant.address + '?format=json&limit=1';

    this.http.get(url).subscribe((response: any) => {
      console.log("here response address :", response);
      
      if (response && response.length) {
        lat = response[0].lat;
        lng = response[0].lon;

        this.map = L.map('map', {
          center: [lat, lng],
          zoom: 10
        });

        const marker = L.marker([lat, lng]).addTo(this.map);
        const circle = L.circle([lat, lng], {
          color: 'white',
          fillOpacity: 0.2,
          radius: 25000
        }).addTo(this.map);
        let newLat = Number(lat) + 0.1;
        var popup = L.popup()
          .setLatLng([newLat, lng])
          .setContent("This is my favourit Area.")
          .openOn(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 15,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
      }
      else {
        alert("Error: Couldn't find location");
      }

    });


  }


  onScroll() {
    // Logic to check whether the user has scrolled to a certain point

    if (window.pageYOffset > 500) {
      this.showButton = true;

      
    } else {
      this.showButton = false;
    }
    const fixedButton = document.getElementById("fixedButton");
    if (fixedButton) {
      fixedButton.classList.toggle("show", this.showButton);
    }
  }


  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
