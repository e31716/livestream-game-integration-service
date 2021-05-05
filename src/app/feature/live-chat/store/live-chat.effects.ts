import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class LiveChatEffects {

  constructor(
    private actions$: Actions,
  ) { }

}
