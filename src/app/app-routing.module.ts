import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesRoutingModule } from './pages/categories/categories-routing.module';
import { CategoriesModule } from './pages/categories/categories.module';
import {EntriesModule} from './pages/entries/entries.module';
const routes: Routes = [
  {
    path: "entries",
    loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesModule)
  },
  {
    path: "categories",
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: "reports",
    loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
  },

  {
    path: '',
    redirectTo: '/reports',
    pathMatch : 'full',
    
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
