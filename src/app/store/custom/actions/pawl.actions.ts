import { createAction } from "@ngrx/store";

export const addRequestToQueue = createAction(
    '[Pawl] Add Request To Queue',
);

export const removeRequestFromQueue = createAction(
    '[Pawl] Remove Request From Queue',
);