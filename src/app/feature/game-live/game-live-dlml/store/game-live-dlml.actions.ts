import { createAction, props } from '@ngrx/store';

export const hideAnchorRequest = createAction(
    '[Fish Live] Hide Anchor Request',
    props<{ hideAnchor: boolean }>()
);
