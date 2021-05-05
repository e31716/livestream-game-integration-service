import { createReducer, on } from '@ngrx/store';
import { hideAnchorRequest } from './share.actions';

export const hideAnchorReducer = createReducer<boolean>(
    // default value
    false,
    on(hideAnchorRequest, (state, action) => action.hideAnchor),
);

