import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

@Injectable()
export class GameLiveDlmpEffects {

  constructor(
    private actions$: Actions,
  ) { }

}
