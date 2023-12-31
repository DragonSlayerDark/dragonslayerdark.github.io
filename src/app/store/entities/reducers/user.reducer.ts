import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UserActions from '../actions/user.actions';
import { User } from 'src/app/auth_services/model/user.model';

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  // additional entities state properties
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(UserActions.addUser,
    (state, action) => adapter.addOne(action.user, state)
  ),
  on(UserActions.upsertUser,
    (state, action) => adapter.upsertOne(action.user, state)
  ),
  on(UserActions.addUsers,
    (state, action) => adapter.addMany(action.users, state)
  ),
  on(UserActions.upsertUsers,
    (state, action) => adapter.upsertMany(action.users, state)
  ),
  on(UserActions.updateUser,
    (state, action) => adapter.updateOne(action.user, state)
  ),
  on(UserActions.updateUsers,
    (state, action) => adapter.updateMany(action.users, state)
  ),
  on(UserActions.deleteUser,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUsers,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(UserActions.loadUsersSuccess,
    (state, action) => adapter.setAll(action.users, state)
  ),
  on(UserActions.clearUsers,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
