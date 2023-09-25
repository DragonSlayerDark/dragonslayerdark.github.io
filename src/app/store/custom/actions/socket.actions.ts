import { createAction, props } from "@ngrx/store";

export const socketEmit = createAction(
    '[Socket] Socket Emit',
    props<{ payload: any, room: string }>()
);