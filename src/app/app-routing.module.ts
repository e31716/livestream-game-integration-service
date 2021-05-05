import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@shared/page/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'fighter',
    loadChildren: () => import('./feature/fighter/fighter.module').then(m => m.FighterModule)
  },
  {
    path: 'dsg',
    loadChildren: () => import('./feature/dsg/dsg.module').then(m => m.DsgModule)
  },
  {
    path: '',
    redirectTo: 'fish',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
