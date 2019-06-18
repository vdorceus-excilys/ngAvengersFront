import { Injectable } from '@angular/core';
import {ComputerModel} from '../app/computer-model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private computersUrl = 'https://mock-cdb.firebaseio.com/computers.json';  // URL to web api computers

  constructor(private http: HttpClient) { }

  getComputers(): Observable<ComputerModel[]> {
    return this.http.get<ComputerModel[]>(this.computersUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<ComputerModel[]>('getComputers', []))
    );
  }
  getComputer(id: number): Observable<ComputerModel> {
    const url = 'https://mock-cdb.firebaseio.com/computers/' + id + '.json';
    return this.http.get<ComputerModel>(url);
  }
  
  /* GET computers whose name contains search term */
  searchComputer(term: string): Observable<ComputerModel[]> {
    if (!term.trim()) {
      // if not search term, return empty computer array.
      return of([]);
    }
    return this.http.get<ComputerModel[]>(`${this.computersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found computers matching "${term}"`)),
      catchError(this.handleError<ComputerModel[]>('searchComputer', []))
    );
  }

  /** POST: add a new computer to the server */
  addComputer(computer: ComputerModel): Observable<ComputerModel> {
    return this.http.post<ComputerModel>(this.computersUrl, computer, httpOptions).pipe(
      tap((newComputer: ComputerModel) => this.log(`added computer w/ id=${newComputer.id}`)),
      catchError(this.handleError<ComputerModel>('addComputer'))
    );
  }
  /** DELETE: delete the hero from the server */
  deleteComputer (computer: ComputerModel | number): Observable<ComputerModel> {
    const id = typeof computer === 'number' ? computer : computer.id;
    const url = `${this.computersUrl}/${id}`;
 
    return this.http.delete<ComputerModel>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted computer id=${id}`)),
      catchError(this.handleError<ComputerModel>('deleteComputer'))
    );
  }
  /** PUT: update the hero on the server */
  updateComputer (computer: ComputerModel): Observable<any> {
    return this.http.put(this.computersUrl, computer, httpOptions).pipe(
      tap(_ => this.log(`updated computer id=${computer.id}`)),
      catchError(this.handleError<any>('updateComputer'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a message in console with the MessageService */
  private log(message: string) {
    console.log(`ComputerService: ${message}`);
  }
}

