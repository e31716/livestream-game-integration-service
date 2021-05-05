import { BalanceInfo } from '@core/model/fish-live';
import { createAction, props } from '@ngrx/store';

export const gameUrlUpdate = createAction(
    '[Game Display] Game Url Update',
    props<{ gameUrl: string }>()
);

export const balanceInfoUpdate = createAction(
    '[Game Display] Game Url Update',
    props<{ balanceInfo: BalanceInfo }>()
);
