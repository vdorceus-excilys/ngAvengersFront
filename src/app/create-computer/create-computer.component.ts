import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-create-computer',
  templateUrl: './create-computer.component.html',
  styleUrls: ['./create-computer.component.scss']
})
export class CreateComputerComponent implements OnInit {
  computer = { id: '700', name: 'test', introduced: '2018-12-12', discontinued: '2019-12-12', company_id: '36' }


  computerForm = new FormGroup({
    name: new FormControl(''),
    introduced: new FormControl(''),
    discontinued: new FormControl(''),
    company_id: new FormControl(''),
    company_name: new FormControl(''),
  });

  constructor(private http: HttpClient) { }
  private postData(formData: any): Observable<any> {
    return this.http.post<any>('https://mock-cdb.firebaseio.com/computers.json', formData);

  }

  ngOnInit() {
    this.postData(this.computer);
  }

}
