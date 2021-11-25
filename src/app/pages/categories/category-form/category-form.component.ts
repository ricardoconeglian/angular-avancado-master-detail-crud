import { CategoryService } from './../shared/category.service';
import { Component, Injector} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseResourceFormComponent} from '../../../shared/components/base-resource-form/base-resource-form.component';

import { Category } from '../shared/category.model';

import { ToastrService } from 'ngx-toastr';

//import toastr from 'toastr';

//import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  
  


  constructor(
    protected categoryService:CategoryService,
    protected injector:Injector,
    protected toastr: ToastrService,
  ) { 
    super(injector, categoryService, new Category(), Category.fromJson);
  }




  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }


  protected creationPageTitle(): string{
    return "Cadastro de nova Categoria"
  }

  protected editionPageTitle(): string{
    const categoryName = this.resource.name || "";
    return "Editando categoria " + categoryName
  }

  protected actionsForSuccess(resource: Category){
    this.toastr.success("Solicitação processada com sucesso!")

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, "edit"])
    )
  }

  protected actionsForError(error:any){
    this.toastr.error("Ocorreu um erro ao processar sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422)
    this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente novamente mais tarde!"]

  }
}