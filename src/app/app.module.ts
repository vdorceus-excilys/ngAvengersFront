import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

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
import { HeaderComponent } from './header/header.component';
import {MatSelectModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './list-users/list-users.component';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSortModule } from '@angular/material/sort';

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
    DeleteCompanyComponent,
    HeaderComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule,
    MatSortModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
      DeleteCompanyComponent,
      DeleteComputerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
