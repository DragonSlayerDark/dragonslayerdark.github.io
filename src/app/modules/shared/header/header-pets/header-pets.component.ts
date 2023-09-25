import { Component, OnInit } from '@angular/core';
import { HeaderChildAbstract } from '../header-child-abstract/header-child-abstract.component';

@Component({
  selector: 'app-header-pets',
  templateUrl: './header-pets.component.html',
  styleUrls: ['./header-pets.component.scss']
})
export class HeaderPetsComponent extends HeaderChildAbstract implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
