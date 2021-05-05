import { GameAspectRatioSetting } from '@core/model/live-chat-room';
import { createReducer, on } from '@ngrx/store';
import {
    gameAspectRatioSettingUpdate,
    hideAnchorRequest
} from './game-live-dlmp.actions';

export const hideAnchorReducer = createReducer<boolean>(
    // default value
    false,
    on(hideAnchorRequest, (state, action) => action.hideAnchor),
);

export const GameAspectRatioSettingReducer = createReducer<GameAspectRatioSetting>(
    // default value
    {
        root: {
            aspectRatio: '1920/1080',
            relativeTo: 'window'
        },
        gameDisplay: {
            aspectRatio: '1280/1080',
            relativeTo: 'parent-height'
        },
        liveChat: {
            aspectRatio: '640/1080',
            relativeTo: 'parent-height'
        }
    }
    ,
    on(gameAspectRatioSettingUpdate, (state, action) => action.gameAspectRatioSetting),
);
