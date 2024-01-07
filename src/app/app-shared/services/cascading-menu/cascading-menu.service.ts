import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CascadingMenuService {

   _baseurl = 'assets/data.json';

  constructor(private http: HttpClient) { 
  }

  //fetch data from json data file
  getAllMenuData(): any {
    return this.http.get<any>(this._baseurl);
  }
}