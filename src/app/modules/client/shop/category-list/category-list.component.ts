import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { EntityStrapi } from 'src/app/store/entities/strapi_payload_entity';
import { Category } from 'src/app/store/entities/models/category.model';
import { selectAllCategories } from 'src/app/store/entities/selectors/category.selectors';
import { loadCategories } from 'src/app/store/entities/actions/category.actions';
import { PAWLLocalStorage } from 'src/app/exports/enums';
import { Router } from '@angular/router';
import { AppService } from '../../../../store/custom/services/app.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Observable<EntityStrapi<Category>[]>
  selectedPetTypeName = localStorage.getItem('selectedPetTypeName');


  constructor(
    private store: Store<AppState>,
    private router: Router,
    private App: AppService
  ) {
    this.categories = this.store.pipe(select(selectAllCategories));
  }

  ngOnInit(): void {
    let selectedPetTypeID = localStorage.getItem(PAWLLocalStorage.SELECTED_PET_TYPE_ID);
    this.store.dispatch(loadCategories({ id: selectedPetTypeID }));
    this.App.onActivate();
  }

  selectCategory(id: number, name: string){
    localStorage.setItem('selectedCategoryID', id+"");
    localStorage.setItem('selectedCategoryName', name);
    this.router.navigate(['/shop', 'sub-categories']);
  }

}
