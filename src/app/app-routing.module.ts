import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListComputerComponent } from './list-computer/list-computer.component';
import { CreateComputerComponent } from './create-computer/create-computer.component';
import { UpdateComputerComponent } from './update-computer/update-computer.component';
import { DetailsComputerComponent } from './details-computer/details-computer.component';
import { ListCompanyComponent } from './list-company/list-company.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { DetailsCompanyComponent } from './details-company/details-company.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';


const routes: Routes = [
  {
    path: 'computer',
    component: ListComputerComponent,
    pathMatch: 'full'
  },
  {
    path: 'computer/create',
    component: CreateComputerComponent,
    pathMatch: 'full'
  },
  {
    path: 'computer/update/:id',
    component: UpdateComputerComponent,
    pathMatch: 'full'
  },
  {
    path: 'computer/show/:id',
    component: DetailsComputerComponent,
    pathMatch: 'full'
  },
  {
    path: 'company',
    component: ListCompanyComponent,
    pathMatch: 'full'
  },
  {
    path: 'company/create',
    component: CreateCompanyComponent ,
    pathMatch: 'full'
  },
  {
    path: 'company/update/:id',
    component: UpdateCompanyComponent ,
    pathMatch: 'full'
  },
  {
    path: 'company/show/:id',
    component: DetailsCompanyComponent,
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: ListUsersComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorHandlerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
