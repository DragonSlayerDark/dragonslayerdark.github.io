import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-my-orders-list',
  templateUrl: './my-orders-list.component.html',
  styleUrls: ['./my-orders-list.component.scss']
})
export class MyOrdersListComponent implements OnInit {

  constructor(
    private App: AppService
  ) { }

  ngOnInit(): void {
    this.App.onActivate();
  }

}
