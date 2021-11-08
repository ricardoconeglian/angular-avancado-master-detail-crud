import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesRoutingModule } from './pages/categories/categories-routing.module';
import { CategoriesModule } from './pages/categories/categories.module';

const routes: Routes = [
  {
    path: "categories",
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
