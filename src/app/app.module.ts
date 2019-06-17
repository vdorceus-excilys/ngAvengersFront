import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http"
import {MatFormFieldModule} from  '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComputerComponent } from './create-computer/create-computer.component';
import { UpdateComputerComponent } from './update-computer/update-computer.component';
import { DeleteComputerComponent } from './delete-computer/delete-computer.component';
import { ListComputerComponent } from './list-computer/list-computer.component';
import { DetailsComputerComponent } from './details-computer/details-computer.component';
import { ListCompanyComponent } from './list-company/list-company.component';
import { DetailsCompanyComponent } from './details-company/details-company.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { DeleteCompanyComponent } from './delete-company/delete-company.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    CreateComputerComponent,
    UpdateComputerComponent,
    DeleteComputerComponent,
    ListComputerComponent,
    DetailsComputerComponent,
    ListCompanyComponent,
    DetailsCompanyComponent,
    CreateCompanyComponent,
    UpdateCompanyComponent,
    DeleteCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
