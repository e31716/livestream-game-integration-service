import { createAction, props } from '@ngrx/store';

export const hideAnchorRequest = createAction(
    '[Share] Hide Anchor Request',
    props<{ hideAnchor: boolean }>()
);
