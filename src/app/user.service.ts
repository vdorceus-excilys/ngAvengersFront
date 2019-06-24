import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../app/user-model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://10.0.1.25:8080/webapp/api/v1/users/';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersUrl);
  }

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.usersUrl + id);
  }

  public addUser(user: UserModel) {
    return this.http.post<UserModel>(this.usersUrl, user);
  }

  searchUser(search: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.usersUrl}?search=${search}`);
  }

  /** DELETE: delete the user from the server */
  deleteUser(user: UserModel | string): Observable<UserModel> {
    const id = typeof user === 'string' ? user : user.id;
    const url = this.usersUrl + id;

    return this.http.delete<UserModel>(url, httpOptions);
  }

  /** PUT: update the user on the server */
  updateUser(user: UserModel): Observable<any> {
    return this.http.put(this.usersUrl + user.id, user, httpOptions);
  }
}
