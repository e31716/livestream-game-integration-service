import { BalanceInfo } from '@core/model/fish-live';

export interface GameDisplayState {
  readonly gameUrl: string;
  // balance info for sending gift
  readonly balanceInfo: BalanceInfo;
}
