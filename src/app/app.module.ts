import { NgModule, LOCALE_ID} from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import {CoreModule} from './core/core.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    ToastrModule.forRoot(),
    CoreModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
