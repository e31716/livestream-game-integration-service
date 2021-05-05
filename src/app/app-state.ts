import { ShareState } from '@shared/store/share-state';
import { FishLiveState } from '@feature/fish-live/store/fish-live-state';
import { GameDisplayState } from '@feature/game-display/store/game-display-state';
import { LiveChatState } from '@feature/live-chat/store/live-chat-state';
import { FighterState } from '@feature/fighter/store/fighter-state';

// All feature state import here
export interface AppState {
  readonly shareFeature: ShareState;
  readonly fishLiveFeature: FishLiveState;
  readonly fighterFeature: FighterState;
  readonly liveChatFeature: LiveChatState;
  readonly gameDisplayFeature: GameDisplayState;
}
