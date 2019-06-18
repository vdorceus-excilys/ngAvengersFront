import { Injectable } from '@angular/core';
import { CompanyModel } from './company-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companiesUrl = 'https://mock-cdb.firebaseio.com/companies';  // URL to web api

  constructor(private http: HttpClient) { }

  createCompany(company : CompanyModel): Observable<CompanyModel> {
    return this.http.post<CompanyModel>(this.companiesUrl+'.json',company);
  }

  getCompanies(): Observable<CompanyModel[]> {
    return this.http.get<CompanyModel[]>(this.companiesUrl+'.json');
  }

  getCompany(id : string) : Observable<CompanyModel> {
    return this.http.get<CompanyModel>(this.companiesUrl+'/'+id+'.json');
  }

  updateCompany(company : CompanyModel) : Observable<any> {
    return this.http.put(this.companiesUrl+'/'+company.id+'.json',company);
  }

  deleteCompany(id: string): Observable<CompanyModel> {
    return this.http.delete<CompanyModel>(this.companiesUrl+'/'+id+'.json');
  }

}