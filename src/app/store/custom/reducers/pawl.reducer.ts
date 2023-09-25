import { createReducer, on } from '@ngrx/store';
import { addRequestToQueue, removeRequestFromQueue } from '../actions/pawl.actions';
export const pawlFeatureKey = 'pawl';

export interface State {
    numberRequests: number;
};

const initialState: State = {
    numberRequests: 0
};

export const reducer = createReducer(
    initialState,
    on(addRequestToQueue, (state) => ({
        ...state,
        numberRequests: state.numberRequests + 1
    })),
    on(removeRequestFromQueue, (state) => ({
        ...state,
        numberRequests: state.numberRequests - 1
    }))
);