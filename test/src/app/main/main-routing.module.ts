import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { ContentComponent } from './components/content/content.component';
import { MainService } from './main.service';

// Модуль для роутинга

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        outlet: 'left_nav',
        component: LeftNavComponent
      },
      {
        path: '',
        outlet: 'content',
        component: ContentComponent
      }
    ],
    resolve: {
      base: MainService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MainService]
})
export class MainRoutingModule { }
