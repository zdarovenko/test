import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Модуль роутинга

const routes: Routes = [
  {
    path: '',
    loadChildren: './main/main.module#MainModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
