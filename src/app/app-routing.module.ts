import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IceCreamListComponent } from './components/ice-cream-list/ice-cream-list.component';

const routes: Routes = [
  { path: 'ice-cream', component: IceCreamListComponent },
  { path: '', redirectTo: '/ice-cream', pathMatch: 'full' },
  { path: '**', redirectTo: '/ice-cream' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
