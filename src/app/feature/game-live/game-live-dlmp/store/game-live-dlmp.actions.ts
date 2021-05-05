import { GameAspectRatioSetting } from '@core/model/live-chat-room';
import { createAction, props } from '@ngrx/store';

export const hideAnchorRequest = createAction(
    '[Fish Live] Hide Anchor Request',
    props<{ hideAnchor: boolean }>()
);

export const gameAspectRatioSettingUpdate = createAction(
    '[Fish Live] Hide Anchor Request',
    props<{ gameAspectRatioSetting: GameAspectRatioSetting }>()
);

