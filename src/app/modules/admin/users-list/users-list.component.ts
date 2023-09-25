import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth_services/model/user.model';
import { AppState } from 'src/app/store/app.state';
import { loadUsers } from 'src/app/store/entities/actions/user.actions';
import { selectAllUsers } from 'src/app/store/entities/selectors/user.selectors';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.users$ = this.store.pipe(select(selectAllUsers));
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

}
