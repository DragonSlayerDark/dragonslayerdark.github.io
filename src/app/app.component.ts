import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { selectLoading } from './store/custom/selectors/pawl.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) {
    this.loading$ = this.store.pipe(select(selectLoading));
  }

  ngOnInit(): void {
  }


}
