import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth_services/store/auth.service';
import { AppState } from 'src/app/store/app.state';
import { loadMemorials } from 'src/app/store/entities/actions/memorial.actions';
import { Memorial } from 'src/app/store/entities/models/memorial.model';
import { Pet } from 'src/app/store/entities/models/pet.model';
import { selectAllMemorials } from 'src/app/store/entities/selectors/memorial.selectors';
import { selectPetById } from 'src/app/store/entities/selectors/pet.selectors';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-list-pets',
  templateUrl: './list-pets.component.html',
  styleUrls: ['./list-pets.component.scss']
})
export class ListPetsComponent implements OnInit {

  pet$: Observable<EntityStrapi<Pet>> = null;
  calculatedAge: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>,
    private auth: AuthService,
    private App: AppService
  ) {
    this.auth.checkPetId();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({ id }) => {
      this.pet$ = this.store.pipe(select(selectPetById(id)), filter((x) => x != null), tap((x) => {
        // x.attributes.dob is the date of birth, format: YYYY-MM-DD, calculate the number of years and store it in this.calculatedYears
        let years = new Date().getFullYear() - new Date(x.attributes.dob).getFullYear();
        if(years > 0) {
          this.calculatedAge = years + ' años';
        } else {
          let months = new Date().getMonth() - new Date(x.attributes.dob).getMonth();
          if(months > 0) {
            this.calculatedAge = months + ' meses';
          } else {
            let days = new Date().getDate() - new Date(x.attributes.dob).getDate();
            this.calculatedAge = days + ' días';
          }
        }
      }));
    });
    this.App.onActivate();
  }

}
