import { Component, Input, OnInit } from '@angular/core';
import { PAWLClientRoutes, PAWLMainRoutes } from 'src/app/exports/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() hsection: string;
  PAWLClientRoutes = PAWLClientRoutes;

  constructor() { }

  ngOnInit(): void {
  }

}
