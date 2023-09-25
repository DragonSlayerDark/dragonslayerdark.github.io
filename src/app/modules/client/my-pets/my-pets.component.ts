import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/store/custom/services/app.service';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.scss']
})
export class MyPetsComponent implements OnInit {

  constructor(
    private appService :AppService
  ) {
    this.appService.setPet();
   }

  ngOnInit(): void {

  }

}
