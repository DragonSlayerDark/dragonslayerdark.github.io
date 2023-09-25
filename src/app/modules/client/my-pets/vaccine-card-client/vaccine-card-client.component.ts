import { Component, OnInit } from '@angular/core';
import { PAWLLocalStorage } from 'src/app/exports/enums';

@Component({
  selector: 'app-vaccine-card-client',
  templateUrl: './vaccine-card-client.component.html',
  styleUrls: ['./vaccine-card-client.component.scss']
})
export class VaccineCardClientComponent implements OnInit {

  id = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_ID);

  constructor() { }

  ngOnInit(): void {
  }

}
