import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetFormComponent } from './features/pet-form/pet-form.component';
import { PetListComponent } from './features/pet-list/pet-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PetFormComponent,
    PetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
