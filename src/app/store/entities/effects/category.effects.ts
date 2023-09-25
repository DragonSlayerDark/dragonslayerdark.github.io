import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap} from 'rxjs'
import * as fromCategory from '../actions/category.actions'
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { EntityStrapi } from '../strapi_payload_entity';



@Injectable()
export class CategoryEffects {


  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
    ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCategory.loadCategories),
      switchMap(({ id }) =>
        this.categoryService.getCategories(id).pipe(
          map(x => fromCategory.loadcategoriesSuccess({ categories: x.data as EntityStrapi<Category>[] }))
        )
      )
    )
  );

}
