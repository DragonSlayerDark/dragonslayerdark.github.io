import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import * as fromSubCategory from '../actions/sub-category.actions';
import { SubCategory } from '../models/sub-category.model';
import { SubCategoryService } from '../services/sub-category.service';
import { EntityStrapi } from '../strapi_payload_entity';


@Injectable()
export class SubCategoryEffects {


  constructor(private actions$: Actions,
    private subCategoryService: SubCategoryService
  ) { }

  loadSubCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSubCategory.loadSubCategories),
      switchMap(({ id }) =>
        this.subCategoryService.getSubCategories(id).pipe(
          map(x => fromSubCategory.loadSubCategoriesSuccess({ subCategories: x.data as EntityStrapi<SubCategory>[] }))
        )
      )
    )
  );
}
