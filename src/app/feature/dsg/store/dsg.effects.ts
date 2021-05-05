import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

@Injectable()
export class FighterEffects {

  constructor(
    private actions$: Actions,
  ) { }
}
