import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
