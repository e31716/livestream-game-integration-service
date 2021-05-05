import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

@Injectable()
export class FighterEffects {

  constructor(
    private actions$: Actions,
  ) { }

  // someEffect$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(playerLobbyConnectInfoRequest),
  //   )
  // });


  // loadMovies$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Movies Page] Load Movies'),
  //   mergeMap(() => this.moviesService.getAll()
  //     .pipe(
  //       map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
  //       catchError(() => EMPTY)
  //     ))
  // )
  // );

  // refreshCars$ = createEffect(() => this.actions$.pipe(
  //   ofType(playerLobbyConnectInfoRequest),
  //   mergeMap(() => this.fishLiveService.listenFishLiveGameInfoSource()
  //     .pipe(

  //     ))
  // ));

  // appendCar$ = createEffect(() => this.actions$.pipe(
  //   ofType(appendCarRequest),
  //   switchMap((action) => {
  //     return this.carsSvc.append(action.car).pipe(
  //       map(() => refreshCarsRequest()),
  //     );
  //   }),
  // ));
}
