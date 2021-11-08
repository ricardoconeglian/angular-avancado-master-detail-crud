import { InMemoryDbService } from "angular-in-memory-web-api";

import {Category} from "./pages/categories/shared/category.model"

export class InMemoryDatabase implements InMemoryDbService {
  createDb(){
    const categories: Category[] = [
      {id: 1, name: "Lazer", description: "Cinema, parques, praia"},
      {id: 2, name: "Saude", description: "Planos de Saude e remedios"},
      {id: 3, name: "Salario", description: "Recebimento de Salario"},
      {id: 4, name: "Freelas", description: "Trabahos como freelance"},
    ];

    return {categories}
  }
}
