import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth_services/store/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.getId();
    setTimeout(() => this.debug(), 1000);
  }

  debug() {
    if (localStorage.getItem('reloadDebug') === null || JSON.parse(localStorage.getItem('reloadDebug')) === false) {
      window.location.reload();
      localStorage.setItem('reloadDebug', JSON.stringify(true));
    }
  }

}
