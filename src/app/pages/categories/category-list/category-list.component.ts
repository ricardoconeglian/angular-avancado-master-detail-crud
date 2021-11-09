import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories: Category[] = []

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar a lista')
      )
  }

  deleteCategory(category: any){
    const mustDelete = confirm('Deseja realmente excluir?')
    if (mustDelete){
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => alert('Erro ao tentar excluir!')
      )
    }
  }


}
