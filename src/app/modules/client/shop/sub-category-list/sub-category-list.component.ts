import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { SubCategory } from 'src/app/store/entities/models/sub-category.model';
import { selectAllSubCategories } from 'src/app/store/entities/selectors/sub-category.selectors';
import { loadSubCategories } from 'src/app/store/entities/actions/sub-category.actions';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { Router } from '@angular/router';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

  subCategories$: Observable<EntityStrapi<SubCategory>[]>
  selectedPetTypeName = localStorage.getItem('selectedPetTypeName');
  selectedCategoryName = localStorage.getItem('selectedCategoryName');


  constructor(
    private store: Store<AppState>,
    private router: Router,
    private App: AppService
  ) {
    this.subCategories$ = this.store.pipe(select(selectAllSubCategories));
  }

  ngOnInit(): void {
    let selectedCategoryID = localStorage.getItem(PAWLLocalStorage.SELECTED_CATEGORY_TYPE_ID);
    this.store.dispatch(loadSubCategories({ id: selectedCategoryID }));
    this.App.onActivate();
  }

  selectSubCategory( id: number, name){
    localStorage.setItem('selectedSubCategoryID', id+"");
    localStorage.setItem('selectedSubCategoryName', name);
    this.router.navigate(['/shop', 'sub-products']);
  }

}
