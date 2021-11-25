import { EntryService } from './../shared/entry.service';
import { Component, Injector, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';

import {BaseResourceFormComponent} from '../../../shared/components/base-resource-form/base-resource-form.component';
import { Entry } from '../shared/entry.model';

import { switchMap } from 'rxjs/operators';

//import toastr from 'toastr';

import { ToastrService } from 'ngx-toastr';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  
  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }
  constructor(
    protected entryService:EntryService,
    protected toastr: ToastrService,
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, entryService, new Entry(), Entry.fromJson)
   }


  ngOnInit(): void {
    
    this.loadCategories();
    super.ngOnInit();
  }

 

  get typeOptions(): Array<any>{
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          value : value,
          text : text,
        }
      }
    )
  }

  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      amount: [null,  [Validators.required]],
      date: [null,  [Validators.required]],
      paid: [true,  [Validators.required]],
      categoryId: [null,  [Validators.required]]
    })
  }

  
  protected loadCategories(){
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    )
  }

  
 

  protected actionsForSuccess(entry: Entry){
    this.toastr.success("Solicitação processada com sucesso!")

    this.router.navigateByUrl('entries', {skipLocationChange: true}).then(
      () => this.router.navigate(["entries", entry.id, "edit"])
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

  protected creationPageTitle(): string{
    return "Cadastro de novo Lançamento"
  }

  protected editionPageTitle(): string{
    const resourceName = this.resource.name || "";
    return "Editando Lançamento: " + resourceName
  }

}
