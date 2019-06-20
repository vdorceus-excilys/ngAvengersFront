import { Injectable } from '@angular/core';
import { CompanyModel } from './company-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companiesUrl = 'http://10.0.1.25:8080/webapp/api/v1/companies';  // URL to web api

  constructor(private http: HttpClient) { }

  createCompany(company : CompanyModel): Observable<CompanyModel> {
    return this.http.post<CompanyModel>(this.companiesUrl,company);
  }

  getCompanies(): Observable<CompanyModel[]> {
    return this.http.get<CompanyModel[]>(this.companiesUrl);
  }

  getCompany(id : string) : Observable<CompanyModel> {
    return this.http.get<CompanyModel>(this.companiesUrl+'/'+id);
  }

  updateCompany(company : CompanyModel) : Observable<any> {
    return this.http.put(this.companiesUrl+'/'+company.id,company);
  }

  deleteCompany(id: string): Observable<CompanyModel> {
    return this.http.delete<CompanyModel>(this.companiesUrl+'/'+id);
  }

}