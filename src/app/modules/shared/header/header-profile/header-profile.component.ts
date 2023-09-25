import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth_services/model/user.model';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { HeaderChildAbstract } from '../header-child-abstract/header-child-abstract.component';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent extends HeaderChildAbstract implements OnInit {

  user: User;
  addressId: string

  constructor(
    private auth: AuthService,
    public router:Router,
  ) {
    super();
    this.user = this.auth.getUser();
    let route = (this.router.url).replace(/\d+/g, '')
    if (route === '/profile/editAddress/'){
      this.addressId = JSON.parse(localStorage.getItem('addressObj')).id
    }
  }

  ngOnInit(): void {
  }

}
