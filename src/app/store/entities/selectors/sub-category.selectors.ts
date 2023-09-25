import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, State} from '../reducers/sub-category.reducer';

export const selectSubCategoriesState = createFeatureSelector<State>('subCategories');

export const selectAllSubCategories = createSelector(
    selectSubCategoriesState,
    selectAll
)

