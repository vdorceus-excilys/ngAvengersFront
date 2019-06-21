import { Injectable } from '@angular/core';
import {ComputerModel} from '../app/computer-model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private computersUrl = 'http://10.0.1.25:8080/webapp/api/v1/computers/';  // URL to web api computers

  constructor(private http: HttpClient) { }

  getComputers(): Observable<ComputerModel[]> {
    return this.http.get<ComputerModel[]>(this.computersUrl);
  }

  getComputer(id: number): Observable<ComputerModel> {
    return this.http.get<ComputerModel>(this.computersUrl + id);
  }

  /* GET computers whose name contains search term */
  searchComputer(search: string): Observable<ComputerModel[]> {
    return this.http.get<ComputerModel[]>(`${this.computersUrl}?search=${search}`);
  }

  /** POST: add a new computer to the server */
  addComputer(computer: ComputerModel): Observable<ComputerModel> {
    const comp = {
      id: null,
      name: computer.name, introduced: computer.introduced, discontinued: computer.discontinued, companyName: computer.company.name, companyId: computer.company.id    }
    return this.http.post<any>(this.computersUrl, comp, httpOptions);
  }

  /** DELETE: delete the computer from the server */
  deleteComputer(computer: ComputerModel | number): Observable<ComputerModel> {
    const id = typeof computer === 'number' ? computer : computer.id;
    const url = this.computersUrl + id;

    return this.http.delete<ComputerModel>(url, httpOptions);
  }
  /** PUT: update the computer on the server */
  updateComputer(computer: ComputerModel): Observable<any> {
    const comp = {
      id: computer.id,
      name: computer.name, introduced: computer.introduced, discontinued: computer.discontinued, companyName: computer.company.name, companyId: computer.company.id    }

    return this.http.put(this.computersUrl + comp.id, comp, httpOptions);
  }
}
