import { BalanceInfo } from '@core/model/fish-live';
import { createReducer, on } from '@ngrx/store';
import { balanceInfoUpdate, gameUrlUpdate } from './game-display.actions';


export const gameUrlReducer = createReducer<string>(
    // default value
    '',
    on(gameUrlUpdate, (state, action) => action.gameUrl),
);

export const balanceInfoReducer = createReducer<BalanceInfo>(
    // default value
    {
        Balance: 0,
        BalanceSeq: -1,
    },
    on(balanceInfoUpdate, (state, action) => action.balanceInfo),
);

