import { EntryService } from './../shared/entry.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Entry } from '../shared/entry.model';

import { switchMap } from 'rxjs/operators';

//import toastr from 'toastr';

import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string | undefined;
  entryForm: FormGroup | any;
  pageTitle: string | undefined;
  serverErrorMessages: string[] | undefined
  submittingForm: boolean = false;
  entry: Entry = new Entry();


  constructor(
    private entryService:EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }


  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction == "new")
      this.createEntry();
    else //current action == edit
      this.updateEntry()
  }

  //PRIVATE METHODS

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else
      this.currentAction = "edit"
  }

  private buildEntryForm(){
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null,  [Validators.required]],
      date: [null,  [Validators.required]],
      paid: [null,  [Validators.required]],
      categoryId: [null,  [Validators.required]]
    })
  }

  private loadEntry(){
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap((params: ParamMap|any) => this.entryService.getById(+params.get("id")))
      )
      .subscribe(
        (entry) => {
          this.entry = entry
          this.entryForm.patchValue(entry) // binds loaded entry data to EntryForm
        },
        (error) => alert("Ocorreu um erro no servidor, tente mais tarde")
      )
    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'Cadastro de novo Lançamento'
    }
    else{
      const entryName = this.entry.name || ""
      this.pageTitle = "Editando lançamento " + entryName
    }
  }

  private createEntry(){
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value)

    this.entryService.create(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    )

  }

  private updateEntry(){
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value)

    this.entryService.update(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(entry: Entry){
    this.toastr.success("Solicitação processada com sucesso!")

    this.router.navigateByUrl('entries', {skipLocationChange: true}).then(
      () => this.router.navigate(["entries", entry.id, "edit"])
    )
  }

  private actionsForError(error:any){
    this.toastr.error("Ocorreu um erro ao processar sua solicitação!");

    this.submittingForm = false;

    if(error.status === 422)
    this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente novamente mais tarde!"]

  }


}
