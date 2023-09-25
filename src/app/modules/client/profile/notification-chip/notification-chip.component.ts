import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-chip',
  templateUrl: './notification-chip.component.html',
  styleUrls: ['./notification-chip.component.scss']
})
export class NotificationChipComponent implements OnInit {
  @Input() notification: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.notification);
  }

}
